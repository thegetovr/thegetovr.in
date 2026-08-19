import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import StudioPreview from "@/components/home/StudioPreview";
import BestSellers from "@/components/home/BestSellers";
import CommunityGallery from "@/components/home/CommunityGallery";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />

      <Categories />

      <FeaturedCollection />

      <StudioPreview />

      <BestSellers />

      <CommunityGallery />

      <HowItWorks />
    </main>
  );
}