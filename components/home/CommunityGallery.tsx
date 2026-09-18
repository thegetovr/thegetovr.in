import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import GalleryImage from "./GalleryImage";

import Reveal from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export default function CommunityGallery() {
  return (
    <section className="bg-(--color-page) py-24 lg:py-32">
      <Container>
        {/* Section Header */}
        <Reveal y={25} duration={0.7}>
          <SectionHeader
            eyebrow="COMMUNITY"
            title="Made With The Getovr"
            description="Explore how creators, businesses and everyday wearers bring their ideas to life with premium custom apparel."
            centered
          />
        </Reveal>

        {/* Gallery */}
        <Stagger className="grid grid-cols-12 gap-6" stagger={0.12} delay={0.1}>
          {/* Image 1 */}
          <StaggerItem className="col-span-12 md:col-span-4">
            <GalleryImage
              src="/images/home/community/community-1.png"
              alt="The Getovr community wearing custom apparel"
            />
          </StaggerItem>

          {/* Image 2 */}
          <StaggerItem className="col-span-12 md:col-span-4">
            <GalleryImage
              src="/images/home/community/community-2.png"
              alt="The Getovr community streetwear"
            />
          </StaggerItem>

          {/* Image 3 */}
          <StaggerItem className="col-span-12 md:col-span-4">
            <GalleryImage
              src="/images/home/community/community-3.png"
              alt="The Getovr custom apparel"
            />
          </StaggerItem>

          {/* Large Image */}
          <StaggerItem className="col-span-12 md:col-span-8">
            <GalleryImage
              large
              src="/images/home/community/community-4.png"
              alt="The Getovr community wearing custom apparel together"
            />
          </StaggerItem>

          {/* Image 5 */}
          <StaggerItem className="col-span-12 md:col-span-4">
            <GalleryImage
              src="/images/home/community/community-5.png"
              alt="The Getovr streetwear community"
            />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
