import { getOrderByNumberAndEmail } from "@/lib/orderService";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import CustomerCard from "@/components/orders/CustomerCard";
import OrderItems from "@/components/orders/OrderItems";
import PaymentSummary from "@/components/orders/PaymentSummary";
import ShippingCard from "@/components/orders/ShippingCard";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderTimeline from "@/components/orders/OrderTimeline";
import { ORDER_STATUS } from "@/lib/order-status";
import Link from "next/link";

type OrderPageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

export default async function OrderDetailsPage({ params }: OrderPageProps) {
  const { orderNumber } = await params;

  // =====================================================
  // CHECK LOGIN
  // =====================================================

  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-(--color-page) px-6 text-(--color-text-primary) shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Please Login</h1>

          <p className="mt-2 text-sm text-(--color-text-muted)">
            Please login to view your order details.
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // VERIFY JWT
  // =====================================================

  let decoded: jwt.JwtPayload;

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof verifiedToken === "string" || !verifiedToken.userId) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-(--color-page) px-6 text-(--color-text-primary)">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Unauthorized</h1>
          </div>
        </main>
      );
    }

    decoded = verifiedToken;
  } catch (error) {
    console.error("ORDER AUTH ERROR:", error);

    return (
      <main className="flex min-h-screen items-center justify-center bg-(--color-page) px-6 text-(--color-text-primary)">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Unauthorized</h1>

          <p className="mt-2 text-sm text-(--color-text-muted)">
            Please login again.
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // GET CURRENT USER
  // =====================================================

  await connectToDatabase();

  const user = await User.findById(decoded.userId).select("email");

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-(--color-page) px-6 text-(--color-text-primary)">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">User Not Found</h1>
        </div>
      </main>
    );
  }

  // =====================================================
  // SECURE ORDER LOOKUP
  // =====================================================

  const order = await getOrderByNumberAndEmail(orderNumber, user.email);

  // =====================================================
  // ORDER NOT FOUND / NOT OWNED
  // =====================================================

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-(--color-page) px-6 text-(--color-text-primary)">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Order Not Found</h1>

          <p className="mt-2 text-sm text-(--color-text-muted)">
            This order does not exist or does not belong to your account.
          </p>
        </div>
      </main>
    );
  }

  const statusInfo =
    ORDER_STATUS[order.status as keyof typeof ORDER_STATUS] ??
    ORDER_STATUS.pending;

  return (
    <main className="min-h-screen bg-(--color-page) px-6 py-12 text-(--color-text-primary) md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl rounded-2xl border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft) md:p-8">
        {/* Page Header */}

        <div className="mb-8">
          <Link
            href="/profile?tab=orders"
            className="
      mb-5
      inline-flex
      items-center
      gap-2
      rounded-(--radius-sm)
      border
      border-(--color-border)
      bg-(--color-surface)
      px-4
      py-2
      text-sm
      font-medium
      text-(--color-text-secondary)
      transition-colors
      duration-200
      hover:border-(--color-text-primary)
      hover:bg-(--color-surface-muted)
      hover:text-(--color-text-primary)
    "
          >
            ← Back to Orders
          </Link>

          <h1 className="text-4xl font-bold text-(--color-text-primary)">
            Order Details
          </h1>

          <p className="mt-2 text-(--color-text-muted)">
            Track and review your purchase.
          </p>
        </div>

        {/* Order Number - FULL WIDTH */}

        <div className="mb-8">
          <OrderHeader
            orderNumber={order.orderNumber}
            createdAt={order.createdAt}
          />
        </div>

        {/* Main Content */}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT SIDE */}

          <div className="space-y-8 lg:col-span-2">
            {/* Confirmed / Current Status */}

            <section className="rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft)">
              <h2 className="text-2xl font-semibold text-(--color-text-primary)">
                {statusInfo.label}
              </h2>

              <p className="mt-2 max-w-xl text-sm text-(--color-text-muted)">
                {statusInfo.description}
              </p>

              <p className="mt-2 text-sm text-(--color-text-muted)">
                Expected Delivery in 3-5 business days.
              </p>
            </section>

            {/* Order Items */}

            <OrderItems items={order.items} />

            {/* Order Timeline */}

            <section className="rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-soft)">
              <OrderTimeline status={order.status} />
            </section>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-8">
            {/* Customer */}

            <CustomerCard customer={order.customer} />

            {/* Delivery Address */}

            <ShippingCard customer={order.customer} />

            {/* Payment Summary */}

            <PaymentSummary
              subtotal={order.subtotal}
              discount={order.discount}
              total={order.total}
              coupon={order.coupon}
            />

            {/* Download Invoice */}

            <a
              href={`/api/orders/${order.orderNumber}/invoice`}
              download
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-(--radius-sm)
                border
                border-(--color-text-primary)
                bg-(--color-text-primary)
                px-4
                py-3
                text-sm
                font-medium
                text-(--color-white)
                transition-colors
                duration-200
                hover:bg-(--color-text-secondary)
              "
            >
              Download Invoice
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
