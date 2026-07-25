import { Order } from "@/types/order";
import { CartItem } from "@/types/cart";
import { CustomerInfo } from "@/types/order";

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);

  return `TG-${timestamp}-${random}`;
}

export function createOrder(
  customer: CustomerInfo,
  items: CartItem[],
  subtotal: number,
  discount: number,
  coupon?: string
): Order {
  return {
    id: crypto.randomUUID(),
    orderNumber: generateOrderNumber(),

    customer,

    items,

    subtotal,
    discount,
    total: subtotal - discount,

    coupon,

    status: "pending",

    createdAt: new Date().toISOString(),
  };
}