import fs from "fs/promises";
import path from "path";
import { Order } from "@/types/order";

const ordersFilePath = path.join(
  process.cwd(),
  "data",
  "orders.json",
);

export async function getOrders(): Promise<Order[]> {
  const fileContent = await fs.readFile(
    ordersFilePath,
    "utf-8",
  );

  return JSON.parse(fileContent);
}

export async function getOrderByNumber(
  orderNumber: string,
): Promise<Order | null> {
  const orders = await getOrders();

  return (
    orders.find(
      (order) => order.orderNumber === orderNumber,
    ) ?? null
  );
}

export async function saveOrder(
  order: Partial<Order>,
): Promise<void> {
  const orders = await getOrders();

  orders.push(order as Order);

  await fs.writeFile(
    ordersFilePath,
    JSON.stringify(orders, null, 2),
    "utf-8",
  );
}