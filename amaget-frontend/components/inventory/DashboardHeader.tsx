import BrandMark from "./Brandmark";
import Icon from "./icons";
import LocationPill from "./LocationPill";
import type { StoreName } from "./mock";

// Top bar for phones and tablets. On large screens the sidebar replaces it.
export default function DashboardHeader({ store, staffName }: { store: StoreName; staffName: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card lg:hidden">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <BrandMark />
        <LocationPill store={store} className="inline-flex" />
        <div className="ml-auto flex items-center gap-2">
          <span title={staffName} className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-white dark:text-gray-900">
            {staffName.charAt(0)}
          </span>
          <button type="button" aria-label="Log out" className="grid size-10 place-items-center rounded-lg border border-border transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <Icon name="logout" className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}