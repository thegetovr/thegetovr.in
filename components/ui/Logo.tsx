import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="cursor-pointer select-none transition-opacity duration-300 hover:opacity-80"
      aria-label="THE GETOVR home"
    >
      <span className="text-[22px] font-black tracking-[-0.045em] text-(--color-text-primary)">
        THE GETOVR
      </span>
    </Link>
  );
}
