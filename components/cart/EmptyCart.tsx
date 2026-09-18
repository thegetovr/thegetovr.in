import Link from "next/link";

export default function EmptyCart() {
  return (
    <section className="flex min-h-[55vh] items-center justify-center border-y border-(--color-border)">
      <div className="max-w-xl py-20 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-(--color-text-muted)">
          Your selection
        </p>

        <h1 className="mt-5 font-(--font-editorial) text-5xl font-normal leading-tight text-(--color-text-primary) sm:text-6xl">
          Your cart is empty.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-(--color-text-secondary)">
          Nothing here yet. Explore the collection and find something that
          feels like you.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-sm bg-(--color-text-primary) px-8 py-4 font-semibold text-(--color-white) transition-colors hover:bg-(--color-text-secondary)"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}