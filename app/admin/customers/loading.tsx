export default function CustomersLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="h-8 w-56 animate-pulse rounded bg-zinc-800" />

        <div className="mt-2 h-5 w-72 animate-pulse rounded bg-zinc-900" />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl bg-zinc-900"
            />
          ))}
        </div>

        <div className="mt-8 h-12 animate-pulse rounded-xl bg-zinc-900" />

        <div className="mt-6 h-105] animate-pulse rounded-xl bg-zinc-900" />
      </section>
    </main>
  );
}