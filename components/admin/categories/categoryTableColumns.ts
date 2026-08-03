export interface CategoryTableColumn {
  key:
    | "name"
    | "slug"
    | "status"
    | "actions";
  label: string;
  align?: "left" | "right";
}

export const CATEGORY_TABLE_COLUMNS: CategoryTableColumn[] = [
  {
    key: "name",
    label: "Category",
  },
  {
    key: "slug",
    label: "Slug",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
    align: "right",
  },
];