import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

import type { Customer } from "@/types/customer";

export async function getCustomers(
  options: {
    search?: string;
    status?: "active" | "inactive" | "";
  } = {},
): Promise<Customer[]> {
  await connectToDatabase();

  const orders = await Order.find().sort({ createdAt: 1 }).lean();
  const { search = "", status = "" } = options;

  const customerMap = new Map<string, Customer>();

  for (const order of orders) {
    const email = order.customer.email.toLowerCase();

    const existing = customerMap.get(email);

    if (!existing) {
      customerMap.set(email, {
        id: email,
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
        email: order.customer.email,
        phone: order.customer.phone,
        totalOrders: 1,
        totalSpent: order.total,
        status: "active",
        joinedAt: String(order.createdAt),
      });

      continue;
    }

    existing.totalOrders += 1;
    existing.totalSpent += order.total;
  }

  let customers = Array.from(customerMap.values());

  if (search.trim()) {
    const query = search.trim().toLowerCase();

    customers = customers.filter((customer) =>
      [customer.firstName, customer.lastName, customer.email, customer.phone]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  if (status) {
    customers = customers.filter((customer) => customer.status === status);
  }

  return customers.sort(
    (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
  );
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const customers = await getCustomers();
  return (
    customers.find(
      (customer) =>
        customer.id.toLowerCase() === decodeURIComponent(id).toLowerCase(),
    ) ?? null
  );
}

export async function searchCustomers(search: string): Promise<Customer[]> {
  const customers = await getCustomers();

  const query = search.trim().toLowerCase();

  if (!query) {
    return customers;
  }

  return customers.filter((customer) =>
    [customer.firstName, customer.lastName, customer.email, customer.phone]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}

export async function getCustomerStats() {
  const customers = await getCustomers();

  return {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(
      (customer) => customer.status === "active",
    ).length,
    inactiveCustomers: customers.filter(
      (customer) => customer.status === "inactive",
    ).length,
  };
}
export async function getCustomerOrders(email: string) {
  await connectToDatabase();

  const orders = await Order.find({
    "customer.email": {
      $regex: `^${email}$`,
      $options: "i",
    },
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  return orders;
}
