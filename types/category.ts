export type CategoryStatus =
  | "active"
  | "hidden";

export interface Category {
  id: string;
  name: string;
  slug: string;
  status: CategoryStatus;
}