import Link from "next/link";
import { cn } from "./cn";

const Button = ({
  children,
  variant = "primary",
  href,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition active:scale-[0.99]";
  const styles =
    variant === "primary"
      ? "bg-[var(--c-blue)] text-white hover:opacity-95 shadow-sm"
      : variant === "secondary"
        ? "bg-[var(--c-navy)] text-white hover:opacity-95 shadow-sm"
        : "border border-[var(--c-border)] bg-white text-[var(--c-ink)] hover:bg-[var(--c-blue-soft)]";

  if (href)
    return (
      <Link href={href} className={cn(base, styles)}>
        {children}
      </Link>
    );

  return (
    <button
      className={cn(
        base,
        styles,
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
