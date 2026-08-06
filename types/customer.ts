export type CustomerStatus =
  | "active"
  | "inactive";

export interface Customer {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  totalOrders: number;
  totalSpent: number;

  status: CustomerStatus;

  joinedAt: string;
}