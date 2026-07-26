import TrackOrderClient from "@/components/tracking/TrackOrderClient";
export default function TrackOrderPage() {
  function handleSearch(orderNumber: string, email: string) {
    console.log("Track Order:", { orderNumber, email });
  }
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Track Your Order</h1>

          <p className="text-zinc-400">
            Enter your Order Number and Email Address to view your latest order
            status.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <TrackOrderClient />

          {/* Results */}
        </div>
      </section>
    </main>
  );
}
