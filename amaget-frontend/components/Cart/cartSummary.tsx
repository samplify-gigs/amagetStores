interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  currency?: string;
  onCheckout: () => void;
  variant?: "bar" | "card";
}

export function CartSummary({
  itemCount,
  subtotal,
  currency = "₦",
  onCheckout,
  variant = "card",
}: CartSummaryProps) {
  if (variant === "bar") {
    return (
      <div className="sticky inset-x-0 bottom-0 z-40 border-t border-border/15 bg-card px-4 py-3 lg:mt-35">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-foreground/45">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
            <p className="text-base font-semibold text-foreground">
              {currency}
              {subtotal.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onCheckout}
            className="flex-1 max-w-[220px] rounded-full bg-primary py-3 text-sm font-medium text-secondary transition-opacity hover:opacity-90"
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-24 rounded-2xl border border-border/15 bg-card p-6 ">
      <h2 className="text-sm font-semibold text-foreground">Order Summary</h2>

      <div className="mt-4 space-y-2.5 border-b border-border/15 pb-4 text-sm">
        <div className="flex justify-between text-foreground/60">
          <span>Subtotal ({itemCount} items)</span>
          <span className="text-foreground">
            {currency}
            {subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-foreground/60">
          <span>Delivery</span>
          <span className="text-foreground">Calculated at checkout</span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-sm text-foreground/60">Total</span>
        <span className="text-xl font-semibold text-foreground">
          {currency}
          {subtotal.toLocaleString()}
        </span>
      </div>

      <button
        onClick={onCheckout}
        className="mt-5 w-full rounded-full bg-primary py-3.5 text-sm font-medium text-secondary transition-opacity hover:opacity-90"
      >
        Checkout
      </button>
    </div>
  );
}
