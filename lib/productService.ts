import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import {
  Product as ProductType,
  ProductCategory,
  ProductStatus,
} from "@/types/product";

export interface ProductFilters {
  search?: string;
  category?: ProductCategory | "";
  status?: ProductStatus | "";
  sort?: "latest" | "price-low" | "price-high" | "";
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<ProductType[]> {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (filters.status) {
    query.status = filters.status;
  }
  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.search) {
    const search = filters.search.trim();

    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        sku: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  let productQuery = Product.find(query);

  switch (filters.sort) {
    case "price-low":
      productQuery = productQuery.sort({ price: 1 });
      break;

    case "price-high":
      productQuery = productQuery.sort({ price: -1 });
      break;

    default:
      productQuery = productQuery.sort({ createdAt: -1 });
  }

  const products = await productQuery.lean();

  return products.map((product) => ({
  id: String(product._id),
  name: product.name,
  sku: product.sku,
  category: product.category,
  type: product.type,
  price: product.price,
  stock: product.stock,
  variants: product.variants ?? [],
  status: product.status,
  media: product.media ?? [],
}));
}
export async function getProduct(id: string): Promise<ProductType | null> {
  await connectToDatabase();

  const product = await Product.findById(id).lean();

  if (!product) {
    return null;
  }

  return {
  id: String(product._id),
  name: product.name,
  sku: product.sku,
  category: product.category,
  type: product.type,
  price: product.price,
  stock: product.stock,
  variants: product.variants ?? [],
  status: product.status,
  media: product.media ?? [],
};
}
