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
    <section className="border border-(--color-border) bg-(--color-surface) p-6 pb-4 shadow-(--shadow-subtle)">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-(--color-text-primary)">
        Payment Summary
      </h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-(--color-text-secondary)">Subtotal</span>
          <span className="text-(--color-text-primary)">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-(--color-text-secondary)">Discount</span>
          <span className="text-(--color-accent)">
            -{formatCurrency(discount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-(--color-text-secondary)">Shipping</span>
          <span className="text-(--color-text-primary)">
            {shipping === 0 ? "Free" : formatCurrency(shipping)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-(--color-text-secondary)">Tax</span>
          <span className="text-(--color-text-primary)">
            {formatCurrency(tax)}
          </span>
        </div>

        {coupon && (
          <div className="flex justify-between">
            <span className="text-(--color-text-secondary)">Coupon</span>

            <span className="border border-(--color-border) bg-(--color-surface-muted) px-2 py-1 text-xs text-(--color-accent)">
              {coupon}
            </span>
          </div>
        )}

        <div className="border-t border-(--color-border) pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-(--color-text-primary)">Total</span>

            <span className="text-(--color-text-primary)">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}