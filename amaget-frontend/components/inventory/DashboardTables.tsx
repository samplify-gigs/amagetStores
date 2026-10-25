import Link from "next/link";
import Icon from "./icons";

export type TabKey = "available" | "manage";

const tabs = [
  { key: "available", label: "Available products", href: "?tab=available", icon: "package" },
  { key: "manage", label: "Manage products", href: "?tab=manage", icon: "pencil" },
] as const;

// Presentational: the active tab comes from a prop (the page reads it from the URL).
export default function DashboardTabs({ active }: { active: TabKey }) {
  return (
    <nav aria-label="Dashboard sections" className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-1 shadow-sm sm:inline-grid">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          aria-current={active === t.key ? "page" : undefined}
          className={`flex h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-5 ${
            active === t.key ? "bg-primary text-white shadow-sm dark:text-gray-900" : "text-foreground/70 hover:bg-background"
          }`}
        >
          <Icon name={t.icon} className="hidden size-5 sm:block" />
          {t.label}
        </Link>
      ))}
    </nav>
  );
}