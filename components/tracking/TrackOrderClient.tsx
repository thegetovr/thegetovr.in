"use client";
import CustomerCard from "@/components/orders/CustomerCard";
import { useState } from "react";
import orders from "@/data/orders.json";
import type { Order } from "@/types/order";
import PaymentSummary from "@/components/orders/PaymentSummary";
import OrderItems from "@/components/orders/OrderItems";
import OrderTrackingCard from "@/components/orders/OrderTrackingCard";
import ShippingCard from "@/components/orders/ShippingCard";
import OrderTrackingSearch from "./OrderTrackingSearch";


export default function TrackOrderClient() {
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSearch(orderNumber: string, email: string) {
    const order = (orders as Order[]).find(
      (order) =>
        order.orderNumber.toLowerCase() === orderNumber.toLowerCase() &&
        order.customer.email.toLowerCase() === email.toLowerCase(),
    );

    setMatchedOrder(order ?? null);
    setSearched(true);

    console.log("Matched Order:", order);
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
        <div className="mt-8 rounded-2xl border border-red-800 bg-red-950/30 p-6 text-center">
          <p className="text-red-300 font-semibold">
            We couldn&apos;t find an order matching the provided Order Number
            and Email. Please check your details and try again.
          </p>
        </div>
      )}
    </>
  );
}
