import clsx from "clsx";

export function Tag({
  children,
  variant = "soft",
  className,
}: {
  children: React.ReactNode;
  variant?: "soft" | "outline" | "solid" | "gold";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all",
        variant === "soft" &&
          "bg-accent-soft text-accent border border-accent-soft-2",
        variant === "outline" &&
          "border border-border text-ink-soft hover:border-accent/40 hover:text-accent",
        variant === "solid" &&
          "text-white shadow-[0_2px_12px_rgba(99,102,241,0.4)]",
        variant === "gold" &&
          "bg-gold-soft text-gold border border-gold/20",
        className
      )}
      style={
        variant === "solid"
          ? { background: "var(--gradient-accent)" }
          : undefined
      }
    >
      {children}
    </span>
  );
}
