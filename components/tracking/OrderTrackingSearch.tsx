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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="orderNumber"
          className="text-sm font-medium text-(--color-text-primary)"
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
          className="w-full border border-(--color-border) bg-(--color-page) px-4 py-3 text-(--color-text-primary) placeholder:text-(--color-text-muted) outline-none transition focus:border-(--color-accent)"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-(--color-text-primary)"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-(--color-border) bg-(--color-page) px-4 py-3 text-(--color-text-primary) placeholder:text-(--color-text-muted) outline-none transition focus:border-(--color-accent)"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-(--color-text-primary) py-3 font-semibold text-white transition hover:bg-(--color-accent)"
      >
        Track Order
      </button>
    </form>
  );
}