import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import StudioPreview from "@/components/home/StudioPreview";
import CommunityGallery from "@/components/home/CommunityGallery";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <BestSellers />
      <StudioPreview />
      <CommunityGallery />
      <HowItWorks />
    </main>
  );
}