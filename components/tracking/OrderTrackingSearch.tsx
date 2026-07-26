import { useState } from "react";

interface OrderTrackingSearchProps {
  onSearch: (orderNumber: string, email: string) => void;
}
export default function OrderTrackingSearch({
  onSearch,
}: OrderTrackingSearchProps) {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSearch(orderNumber.trim(), email.trim());
    setOrderNumber("");
    setEmail("");
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="orderNumber"
          className="text-sm font-medium text-zinc-300"
        >
          Order Number
        </label>

        <input
          id="orderNumber"
          type="text"
          required
          placeholder="e.g. GET-1001"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-300">
          Email Address
        </label>

        <input
          id="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-zinc-200"
      >
        Track Order
      </button>
    </form>
  );
}
