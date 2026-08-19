"use client";

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
    <select
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        h-12
        w-full
        rounded-xl
        border
        border-[#d5cec3]
        bg-[#fcfaf7]
        px-4
        text-sm
        text-zinc-900
        outline-none
        transition-all
        duration-300
        focus:border-[#a67c35]
        focus:ring-1
        focus:ring-[#a67c35]/20
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
  );
}
