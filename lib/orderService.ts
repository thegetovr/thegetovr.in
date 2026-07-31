import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { isValidOrderStatus } from "@/constants/orderStatuses";
import type {
  Order as OrderType,
  OrderStatus,
} from "@/types/order";

type GetOrdersOptions = {
  search?: string;
  status?: OrderStatus;
};

export async function getOrders(
  options: GetOrdersOptions = {},
): Promise<OrderType[]> {
  await connectToDatabase();

  const { search, status } = options;

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