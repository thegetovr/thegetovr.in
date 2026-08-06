import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useTransition } from "react";
import GalleryThumbnail from "./GalleryThumbnail";
import GalleryActions from "./GalleryActions";
import { reorderProductImages } from "@/lib/productMediaActions";
interface ProductMedia {
  url: string;
  publicId: string;
  alt: string;
  isCover: boolean;
}

interface GalleryGridProps {
  productId: string;
  media: ProductMedia[];
  selectedPublicId: string;
  onSelect: (publicId: string) => void;
}
interface SortableThumbnailProps {
  image: ProductMedia;
  active: boolean;
  canDelete: boolean;
  onPreview: () => void;
  onSetCover?: () => void;
  onDelete?: () => void;
}

function SortableThumbnail({
  image,
  active,
  canDelete,
  onPreview,
  onSetCover,
  onDelete,
}: SortableThumbnailProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: image.publicId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <GalleryThumbnail
        src={image.url}
        alt={image.alt}
        active={active}
        isCover={image.isCover}
        onPreview={onPreview}
        onSetCover={onSetCover}
        onDelete={canDelete ? onDelete : undefined}
      />
    </div>
  );
}
export default function GalleryGrid({
  productId,
  media,
  selectedPublicId,
  onSelect,
}: GalleryGridProps) {
  const [, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const [mediaState, setMediaState] = useState(() => media);
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = mediaState.findIndex(
      (image) => image.publicId === active.id,
    );

    const newIndex = mediaState.findIndex(
      (image) => image.publicId === over.id,
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedMedia = arrayMove(mediaState, oldIndex, newIndex);

    setMediaState(reorderedMedia);

    const orderedPublicIds = reorderedMedia.map((image) => image.publicId);

    startTransition(async () => {
      await reorderProductImages(productId, orderedPublicIds);
    });
  }
  if (mediaState !== media) {
    const currentIds = mediaState.map((image) => image.publicId).join(",");
    const nextIds = media.map((image) => image.publicId).join(",");

    if (currentIds !== nextIds) {
      setMediaState(media);
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={mediaState.map((image) => image.publicId)}
        strategy={rectSortingStrategy}
      >
        <div className="mt-4 grid grid-cols-4 gap-3">
          {mediaState.map((image) => (
            <GalleryActions
              key={image.publicId}
              productId={productId}
              publicId={image.publicId}
            >
              {({ setCover, deleteImage, isPending }) => {
                function handleSetCover() {
                  setMediaState((current) =>
                    current.map((item) => ({
                      ...item,
                      isCover: item.publicId === image.publicId,
                    })),
                  );

                  setCover();
                }

                return (
                  <SortableThumbnail
                    image={image}
                    active={selectedPublicId === image.publicId}
                    canDelete={mediaState.length > 1 && !isPending}
                    onPreview={() => onSelect(image.publicId)}
                    onSetCover={isPending ? undefined : handleSetCover}
                    onDelete={deleteImage}
                  />
                );
              }}
            </GalleryActions>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
