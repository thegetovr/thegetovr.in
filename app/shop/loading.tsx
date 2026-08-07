export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="space-y-2 mb-8">
        <div className="h-10 w-40 animate-pulse rounded bg-zinc-800" />
        <div className="h-5 w-72 animate-pulse rounded bg-zinc-800" />
      </div>

      <div className="mb-8 h-16 animate-pulse rounded-xl bg-zinc-900" />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-xl bg-zinc-900"
          />
        ))}
      </div>
    </main>
  );
}