import TrackOrderClient from "@/components/tracking/TrackOrderClient";

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-(--color-page) text-(--color-text-primary)">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-(--color-text-primary)">
            Track Your Order
          </h1>

          <p className="text-(--color-text-secondary)">
            Enter your Order Number and Email Address to view your latest order
            status.
          </p>
        </div>

        <div className="mt-10 border border-(--color-border) bg-(--color-surface) p-6">
          <TrackOrderClient />

          {/* Results */}
        </div>
      </section>
    </main>
  );
}