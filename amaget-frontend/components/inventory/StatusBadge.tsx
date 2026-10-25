import type { StockStatus } from "./mock";

// Green = in stock, amber = low, red = out of stock.
export const statusMeta: Record<StockStatus, { label: string; badge: string; dot: string }> = {
  "in-stock": { label: "In stock", badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  "low-stock": { label: "Low stock", badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
  "out-of-stock": { label: "Out of stock", badge: "bg-red-500/10 text-red-700 dark:text-red-400", dot: "bg-red-500" },
};

export default function StatusBadge({ status }: { status: StockStatus }) {
  const { label, badge, dot } = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${badge}`}>
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}