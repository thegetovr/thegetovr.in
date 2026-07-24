"use client";

export default function CustomerForm() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1B1B22] p-8">
      <h2 className="mb-8 text-2xl font-semibold text-white">
        Customer Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            First Name
          </label>

          <input
            type="text"
            placeholder="John"
            className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-white/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Last Name
          </label>

          <input
            type="text"
            placeholder="Doe"
            className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-white/30"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-gray-400">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-white/30"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-gray-400">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-white/30"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-gray-400">
            Address
          </label>

          <textarea
            rows={4}
            placeholder="House No, Street, Area..."
            className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-white/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            City
          </label>

          <input
            type="text"
            placeholder="Jaipur"
            className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-white/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            State
          </label>

          <input
            type="text"
            placeholder="Rajasthan"
            className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-white/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Pincode
          </label>

          <input
            type="text"
            placeholder="302001"
            className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-white/30"
          />
        </div>
      </div>
    </div>
  );
}