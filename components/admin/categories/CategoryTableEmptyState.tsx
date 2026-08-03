interface CategoryTableEmptyStateProps {
  colSpan: number;
}

export default function CategoryTableEmptyState({
  colSpan,
}: CategoryTableEmptyStateProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-16 text-center"
      >
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white">
            No categories found
          </h3>

          <p className="text-sm text-zinc-400">
            Try adjusting your search or create your first
            category.
          </p>
        </div>
      </td>
    </tr>
  );
}