import GalleryThumbnail from "./GalleryThumbnail";
import GalleryActions from "./GalleryActions";

interface ProductMedia {
  url: string;
  publicId: string;
  alt: string;
  isCover: boolean;
}

interface GalleryGridProps {
  productId: string;
  media: ProductMedia[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function GalleryGrid({
  productId,
  media,
  selectedIndex,
  onSelect,
}: GalleryGridProps) {
  

  return (
    <div className="mt-4 grid grid-cols-4 gap-3">
      {media.map((image, index) => (
        <GalleryActions
          key={image.publicId}
          productId={productId}
          publicId={image.publicId}
        >
          {({ setCover, deleteImage, isPending }) => (
            <GalleryThumbnail
              src={image.url}
              alt={image.alt}
              active={selectedIndex === index}
              isCover={image.isCover}
              onPreview={() => onSelect(index)}
              onSetCover={isPending ? undefined : setCover}
              onDelete={
                media.length > 1 && !isPending ? deleteImage : undefined
              }
            />
          )}
        </GalleryActions>
      ))}
    </div>
  );
}
