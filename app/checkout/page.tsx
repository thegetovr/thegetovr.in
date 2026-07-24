import CustomerForm from "@/components/checkout/CustomerForm";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] py-10">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-10 text-4xl font-bold text-white">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <CustomerForm />
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}