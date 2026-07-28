import { CartItem } from "./cart";

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "printing"
  | "quality-check"
  | "packaging"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}
export interface OrderItem {
  id: string;

  product: string;
  color: string;
  size: string;
  quantity: number;
  printSide: string;

  frontElements: unknown[];
  backElements: unknown[];

  unitPrice: number;
  totalPrice: number;

  createdAt: string;
}
export interface Order {
  id: string;
  orderNumber: string;

  customer: CustomerInfo;

  items: CartItem[];

  subtotal: number;
  discount: number;
  total: number;

  coupon?: string;

  status: OrderStatus;

  createdAt: string;
}