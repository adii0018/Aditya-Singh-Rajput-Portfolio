import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "lime" | "dark" | "outline" | "purple" | "blue";
  className?: string;
}

export function Badge({ children, variant = "outline", className = "" }: BadgeProps) {
  const variantStyles = {
    lime: "bg-[#d9ff5c] text-[#242426] font-semibold",
    dark: "bg-[#242426] text-white",
    outline: "border border-[#24242220] text-[#4d4f57]",
    purple: "bg-[#c0adff]/20 text-[#6a42c4] border border-[#c0adff]/30",
    blue: "bg-[#b8deff]/20 text-[#244b7a] border border-[#b8deff]/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
