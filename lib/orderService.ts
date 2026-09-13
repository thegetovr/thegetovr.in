import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { isValidOrderStatus } from "@/constants/orderStatuses";

import type { Order as OrderType, OrderStatus } from "@/types/order";

type GetOrdersOptions = {
  search?: string;
  status?: OrderStatus;
  email?: string;
};

export async function getOrders(
  options: GetOrdersOptions = {},
): Promise<OrderType[]> {
  await connectToDatabase();

  const { search, status, email } = options;

  const query: Record<string, unknown> = {};

  if (search?.trim()) {
    query.$or = [
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
    ];
  }

  if (status && isValidOrderStatus(status)) {
    query.status = status;
  }

  if (email?.trim()) {
    query["customer.email"] = email.trim();
  }

  const foundOrders = await Order.find(query).sort({ createdAt: -1 }).lean();

  return foundOrders;
}

export async function getOrderByNumber(
  orderNumber: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  return await Order.findOne({
    orderNumber,
  }).lean();
}

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
): Promise<OrderType | null> {
  await connectToDatabase();

  if (!isValidOrderStatus(status)) {
    throw new Error("Invalid order status.");
  }

  return await Order.findOneAndUpdate(
    {
      orderNumber,
    },
    {
      $set: {
        status,
      },
      $push: {
        statusHistory: {
          status,
          updatedAt: new Date().toISOString(),
        },
      },
    },
    {
      new: true,
    },
  ).lean();
}
export async function updateAdminNotes(
  orderNumber: string,
  notes: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  return await Order.findOneAndUpdate(
    {
      orderNumber,
    },
    {
      adminNotes: notes.trim(),
    },
    {
      new: true,
    },
  ).lean();
}
export async function getOrderByNumberAndEmail(
  orderNumber: string,
  email: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  return await Order.findOne({
    orderNumber,
    "customer.email": email.trim(),
  }).lean();
}

export async function createOrder(orderData: Record<string, unknown>) {
  await connectToDatabase();

  const data = {
    ...orderData,
    statusHistory: [
      {
        status: "pending",
        updatedAt: new Date().toISOString(),
      },
    ],
  };

  const order = await Order.create(data);

  return order.toObject();
}
