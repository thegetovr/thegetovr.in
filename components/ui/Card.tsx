import { ElementType, ReactNode } from "react";

interface CardProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  as: Component = "div",
  children,
  className = "",
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <Component
      className={`
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950
        shadow-lg
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}