import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CollectionCard from "./CollectionCard";

export default function FeaturedCollection() {
  return (
    <section className="bg-(--color-page) py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow="FEATURED COLLECTION"
          title="Designed For Every Style"
          description="Discover premium apparel collections crafted by The Getovr or customize them with your own design."
          centered
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CollectionCard
              title="Premium Hoodies"
              description="Heavyweight hoodies made for comfort, durability and bold designs."
              large
            />
          </div>

          <div className="flex flex-col gap-6">
            <CollectionCard
              title="Oversized Tees"
              description="Relaxed fit with a premium streetwear look."
            />

            <CollectionCard
              title="Regular Tees"
              description="Classic everyday essentials with premium quality."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}