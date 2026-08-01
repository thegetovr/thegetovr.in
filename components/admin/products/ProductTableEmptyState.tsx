interface ProductTableEmptyStateProps {
  colSpan: number;
}

export default function ProductTableEmptyState({
  colSpan,
}: ProductTableEmptyStateProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-12 text-center text-sm text-zinc-400"
      >
        No products found.
      </td>
    </tr>
  );
}