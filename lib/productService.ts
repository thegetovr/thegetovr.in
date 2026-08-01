
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

  const products = await Product.find(query).lean();

  return products.map((product) => ({
    id: String(product._id),
    name: product.name,
    sku: product.sku,
    category: product.category,
    price: product.price,
    stock: product.stock,
    status: product.status,
  }));
}