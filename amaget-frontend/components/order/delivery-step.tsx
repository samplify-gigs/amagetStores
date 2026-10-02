import { DeliveryOptionId } from "@/db/order-mock";

export function DeliveryStep({
  options,
  selected,
  onSelect,
}: {
  options: DeliveryOptionId[];
  selected: DeliveryOptionId | null;
  onSelect: (id: DeliveryOptionId) => void;
}) {
  return (
    <div className="space-y-2.5">
      {options.map(({ id, label, description, eta, fee, icon: Icon }) => {
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
                {description} · {eta}
              </span>
            </span>
            <span className="flex-shrink-0 text-sm font-medium text-foreground/70">
              {fee === 0 ? "Free" : `₦${fee.toLocaleString()}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
