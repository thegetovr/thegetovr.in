import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const coverImage =
    product.media.find((image) => image.isCover) ??
    product.media[0];

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-800">
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt || product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No Image
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {product.category}
        </p>

        <h3 className="line-clamp-2 text-lg font-semibold">
          {product.name}
        </h3>

        <p className="text-xl font-bold">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <p
          className={`text-sm ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <Link
          href={`/shop/${product.id}`}
          className="block rounded-lg bg-black px-4 py-2 text-center text-white transition hover:bg-zinc-800"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}