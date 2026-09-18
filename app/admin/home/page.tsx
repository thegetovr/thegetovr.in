import { getOrCreateHomeContent } from "@/lib/homeService";
import HeroForm from "@/components/admin/home/HeroForm";
import CategoriesForm from "@/components/admin/home/CategoriesForm";
export const metadata = {
  title: "Home Page | The Getovr Admin",
};

export default async function AdminHomePage() {
  const homeContent = await getOrCreateHomeContent();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Home Page</h1>
        <p className="mt-2 text-zinc-400">
          Manage the content and sections displayed on your storefront
          homepage.
        </p>
      </div>

      <HeroForm hero={homeContent.hero} />
      <CategoriesForm categories={homeContent.categories} />
    </div>
  );
}