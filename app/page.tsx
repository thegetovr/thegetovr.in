import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import StudioPreview from "@/components/home/StudioPreview";
import BestSellers from "@/components/home/BestSellers";
import HowItWorks from "@/components/home/HowItWorks";
import SectionDivider from "@/components/ui/SectionDivider";
import FeaturedCollection from "@/components/home/FeaturedCollection";


export default function Home() {
  return (
    <>
<Hero />

<SectionDivider />

<Categories />

<SectionDivider />

<FeaturedCollection />

<SectionDivider />

<StudioPreview />

<SectionDivider />

<BestSellers />

<SectionDivider />

<HowItWorks />
</>
  );
}