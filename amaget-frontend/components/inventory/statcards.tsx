import Icon, { type IconName } from "./icons";
import { mockStats } from "./mock";

type Stats = typeof mockStats;

export default function StatCards({ stats }: { stats: Stats }) {
  const cards: { label: string; value: number; icon: IconName; tone: string }[] = [
    { label: "Total products", value: stats.total, icon: "package", tone: "bg-primary/10 text-primary" },
    { label: "In stock", value: stats.inStock, icon: "check", tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
    { label: "Low stock", value: stats.lowStock, icon: "alert", tone: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
    { label: "Out of stock", value: stats.outOfStock, icon: "x", tone: "bg-red-500/10 text-red-700 dark:text-red-400" },
  ];

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((c) => (
        <li key={c.label} className="flex flex-col items-start gap-3 rounded-xl  bg-card p-4 shadow-md sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${c.tone}`}>
            <Icon name={c.icon} className="size-6" />
          </span>
          <div>
            <p className="text-sm text-foreground/70">{c.label}</p>
            <p className="text-3xl font-semibold tabular-nums">{c.value}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}