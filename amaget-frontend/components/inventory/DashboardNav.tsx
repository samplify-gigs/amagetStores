import Link from "next/link";
import BrandMark from "./Brandmark";
import Icon from "./icons";
import type { StoreName } from "./mock";

export type TabKey = "available" | "manage";

// The two main sections. The active one comes from a prop (no state).
const items = [
  { key: "available", label: "Available products", short: "Available", href: "?tab=available", icon: "package" },
  { key: "manage", label: "Manage products", short: "Manage", href: "?tab=manage", icon: "pencil" },
] as const;

const onPrimary = "bg-primary text-white dark:text-gray-900";

/** Dark sidebar for large screens. */
export function Sidebar({ store, staffName, active }: { store: StoreName; staffName: string; active: TabKey }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-gray-900 p-4 text-gray-100 lg:flex">
      <div className="flex items-center gap-3 px-1 pt-1">
        <BrandMark />
        <div>
          <p className="font-semibold leading-tight">Amaget</p>
          <p className="text-xs text-gray-400">Inventory</p>
        </div>
      </div>

      {/* Current store, always visible */}
      <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/5 p-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${onPrimary}`}>
          <Icon name="pin" className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold">{store} Store</p>
          <p className="text-xs text-gray-400">Current location</p>
        </div>
      </div>

      <nav aria-label="Dashboard sections" className="mt-6 space-y-1">
        <p className="px-3 pb-1 text-xs text-gray-400">Products</p>
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active === item.key ? "page" : undefined}
            className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active === item.key ? `${onPrimary} font-semibold` : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon name={item.icon} className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-xl bg-white/5 p-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold ${onPrimary}`}>
          {staffName.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{staffName}</p>
          <p className="truncate text-xs text-gray-400">Store staff</p>
        </div>
        <button type="button" aria-label="Log out" className="grid size-9 place-items-center rounded-lg text-gray-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-primary">
          <Icon name="logout" className="size-5" />
        </button>
      </div>
    </aside>
  );
}

/** Bottom bar for phones and tablets. */
export function BottomNav({ active }: { active: TabKey }) {
  return (
    <nav aria-label="Dashboard sections" className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2 p-2">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active === item.key ? "page" : undefined}
            className={`flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active === item.key ? onPrimary : "text-foreground/70 hover:bg-background"
            }`}
          >
            <Icon name={item.icon} className="size-5" />
            {item.short}
          </Link>
        ))}
      </div>
    </nav>
  );
}