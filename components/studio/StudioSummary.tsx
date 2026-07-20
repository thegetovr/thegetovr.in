export default function StudioSummary() {
  return (
    <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-8 text-2xl font-bold">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Product</span>

          <span>₹799</span>

        </div>

        <div className="flex justify-between">

          <span>Printing</span>

          <span>₹0</span>

        </div>

        <div className="border-t border-zinc-700 pt-5">

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span>₹799</span>

          </div>

        </div>

      </div>

      <button className="mt-10 w-full rounded-2xl bg-white py-4 font-bold text-black transition hover:scale-[1.02]">

        Add To Cart

      </button>

    </aside>
  );
}