export const inputClass =
  "w-full rounded-xl border border-border/20 bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-primary";
 
export function Field({
  label,
  span = "",
  children,
}: {
  label: string;
  span?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${span}`}>
      <span className="mb-1.5 block text-xs font-medium text-foreground/60">
        {label}
      </span>
      {children}
    </label>
  );
}