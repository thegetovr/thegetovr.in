"use client";

import { useState } from "react";

import FileField from "@/components/admin/forms/FileField";
import SubmitButton from "@/components/admin/common/SubmitButton";
import TextField from "@/components/admin/forms/TextField";
import type { HomeCategory } from "@/types/home";
import { saveHomeCategories } from "@/lib/homeCategoryActions";

interface CategoriesFormProps {
  categories: HomeCategory[];
}

const defaultCategories: HomeCategory[] = [
  {
    id: "tshirts",
    title: "T-Shirts",
    subtitle: "Everyday essentials",
    image: null,
    link: "/shop",
    order: 1,
    enabled: true,
  },
  {
    id: "hoodies",
    title: "Hoodies",
    subtitle: "Built for expression",
    image: null,
    link: "/shop",
    order: 2,
    enabled: true,
  },
  {
    id: "oversized",
    title: "Oversized",
    subtitle: "Bigger statements",
    image: null,
    link: "/shop",
    order: 3,
    enabled: true,
  },
  {
    id: "collections",
    title: "Collections",
    subtitle: "Curated drops",
    image: null,
    link: "/shop",
    order: 4,
    enabled: true,
  },
];

function createCategory(index: number): HomeCategory {
  return {
    id: `category-${Date.now()}-${index}`,
    title: "New Category",
    subtitle: "Category description",
    image: null,
    link: "/shop",
    order: index + 1,
    enabled: true,
  };
}

export default function CategoriesForm({
  categories,
}: CategoriesFormProps) {
  const [items, setItems] = useState<HomeCategory[]>(
    categories.length > 0 ? categories : defaultCategories,
  );

  function addCategory() {
    setItems((current) => {
      const collectionsIndex = current.findIndex(
        (category) => category.id === "collections",
      );

      const newCategory = createCategory(current.length);

      if (collectionsIndex === -1) {
        return [...current, newCategory];
      }

      return [
        ...current.slice(0, collectionsIndex),
        newCategory,
        ...current.slice(collectionsIndex),
      ];
    });
  }

  function removeCategory(index: number) {
    const category = items[index];

    if (!category || category.id === "collections") {
      return;
    }

    setItems((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  return (
    <form
      action={saveHomeCategories}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Shop By Category
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Manage the categories displayed on the homepage.
          </p>
        </div>

        <button
          type="button"
          onClick={addCategory}
          className="inline-flex min-h-10 items-center justify-center border border-zinc-700 px-4 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          + Add Category
        </button>
      </div>

      <div className="mt-8 space-y-8">
        {items.length === 0 ? (
          <div className="border border-dashed border-zinc-800 px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">
              No homepage categories configured.
            </p>
          </div>
        ) : (
          items.map((category, index) => {
            const isCollections =
              category.id === "collections";

            return (
              <section
                key={category.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-5"
              >
                <input
                  type="hidden"
                  name={`category-${index}-id`}
                  value={category.id}
                />

                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
                      Category {index + 1}
                    </h3>

                    {isCollections && (
                      <p className="mt-1 text-[11px] text-zinc-500">
                        Permanent final category
                      </p>
                    )}
                  </div>

                  {!isCollections && (
                    <button
                      type="button"
                      onClick={() => removeCategory(index)}
                      className="text-xs font-medium text-red-400 transition hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <TextField
                    id={`category-${index}-title`}
                    name={`category-${index}-title`}
                    label="Title"
                    defaultValue={category.title}
                  />

                  <TextField
                    id={`category-${index}-subtitle`}
                    name={`category-${index}-subtitle`}
                    label="Subtitle"
                    defaultValue={category.subtitle}
                  />

                  <TextField
                    id={`category-${index}-link`}
                    name={`category-${index}-link`}
                    label="Link"
                    defaultValue={category.link}
                  />

                  <TextField
                    id={`category-${index}-order`}
                    name={`category-${index}-order`}
                    label="Display Order"
                    type="number"
                    defaultValue={category.order}
                    min={1}
                    disabled={isCollections}
                  />
                </div>

                <div className="mt-6">
                  <FileField
                    id={`category-${index}-image`}
                    name={`category-${index}-image`}
                    label="Category Image"
                  />

                  {category.image?.url && (
                    <p className="mt-2 text-xs text-zinc-500">
                      An image is currently configured. Uploading a new image
                      will replace it.
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {isCollections && (
                    <input
                      type="hidden"
                      name={`category-${index}-enabled`}
                      value="on"
                    />
                  )}

                  <input
                    id={`category-${index}-enabled`}
                    name={`category-${index}-enabled`}
                    type="checkbox"
                    defaultChecked={
                      isCollections ? true : category.enabled
                    }
                    disabled={isCollections}
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-950"
                  />

                  <label
                    htmlFor={`category-${index}-enabled`}
                    className="text-sm text-zinc-300"
                  >
                    {isCollections
                      ? "Always shown on the homepage"
                      : "Show this category on the homepage"}
                  </label>
                </div>
              </section>
            );
          })
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <SubmitButton
          label="Save Categories"
          pendingLabel="Saving..."
        />
      </div>
    </form>
  );
}