import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import GalleryImage from "./GalleryImage";

export default function CommunityGallery() {
  return (
    <section className="bg-(--color-page) py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow="COMMUNITY"
          title="Made With The Getovr"
          description="Explore how creators, businesses and everyday wearers bring their ideas to life with premium custom apparel."
          centered
        />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <GalleryImage
              src="/images/home/community/community-1.png"
              alt="The Getovr community wearing custom apparel"
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <GalleryImage
              src="/images/home/community/community-2.png"
              alt="The Getovr community streetwear"
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <GalleryImage
              src="/images/home/community/community-3.png"
              alt="The Getovr custom apparel"
            />
          </div>

          <div className="col-span-12 md:col-span-8">
            <GalleryImage
              large
              src="/images/home/community/community-4.png"
              alt="The Getovr community wearing custom apparel together"
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <GalleryImage
              src="/images/home/community/community-5.png"
              alt="The Getovr streetwear community"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}