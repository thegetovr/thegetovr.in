import { formatCurrency } from "@/lib/format";
interface PaymentSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  coupon?: string;
  shipping?: number;
  tax?: number;
}

export default function PaymentSummary({
  subtotal,
  discount,
  total,
  coupon,
  shipping = 0,
  tax = 0,
}: PaymentSummaryProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Payment Summary
      </h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-400">Subtotal</span>
          <span className="text-white">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Discount</span>
          <span className="text-green-400">
            -{formatCurrency(discount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Shipping</span>
          <span className="text-white">
            {shipping === 0
              ? "Free"
              : formatCurrency(shipping)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">Tax</span>
          <span className="text-white">
           {formatCurrency(tax)}
          </span>
        </div>

        {coupon && (
          <div className="flex justify-between">
            <span className="text-zinc-400">Coupon</span>
            <span className="rounded bg-green-500/10 px-2 py-1 text-xs text-green-400">
              {coupon}
            </span>
          </div>
        )}

        <div className="border-t border-zinc-800 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-white">Total</span>
            <span className="text-white">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}