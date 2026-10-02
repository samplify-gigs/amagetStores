import { PaymentMethod } from "@/app/(orders,payments)/checkout/page";
import { IoCardOutline, IoCashOutline, IoTimeOutline } from "react-icons/io5";


const paymentOptions: {
  id: PaymentMethod;
  label: string;
  sublabel: string;
  icon: typeof IoCardOutline;
}[] = [
  {
    id: "card",
    label: "Pay with card",
    sublabel: "Visa, Mastercard, Verve",
    icon: IoCardOutline,
  },
  {
    id: "samplify_pay",
    label: "Samplify Pay",
    sublabel: "Buy now, pay in installments",
    icon: IoTimeOutline,
  },
  {
    id: "delivery",
    label: "Pay on delivery",
    sublabel: "Cash or transfer at drop-off",
    icon: IoCashOutline,
  },
];

export function PaymentMethodPicker({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}) {
  return (
    <div className="space-y-2.5">
      {paymentOptions.map(({ id, label, sublabel, icon: Icon }) => {
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              selected
                ? "border-primary bg-primary/5"
                : "border-border/20 bg-secondary"
            }`}
          >
            <span
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                selected
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
                selected ? "border-primary bg-primary" : "border-border/30"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
