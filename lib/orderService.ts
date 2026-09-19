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
   * USER OWNERSHIP
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
   * Email filter retained for admin/backward compatibility.
   */
  if (email?.trim()) {
    query["customer.email"] = email.trim().toLowerCase();
  }

  const foundOrders = await Order.find(query).sort({ createdAt: -1 }).lean();

  return foundOrders as OrderType[];
}

/*
 * Get a single order.
 *
 * When userId is supplied, only that user's order
 * can be returned.
 */
export async function getOrderByNumber(
  orderNumber: string,
  userId?: string,
): Promise<OrderType | null> {
  await connectToDatabase();

  const query: Record<string, unknown> = {
    orderNumber: orderNumber.trim(),
  };

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
 * This remains orderNumber based because it is intended
 * for admin/order-management operations.
 *
 * The API calling this function must verify admin access.
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
 * SECURITY:
 * We do not blindly trust the client's subtotal/discount/total.
 *
 * At this stage we verify that the numbers supplied by the
 * checkout are internally consistent.
 *
 * Server-side product-price verification will be handled
 * separately so we do not disturb the existing product flow.
 */
export async function createOrder(orderData: Record<string, unknown>) {
  await connectToDatabase();

  const items = orderData.items;

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Order must contain at least one item.");
  }

  /*
   * Validate every item calculation.
   */
  let calculatedItemsTotal = 0;

  for (const item of items) {
    if (!item || typeof item !== "object") {
      throw new Error("Invalid order item.");
    }

    const orderItem = item as Record<string, unknown>;

    const quantity = Number(orderItem.quantity);
    const unitPrice = Number(orderItem.unitPrice);
    const totalPrice = Number(orderItem.totalPrice);

    if (
      !Number.isFinite(quantity) ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      throw new Error("Invalid item quantity.");
    }

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      throw new Error("Invalid item price.");
    }

    if (!Number.isFinite(totalPrice) || totalPrice < 0) {
      throw new Error("Invalid item total.");
    }

    const expectedItemTotal = unitPrice * quantity;

    /*
     * Small floating-point tolerance.
     */
    if (Math.abs(expectedItemTotal - totalPrice) > 0.01) {
      throw new Error("Order item price calculation is invalid.");
    }

    calculatedItemsTotal += totalPrice;
  }

  /*
   * Validate subtotal.
   */
  const subtotal = Number(orderData.subtotal);

  if (!Number.isFinite(subtotal) || subtotal < 0) {
    throw new Error("Invalid order subtotal.");
  }

  if (Math.abs(calculatedItemsTotal - subtotal) > 0.01) {
    throw new Error("Order subtotal does not match the item totals.");
  }

  /*
   * Validate discount.
   */
  const discount =
    orderData.discount === undefined || orderData.discount === null
      ? 0
      : Number(orderData.discount);

  if (!Number.isFinite(discount) || discount < 0) {
    throw new Error("Invalid order discount.");
  }

  if (discount > subtotal) {
    throw new Error("Order discount cannot exceed the subtotal.");
  }

  /*
   * Calculate the expected final total on the server.
   */
  const calculatedTotal = subtotal - discount;

  /*
   * Validate the client's total against our calculation.
   */
  const clientTotal = Number(orderData.total);

  if (!Number.isFinite(clientTotal) || clientTotal < 0) {
    throw new Error("Invalid order total.");
  }

  if (Math.abs(clientTotal - calculatedTotal) > 0.01) {
    throw new Error("Order total calculation is invalid.");
  }

  /*
   * Server controls the initial order status.
   */
  const data = {
    ...orderData,

    subtotal,

    discount,

    total: calculatedTotal,

    status: "pending",

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
