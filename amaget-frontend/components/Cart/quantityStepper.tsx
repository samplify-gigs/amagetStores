interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md";
}

export function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  size = "md",
}: QuantityStepperProps) {
  const h = size === "sm" ? "h-8" : "h-9";

  return (
    <div
      className={`inline-flex ${h} items-center rounded-full border border-border/15 bg-background`}
    >
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-full w-8 items-center justify-center text-foreground/50 transition-colors hover:text-foreground disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-medium text-foreground">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="flex h-full w-8 items-center justify-center text-primary transition-colors hover:opacity-70"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
