"use client";

import { ChevronDown } from "lucide-react";

interface StateDropdownProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  id?: string;
}

const INDIAN_STATES_AND_UTS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function StateDropdown({
  value,
  onChange,
  name = "state",
  id = "state",
}: StateDropdownProps) {
  return (
    <div className="relative w-full min-w-0">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-12
          w-full
          min-w-0
          appearance-none
          rounded-xl
          border
          border-[#d5cec3]
          bg-[#fcfaf7]
          px-3
          pr-11
          text-sm
          text-zinc-900
          outline-none
          transition-all
          duration-300
          focus:border-[#a67c35]
          focus:ring-1
          focus:ring-[#a67c35]/20
          sm:px-4
          sm:pr-11
        "
      >
        <option value="" disabled>
          Select State
        </option>

        {INDIAN_STATES_AND_UTS.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* CUSTOM ARROW */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center sm:right-3.5">
        <ChevronDown size={17} strokeWidth={1.7} className="text-zinc-500" />
      </div>
    </div>
  );
}
