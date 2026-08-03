import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import {
  Category,
  CategoryStatus,
} from "@/types/category";

export interface CategoryFilters {
  search?: string;
  status?: CategoryStatus | "";
}

export async function getCategories(
  filters: CategoryFilters = {},
): Promise<Category[]> {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (filters.status) {
    query.status = filters.status;
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
        slug: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const categories = await CategoryModel.find(query).lean();

  return categories.map((category) => ({
    id: String(category._id),
    name: category.name,
    slug: category.slug,
    status: category.status,
  }));
}

export async function getCategory(
  id: string,
): Promise<Category | null> {
  await connectToDatabase();

  const category = await CategoryModel.findById(id).lean();

  if (!category) {
    return null;
  }

  return {
    id: String(category._id),
    name: category.name,
    slug: category.slug,
    status: category.status,
  };
}