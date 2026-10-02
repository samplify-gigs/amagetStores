import { PaymentMethodId, paymentMethods } from "@/db/order-mock";
import { IoCashOutline } from "react-icons/io5";

export function PaymentStep({
  needsPayment,
  selected,
  onSelect,
}: {
  needsPayment: boolean;
  selected: PaymentMethodId | null;
  onSelect: (id: PaymentMethodId) => void;
}) {
  if (!needsPayment) {
    return (
      <div className="flex items-start gap-2.5 rounded-xl bg-secondary px-3.5 py-3">
        <IoCashOutline className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/40" />
        <p className="text-sm text-foreground/60">
          No payment needed now — pay in cash or by transfer when your order
          arrives.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {paymentMethods.map(({ id, label, sublabel, icon: Icon }) => {
        const isSelected = selected === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={isSelected}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border/20 bg-secondary"
            }`}
          >
            <span
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                isSelected
                  ? "bg-primary text-secondary"
                  : "bg-card text-foreground/50"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-foreground">
                {label}
              </span>
              <span className="block text-xs text-foreground/45">
                {sublabel}
              </span>
            </span>
            <span
              className={`h-4 w-4 flex-shrink-0 rounded-full border-2 ${
                isSelected ? "border-primary bg-primary" : "border-border/30"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
