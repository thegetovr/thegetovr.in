import type { LucideIcon } from "lucide-react";

export type AdminIcon = LucideIcon;

export interface AdminNavigationItem {
  name: string;
  href: string;
  icon: AdminIcon;
}