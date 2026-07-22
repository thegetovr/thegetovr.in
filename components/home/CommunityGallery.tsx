import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import GalleryImage from "./GalleryImage";

export default function CommunityGallery() {
  return (
    <section className="bg-black py-32">
      <Container>
        <SectionHeader
          eyebrow="COMMUNITY"
          title="Made With The Getovr"
          description="Explore how creators, businesses and everyday wearers bring their ideas to life with premium custom apparel."
          centered
        />

        <div className="grid grid-cols-12 gap-6">
          {/* Row 1 */}
          <div className="col-span-12 md:col-span-4">
            <GalleryImage />
          </div>

          <div className="col-span-12 md:col-span-4">
            <GalleryImage />
          </div>

          <div className="col-span-12 md:col-span-4">
            <GalleryImage />
          </div>

          {/* Row 2 */}
          <div className="col-span-12 md:col-span-8">
            <GalleryImage large />
          </div>

          <div className="col-span-12 md:col-span-4">
            <GalleryImage />
          </div>
        </div>
      </Container>
    </section>
  );
}