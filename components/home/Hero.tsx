import { getHomeContent } from "@/lib/homeService";
import HeroCarousel from "./HeroCarousel";

export default async function Hero() {
  const homeContent = await getHomeContent();
  const hero = homeContent?.hero;

  if (!hero) {
    return null;
  }

  return <HeroCarousel hero={hero} />;
}