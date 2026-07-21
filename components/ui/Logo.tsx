import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="cursor-pointer select-none transition-opacity duration-300 hover:opacity-80"
    >
      <h1 className="text-xl font-black tracking-[0.25em] text-white">
        THE GETOVR
      </h1>
    </Link>
  );
}