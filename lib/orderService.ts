import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export async function getOrders() {
  await connectToDatabase();
  return await Order.find().sort({ createdAt: -1 }).lean();
}

export async function getOrderByNumber(orderNumber: string) {
  await connectToDatabase();
  return await Order.findOne({ orderNumber }).lean();
}
export async function getOrderByNumberAndEmail(
  orderNumber: string,
  email: string
) {
  await connectToDatabase();

  return await Order.findOne({
    orderNumber,
    "customer.email": email,
  }).lean();
}
export async function createOrder(orderData: Record<string, unknown>) {
  await connectToDatabase();

  const order = await Order.create(orderData);

  return order.toObject();
}