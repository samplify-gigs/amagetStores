import Icon from "./icons";
import type { StoreName } from "./mock";

export default function LocationPill({ store, className = "" }: { store: StoreName; className?: string }) {
  return (
    <span className={`items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold shadow-sm ${className}`}>
      <Icon name="pin" className="size-4 text-primary" />
      {store} Store
    </span>
  );
}