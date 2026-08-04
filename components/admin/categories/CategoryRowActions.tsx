"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import ConfirmDialog from "@/components/admin/common/ConfirmDialog";
import { deleteCategory } from "@/lib/categoryActions";

interface CategoryRowActionsProps {
  categoryId: string;
}

export default function CategoryRowActions({
  categoryId,
}: CategoryRowActionsProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-md p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          aria-label="Category actions"
        >
          <MoreHorizontal size={18} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={6}
          className="min-w-45 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl"
        >
          <DropdownMenu.Item asChild>
            <Link
              href={`/admin/categories/${categoryId}`}
              className="block cursor-pointer rounded-md px-3 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800"
            >
              View Category
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link
              href={`/admin/categories/${categoryId}/edit`}
              className="block cursor-pointer rounded-md px-3 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800"
            >
              Edit Category
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-zinc-800" />

          <ConfirmDialog
            trigger={
              <button className="w-full rounded-md px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10">
                Delete Category
              </button>
            }
            title="Delete Category"
            description="Are you sure you want to delete this category? This action cannot be undone."
            confirmLabel="Delete"
            pendingLabel="Deleting..."
            action={deleteCategory.bind(null, categoryId)}
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}