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

  console.log("Order Success params:", params);

  return (
    <main className="min-h-screen bg-(--color-page) px-6 py-20 text-(--color-text-primary)">
      <div className="mx-auto max-w-2xl">
        <Card className="text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-(--color-success)" />

          <h1 className="mt-6 text-4xl font-bold uppercase">
            Order Placed Successfully
          </h1>

          <p className="mt-4 text-(--color-text-muted)">
            Thank you for shopping with The Getovr.
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

            <Link href={`/orders/${orderNumber}`}>
              <Button variant="outline">View Order</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
