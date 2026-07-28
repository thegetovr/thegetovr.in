import orders from "@/data/orders.json";
import type { Order } from "@/types/order";

export function getOrders(): Order[] {
  return orders as unknown as Order[];
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return getOrders().find(
    (order) => order.orderNumber === orderNumber
  );
  
}
export function getOrderByNumberAndEmail(
  orderNumber: string,
  email: string
): Order | undefined {
  return getOrders().find(
    (order) =>
      order.orderNumber.toLowerCase() === orderNumber.toLowerCase() &&
      order.customer.email.toLowerCase() === email.toLowerCase()
  );
}