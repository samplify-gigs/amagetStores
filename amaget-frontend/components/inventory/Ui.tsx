// Shared class strings so every button and field in the dashboard looks the same.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const primaryButton = `inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 dark:text-gray-900 ${focusRing}`;

export const secondaryButton = `inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-semibold transition hover:bg-background ${focusRing}`;

export const editLink = `inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-primary transition hover:bg-primary/10 ${focusRing}`;

const controlBase =
  "w-full rounded-lg border border-border bg-background px-3.5 text-base text-foreground outline-hidden transition placeholder:text-foreground/50 focus:border-primary focus:ring-4 focus:ring-primary/20 sm:text-sm";

export const controlClass = `h-11 ${controlBase}`;
export const textareaClass = `py-3 ${controlBase}`;