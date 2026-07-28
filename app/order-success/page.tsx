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
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl">
        <Card className="text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-500" />

          <h1 className="mt-6 text-4xl font-bold uppercase">
            Order Placed Successfully
          </h1>

          <p className="mt-4 text-zinc-400">
            Thank you for shopping with The Getovr.
          </p>

          <div className="mt-10 space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-zinc-500">
                Order Number
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-wide">
                {orderNumber ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-zinc-500">
                Estimated Delivery
              </p>

              <p className="mt-2 text-lg">3–5 Business Days</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>

            <Link href={`/orders/${orderNumber}`}>
              <Button>View Order</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
