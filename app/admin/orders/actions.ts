"use server";

import { revalidatePath } from "next/cache";

import {
  updateAdminNotes,
  updateOrderStatus,
} from "@/lib/orderService";

import type { OrderStatus } from "@/types/order";

export async function updateOrderStatusAction(
  orderNumber: string,
  status: OrderStatus,
) {
  await updateOrderStatus(orderNumber, status);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderNumber}`);
  revalidatePath("/admin");
}
export async function updateAdminNotesAction(
  orderNumber: string,
  notes: string,
) {
  await updateAdminNotes(orderNumber, notes);

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderNumber}`);
}