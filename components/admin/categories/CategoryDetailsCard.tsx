import { Category } from "@/types/category";

interface CategoryDetailsCardProps {
  category: Category;
}

export default function CategoryDetailsCard({
  category,
}: CategoryDetailsCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold text-white">
        Category Information
      </h2>

      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-zinc-500">
            Name
          </dt>

          <dd className="mt-1 text-white">
            {category.name}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-zinc-500">
            Slug
          </dt>

          <dd className="mt-1 text-white">
            {category.slug}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-zinc-500">
            Status
          </dt>

          <dd className="mt-1 text-white">
            {category.status === "active"
              ? "Live"
              : "Hidden"}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-zinc-500">
            ID
          </dt>

          <dd className="mt-1 break-all font-mono text-sm text-zinc-300">
            {category.id}
          </dd>
        </div>
      </dl>
    </div>
  );
}