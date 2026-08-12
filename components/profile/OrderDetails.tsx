"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Download,
  ExternalLink,
  MapPin,
  Pencil,
  RotateCcw,
  Truck,
} from "lucide-react";
import OrderItems from "@/components/orders/OrderItems";
import PaymentSummary from "@/components/orders/PaymentSummary";
import ShippingCard from "@/components/orders/ShippingCard";
import OrderTrackingCard from "@/components/orders/OrderTrackingCard";

interface Order {
  id: string;
  date: string;
  time: string;
  items: number;
  productName: string;
  image: string;
  price: string;
  payment: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  deliveryText: string;
}

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

export default function OrderDetails({ order, onBack }: OrderDetailsProps) {
  const [fullOrder, setFullOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `/api/orders/${encodeURIComponent(order.id)}`,
        );

        const result = await response.json();

        if (!result.success) {
          console.error(result.message);
          return;
        }

        setFullOrder(result.order);
      } catch (error) {
        console.error("Order Details Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [order.id]);

  if (loading) {
    return (
      <section className="min-w-0 flex-1 bg-white px-8 py-7">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-gray-500">Loading order details...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="min-w-0 flex-1 bg-white px-8 py-7">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft size={17} strokeWidth={1.8} />
          Back to My Orders
        </button>

        <div className="mt-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                Order {order.id}
              </h1>

              <span className="inline-flex items-center gap-2 rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                {order.status}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Placed on {order.date} at {order.time}
              <span className="mx-2">•</span>
              Order ID: 687654321098
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
          >
            <Download size={18} strokeWidth={1.8} />
            Download Invoice
          </button>
        </div>
      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="mt-7 grid grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)] gap-5">
        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <div className="space-y-5">
          {/* =================================================
              ORDER ITEMS
          ================================================= */}
          <OrderItems items={fullOrder.items} />
          {/* =================================================
              ORDER STATUS
          ================================================= */}
          <OrderTrackingCard
            orderNumber={fullOrder.orderNumber}
            status={fullOrder.status}
            createdAt={fullOrder.createdAt}
          />
          {/* =================================================
              PAYMENT DETAILS
          ================================================= */}

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-base font-semibold text-black">
              Payment Details
            </h2>

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">
              <div className="flex items-center gap-4">
                {/* UPI Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
                  UPI
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">UPI</p>

                  <p className="mt-1 text-xs text-gray-500">
                    Transaction ID: 437892019283
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Paid on {order.date} at {order.time}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-base font-semibold text-black">
                  {order.price}
                </p>

                <p className="mt-1 text-xs text-gray-500">Paid Online</p>
              </div>
            </div>
          </div>

          {/* =================================================
              NEED HELP
          ================================================= */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-base font-semibold text-black">Need Help?</h2>

            <p className="mt-3 text-sm text-gray-500">
              If you have any questions related to this order, you can contact
              our support team.
            </p>

            <button
              type="button"
              className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-gray-50"
            >
              Contact Support
              <ExternalLink size={15} />
            </button>
          </div>
        </div>

        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <div className="space-y-5">
          {/* =================================================
              DELIVERY ADDRESS
          ================================================= */}

          {false && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-black">
                  Delivery Address
                </h2>

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-sm font-medium text-black"
                >
                  Edit
                  <Pencil size={14} />
                </button>
              </div>

              <div className="mt-5 text-sm leading-6 text-gray-500">
                <p className="font-semibold text-black">Shivdeep Raina</p>

                <p>+91 98765 43210</p>

                <p className="mt-2">123, Green Street, Model Town,</p>

                <p>Jammu, Jammu & Kashmir - 180001</p>

                <p>India</p>
              </div>

              <button
                type="button"
                className="mt-5 flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-gray-50"
              >
                <MapPin size={17} />
                View on Map
              </button>
            </div>
          )}

          {/*   <CustomerCard customer={fullOrder.customer} variant="profile" /> */}

          <ShippingCard customer={fullOrder.customer} />
          <PaymentSummary
            subtotal={fullOrder.subtotal}
            discount={fullOrder.discount}
            total={fullOrder.total}
            coupon={fullOrder.coupon}
          />
          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          {false && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-base font-semibold text-black">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-black">{order.price}</span>
                </div>

                <div className="flex items-center justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-black">₹0</span>
                </div>

                <div className="flex items-center justify-between text-gray-500">
                  <span>Discount</span>
                  <span className="text-black">- ₹0</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-black">
                      Total
                    </span>

                    <span className="text-lg font-semibold text-black">
                      {order.price}
                    </span>
                  </div>

                  <p className="mt-2 text-right text-xs text-gray-500">
                    Paid Online
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-base font-semibold text-black">Actions</h2>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
              >
                <span className="flex items-center gap-3">
                  <Truck size={18} strokeWidth={1.8} />
                  Track Order
                </span>

                <span>›</span>
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
              >
                <span className="flex items-center gap-3">
                  <RotateCcw size={18} strokeWidth={1.8} />
                  Return / Replace
                </span>

                <span>›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
