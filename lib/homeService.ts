import { connectToDatabase } from "@/lib/mongodb";
import HomeContent from "@/models/HomeContent";
import { HomeContent as HomeContentType } from "@/types/home";
import { homeDefaults } from "@/lib/homeDefaults";
export async function getHomeContent(): Promise<HomeContentType | null> {
  await connectToDatabase();

  const content = await HomeContent.findOne().lean();

  if (!content) {
    return null;
  }

  return {
    id: String(content._id),
    hero: content.hero,
    categories: content.categories ?? [],
    featuredProducts: content.featuredProducts,
    studio: content.studio,
    story: content.story,
    reviews: content.reviews,
    community: content.community,
    newsletter: content.newsletter,
    updatedAt: content.updatedAt.toISOString(),
    createdAt: content.createdAt.toISOString(),
  };
}
export async function getOrCreateHomeContent(): Promise<HomeContentType> {
  await connectToDatabase();

  let content = await HomeContent.findOne().lean();

  if (!content) {
    const created = await HomeContent.create(homeDefaults);
    content = created.toObject();
  }

  return {
    id: String(content._id),
    hero: content.hero,
    categories: content.categories ?? [],
    featuredProducts: content.featuredProducts,
    studio: content.studio,
    story: content.story,
    reviews: content.reviews,
    community: content.community,
    newsletter: content.newsletter,
    updatedAt: new Date(content.updatedAt).toISOString(),
    createdAt: new Date(content.createdAt).toISOString(),
  };
}