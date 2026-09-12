import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderNumber?: string;
  }>;
}) {
  const params = await searchParams;
  const orderNumber = params.orderNumber;

  return (
    <main className="min-h-screen bg-(--color-page) px-6 py-20 text-(--color-text-primary)">
      <div className="mx-auto max-w-2xl">
        <Card className="text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-(--color-success)" />

          <h1 className="mt-6 font-(--font-editorial) text-4xl font-normal leading-tight tracking-tight md:text-5xl">
            Order placed successfully.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-(--color-text-secondary)">
            Thank you for shopping with The Getovr. Your order is on its way to
            becoming something you&apos;ll love to wear.
          </p>

          <div className="mt-10 space-y-6 rounded-xl border border-(--color-border) bg-(--color-surface-muted) p-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-(--color-text-muted)">
                Order Number
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-wide text-(--color-text-primary)">
                {orderNumber ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-(--color-text-muted)">
                Estimated Delivery
              </p>

              <p className="mt-2 text-lg text-(--color-text-primary)">
                3–5 Business Days
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button variant="primary">Continue Shopping</Button>
            </Link>

            {orderNumber && (
              <Link href={`/orders/${orderNumber}`}>
                <Button variant="outline">View Order</Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
