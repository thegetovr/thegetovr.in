"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import ConfirmDialog from "@/components/admin/common/ConfirmDialog";
import { deleteProduct } from "@/lib/productActions";

interface ProductRowActionsProps {
  productId: string;
}

export default function ProductRowActions({
  productId,
}: ProductRowActionsProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-md p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          aria-label="Product actions"
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
              href={`/admin/products/${productId}`}
              className="block cursor-pointer rounded-md px-3 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800"
            >
              View Product
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link
              href={`/admin/products/${productId}/edit`}
              className="block cursor-pointer rounded-md px-3 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800"
            >
              Edit Product
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-zinc-800" />

          <ConfirmDialog
            trigger={
              <button className="w-full rounded-md px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10">
                Delete Product
              </button>
            }
            title="Delete Product"
            description="Are you sure you want to delete this product? This action cannot be undone."
            confirmLabel="Delete"
            pendingLabel="Deleting..."
            action={deleteProduct.bind(null, productId)}
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}