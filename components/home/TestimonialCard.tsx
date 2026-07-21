export default function TestimonialCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-white/10" />

        <div>
          <h3 className="font-semibold text-white">John Doe</h3>
          <p className="text-sm text-gray-400">Verified Customer</p>
        </div>
      </div>

      <div className="mt-6 flex text-yellow-400">
        ★★★★★
      </div>

      <p className="mt-4 leading-7 text-gray-300">
        The quality exceeded my expectations. The print was sharp,
        the fabric felt premium, and the delivery was fast.
      </p>
    </div>
  );
}