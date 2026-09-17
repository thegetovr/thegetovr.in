import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { isValidOrderStatus } from "@/constants/orderStatuses";
import type { Order as OrderType, OrderStatus } from "@/types/order";
import mongoose from "mongoose";

type GetOrdersOptions = {
  search?: string;
  status?: OrderStatus;
  email?: string;
  userId?: string;
};

export async function getOrders(
  options: GetOrdersOptions = {},
): Promise<OrderType[]> {
  await connectToDatabase();

  const { search, status, email, userId } = options;

  const query: Record<string, unknown> = {};

  /*
   * 🔐 USER OWNERSHIP
   *
   * If userId is provided, orders are fetched ONLY
   * for that specific User account.
   */
  if (userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [];
    }

    query.userId = new mongoose.Types.ObjectId(userId);
  }

  /*
   * Search is mainly useful for admin-side order management.
   */
  if (search?.trim()) {
    query.$or = [
      { orderNumber: { $regex: search, $options: "i" } },
      { "customer.firstName": { $regex: search, $options: "i" } },
      { "customer.lastName": { $regex: search, $options: "i" } },
      { "customer.email": { $regex: search, $options: "i" } },
    ];
  }

  if (status && isValidOrderStatus(status)) {
    query.status = status;
  }

  /*
   * Email filter is retained for admin/backward compatibility.
   *
   * IMPORTANT:
   * User-facing APIs should use userId instead of email.
   */
  if (email?.trim()) {
    query["customer.email"] = email.trim().toLowerCase();
  }

  const foundOrders = await Order.find(query).sort({ createdAt: -1 }).lean();

  return foundOrders as OrderType[];
}

/*
 * 🔐 Get a single order only if it belongs to the logged-in user.
 */
export async function getOrderByNumber(
  orderNumber: string,
  userId?: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  const query: Record<string, unknown> = {
    orderNumber: orderNumber.trim(),
  };

  /*
   * When userId is supplied, ownership is mandatory.
   */
  if (userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }

    query.userId = new mongoose.Types.ObjectId(userId);
  }

  const order = await Order.findOne(query).lean();

  return order as OrderType | null;
}

/*
 * Update order status.
 *
 * This is kept orderNumber based because this function
 * is intended for admin/order-management operations.
 */
export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
): Promise<OrderType | null> {
  await connectToDatabase();

  if (!isValidOrderStatus(status)) {
    throw new Error("Invalid order status.");
  }

  const updatedOrder = await Order.findOneAndUpdate(
    {
      orderNumber: orderNumber.trim(),
    },
    {
      $set: { status },
      $push: {
        statusHistory: {
          status,
          updatedAt: new Date().toISOString(),
        },
      },
    },
    { new: true },
  ).lean();

  return updatedOrder as OrderType | null;
}

/*
 * Update admin notes.
 */
export async function updateAdminNotes(
  orderNumber: string,
  notes: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  const updatedOrder = await Order.findOneAndUpdate(
    {
      orderNumber: orderNumber.trim(),
    },
    {
      adminNotes: notes.trim(),
    },
    { new: true },
  ).lean();

  return updatedOrder as OrderType | null;
}

/*
 * Legacy/helper lookup.
 *
 * Kept so existing code doesn't immediately break.
 * New user-facing APIs should NOT trust an email
 * supplied by the frontend.
 */
export async function getOrderByNumberAndEmail(
  orderNumber: string,
  email: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  const order = await Order.findOne({
    orderNumber: orderNumber.trim(),
    "customer.email": email.trim().toLowerCase(),
  }).lean();

  return order as OrderType | null;
}

/*
 * Create a new order.
 *
 * userId MUST be supplied by the authenticated server-side API.
 */
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
