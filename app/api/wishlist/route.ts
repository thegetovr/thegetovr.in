import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/Product";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId?: string;
    };

    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return null;
    }

    return decoded.userId;
  } catch {
    return null;
  }
}

function unauthorized() {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
    },
    {
      status: 401,
    },
  );
}

function invalidProduct() {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid product",
    },
    {
      status: 400,
    },
  );
}

async function getWishlistResponse(userId: string) {
  const wishlist = await Wishlist.findOne({ userId }).lean();

  const productIds = (wishlist?.productIds ?? []).map((id) => String(id));

  if (productIds.length === 0) {
    return NextResponse.json({
      success: true,
      items: [],
      productIds: [],
    });
  }

  const products = await Product.find({
    _id: {
      $in: productIds,
    },
    status: "active",
  })
    .select("_id name price stock media")
    .lean();

  const productMap = new Map(
    products.map((product) => [String(product._id), product]),
  );

  const items = productIds
    .map((id) => {
      const product = productMap.get(id);

      if (!product) {
        return null;
      }

      const coverImage =
        product.media?.find((media) => media.isCover)?.url ??
        product.media?.sort((a, b) => a.order - b.order)[0]?.url ??
        "";

      return {
        id: String(product._id),
        name: product.name,
        image: coverImage,
        price: product.price,
        stock: product.stock > 0,
      };
    })
    .filter(Boolean);

  return NextResponse.json({
    success: true,
    items,
    productIds,
  });
}

export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return unauthorized();
    }

    await connectToDatabase();

    return getWishlistResponse(userId);
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load wishlist",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return unauthorized();
    }

    const body = await request.json();
    const productId = String(body?.productId ?? "");

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return invalidProduct();
    }

    await connectToDatabase();

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    }).select("_id");

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }

    await Wishlist.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          productIds: product._id,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    return getWishlistResponse(userId);
  } catch (error) {
    console.error("ADD WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add product to wishlist",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return unauthorized();
    }

    const body = await request.json();
    const productId = String(body?.productId ?? "");

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return invalidProduct();
    }

    await connectToDatabase();

    await Wishlist.findOneAndUpdate(
      { userId },
      {
        $pull: {
          productIds: new mongoose.Types.ObjectId(productId),
        },
      },
    );

    return getWishlistResponse(userId);
  } catch (error) {
    console.error("REMOVE WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove product from wishlist",
      },
      {
        status: 500,
      },
    );
  }
}
