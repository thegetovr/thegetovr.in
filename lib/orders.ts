import fs from "fs/promises";
import path from "path";

const ordersFilePath = path.join(
  process.cwd(),
  "data",
  "orders.json",
);

export async function getOrders() {
  const fileContent = await fs.readFile(
    ordersFilePath,
    "utf-8",
  );

  return JSON.parse(fileContent);
}

export async function getOrderByNumber(
  orderNumber: string,
) {
  const orders = await getOrders();

  return orders.find(
    (order: { orderNumber: string }) =>
      order.orderNumber === orderNumber,
  );
}

export async function saveOrder(order: unknown) {
  const orders = await getOrders();

  orders.push(order);

  await fs.writeFile(
    ordersFilePath,
    JSON.stringify(orders, null, 2),
  );
}