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
        rounded-(--radius-md)
        border
        border-(--color-border)
        bg-(--color-surface)
        shadow-(--shadow-soft)
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}