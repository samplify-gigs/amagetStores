import { CheckoutItem } from "@/app/(orders,payments)/checkout/page";
import Image from "next/image";

export function OrderSummaryList({
  items,
  className = "",
  compact = false,
}: {
  items: CheckoutItem[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`divide-y divide-border/15 rounded-2xl border border-border/15 bg-card ${compact ? "" : "px-4"} ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 px-4"
        >
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
            <Image
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              height={20}
              width={30}
            />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-secondary">
              {item.quantity}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-sm font-medium text-foreground">
              {item.name}
            </p>
            <p className="mt-0.5 text-xs text-foreground/45">
              ${item.price.toFixed(2)} each
            </p>
          </div>

          <p className="flex-shrink-0 text-sm font-semibold text-foreground">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
