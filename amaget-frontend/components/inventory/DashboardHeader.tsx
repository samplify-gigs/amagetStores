import Image from "next/image";
import Icon from "./icons";
import LocationPill from "./LocationPill";
import type { StoreName } from "./mock";

// Top bar for phones and tablets.
export default function DashboardHeader({ store, staffName }: { store: StoreName; staffName: string }) {
  return (
    <header className="sticky top-0 z-20 bg-card shadow-sm lg:hidden">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <Image src="/Amaget-Logo-Optimized.png" alt="Amaget" width={50} height={90} className="h-7 w-auto" />
        <LocationPill store={store} className="inline-flex" />
        <div className="ml-auto flex items-center gap-2">
          <span title={staffName} className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-white ">
            {staffName.charAt(0)}
          </span>
          <button type="button" aria-label="Log out" className="grid size-10 place-items-center rounded-lg  transition hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <Icon name="logout" className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}