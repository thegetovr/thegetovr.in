import type { AdminNavigationItem } from "@/types/admin";
import {
  DashboardIcon,
  OrdersIcon,
  ProductsIcon,
  CustomersIcon,
  CouponsIcon,
  AnalyticsIcon,
  SettingsIcon,
} from "@/components/admin/icons";

export const adminNavigation: AdminNavigationItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: DashboardIcon,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: OrdersIcon,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: ProductsIcon,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: CustomersIcon,
  },
  {
    name: "Coupons",
    href: "/admin/coupons",
    icon: CouponsIcon,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: AnalyticsIcon,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: SettingsIcon,
  },
];