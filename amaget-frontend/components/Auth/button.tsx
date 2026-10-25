import type { ComponentProps } from "react";

// UI mockup: defaults to type="button" so nothing submits.
// Pass type="submit" once real auth is wired up.
export default function Button({
  className = "",
  type = "button",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type={type}
      {...props}
      className={`inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:brightness-95 active:brightness-90  ${className}`}
    />
  );
}
