import type { AdminNavigationItem } from "@/types/admin";

import {
  DashboardIcon,
  OrdersIcon,
  ProductsIcon,
  PackageIcon,
  CustomersIcon,
  ReviewsIcon,
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
    name: "Home",
    href: "/admin/home",
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
    name: "Categories",
    href: "/admin/categories",
    icon: PackageIcon,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: CustomersIcon,
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: ReviewsIcon,
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
    name: "Announcements",
    href: "/admin/announcements",
    icon: ReviewsIcon,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: SettingsIcon,
  },
];
