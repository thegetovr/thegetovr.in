import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import type { Order as OrderType } from "@/types/order";

export async function getOrders(): Promise<OrderType[]> {
  await connectToDatabase();

  return await Order.find().lean();
}

export async function searchOrders(
  search: string,
): Promise<OrderType[]> {
  await connectToDatabase();

  if (!search.trim()) {
    return await getOrders();
  }

  const query = {
    $or: [
      {
        orderNumber: {
          $regex: search,
          $options: "i",
        },
      },
      {
        "customer.firstName": {
          $regex: search,
          $options: "i",
        },
      },
      {
        "customer.lastName": {
          $regex: search,
          $options: "i",
        },
      },
      {
        "customer.email": {
          $regex: search,
          $options: "i",
        },
      },
    ],
  };

  return await Order.find(query).lean();
}

export async function getOrderByNumber(
  orderNumber: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  return await Order.findOne({ orderNumber }).lean();
}

export async function getOrderByNumberAndEmail(
  orderNumber: string,
  email: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  return await Order.findOne({
    orderNumber,
    "customer.email": email,
  }).lean();
}

export async function createOrder(
  orderData: Record<string, unknown>,
) {
  await connectToDatabase();

  const order = await Order.create(orderData);

  return order.toObject();
}