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
    <section className="rounded-2xl border border-gray-200 bg-white p-6 pb-4 shadow-lg">
      <h2 className="mb-6 text-xl font-semibold text-black">Payment Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-black">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Discount</span>
          <span className="text-green-600">-{formatCurrency(discount)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span className="text-black">
            {shipping === 0 ? "Free" : formatCurrency(shipping)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Tax</span>
          <span className="text-black">{formatCurrency(tax)}</span>
        </div>

        {coupon && (
          <div className="flex justify-between">
            <span className="text-gray-500">Coupon</span>

            <span className="rounded bg-green-50 px-2 py-1 text-xs text-green-600">
              {coupon}
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-black">Total</span>

            <span className="text-black">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
