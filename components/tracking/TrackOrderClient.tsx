"use client";

import CustomerCard from "@/components/orders/CustomerCard";
import { useState } from "react";
import type { Order } from "@/types/order";
import PaymentSummary from "@/components/orders/PaymentSummary";
import OrderItems from "@/components/orders/OrderItems";
import OrderTrackingCard from "@/components/orders/OrderTrackingCard";
import ShippingCard from "@/components/orders/ShippingCard";
import OrderTrackingSearch from "./OrderTrackingSearch";

export default function TrackOrderClient() {
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch(orderNumber: string, email: string) {
    const response = await fetch("/api/orders/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNumber,
        email,
      }),
    });

    console.log("Status:", response.status);

    const text = await response.text();

    console.log("Response Body:", text);

    try {
      const data = JSON.parse(text);

      setMatchedOrder(data.order ?? null);
      setSearched(true);
    } catch (error) {
      console.error("Invalid JSON:", error);
      setMatchedOrder(null);
      setSearched(true);
    }
  }

  return (
    <>
      <div className="mb-8">
        <OrderTrackingSearch onSearch={handleSearch} />
      </div>

      {matchedOrder && (
        <div className="mt-8">
          <OrderTrackingCard
            orderNumber={matchedOrder.orderNumber}
            status={matchedOrder.status}
            createdAt={matchedOrder.createdAt}
          />
        </div>
      )}

      {matchedOrder && (
        <div className="mt-6">
          <CustomerCard customer={matchedOrder.customer} />
        </div>
      )}

      {matchedOrder && (
        <div className="mt-6">
          <ShippingCard customer={matchedOrder.customer} />
        </div>
      )}

      {matchedOrder && (
        <div className="mt-6">
          <OrderItems items={matchedOrder.items} />
        </div>
      )}

      {matchedOrder && (
        <div className="mt-6">
          <PaymentSummary
            subtotal={matchedOrder.subtotal}
            discount={matchedOrder.discount}
            total={matchedOrder.total}
          />
        </div>
      )}

      {searched && !matchedOrder && (
        <div className="mt-8 border border-(--color-error) bg-(--color-surface-muted) p-6 text-center">
          <p className="font-semibold text-(--color-error)">
            We couldn&apos;t find an order matching the provided Order Number
            and Email. Please check your details and try again.
          </p>
        </div>
      )}
    </>
  );
}