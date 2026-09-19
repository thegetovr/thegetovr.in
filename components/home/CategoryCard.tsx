import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  index: number;
  id?: string;
};

function getObjectPosition(id?: string) {
  switch (id) {
    case "tshirts":
      return "50% 45%";
    case "hoodies":
      return "50% 45%";
    case "oversized":
      return "50% 50%";
    case "collections":
      return "50% 50%";
    default:
      return "50% 50%";
  }
}

export default function CategoryCard({
  title,
  subtitle,
  image,
  link,
  id,
}: Props) {
  return (
    <Link
      href={link}
      className="
        group
        relative
        block
        aspect-[1.28/1]
        overflow-hidden
        bg-(--color-surface-muted)
        sm:aspect-[1.55/1]
        lg:aspect-[1.86/1]
      "
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="
            (max-width: 639px) 50vw,
            (max-width: 1023px) 50vw,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.035]
          "
          style={{
            objectPosition: getObjectPosition(id),
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-(--color-surface-muted)">
          <span
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-(--color-text-muted)
              sm:text-[9px]
            "
          >
            Category Image
          </span>
        </div>
      )}

      {/* Image contrast */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/65
          via-black/10
          to-transparent
        "
      />

      {/* Content */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          px-3
          pb-3.5
          sm:px-4
          sm:pb-4
          lg:px-5
          lg:pb-4.5
        "
      >
        <h3
          className="
            text-[16px]
            font-medium
            leading-[1.05]
            tracking-[-0.02em]
            text-white
            sm:text-[18px]
            lg:text-[20px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-[9px]
            font-normal
            leading-[1.35]
            text-white/90
            sm:text-[10px]
            lg:text-[10.5px]
          "
        >
          {subtitle}
        </p>

        <span
          className="
            mt-2.5
            inline-flex
            items-center
            gap-1
            border-b
            border-white/80
            pb-1
            text-[8px]
            font-medium
            uppercase
            tracking-[0.08em]
            text-white
            sm:mt-3
            sm:text-[9px]
          "
        >
          Explore

          <ArrowRight
            size={11}
            strokeWidth={1.4}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}