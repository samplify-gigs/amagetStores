// Decorative shapes around the success icon. Purely visual.

// Small helper so the icons below stay short.
export function Svg({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function Confetti() {
  const base = "absolute animate-pulse motion-reduce:animate-none";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span
        className={`${base} top-3 left-6 size-3 rounded-full border-2 border-primary/50`}
      />
      <span
        className={`${base} top-8 right-8 size-2.5 rounded-full bg-amber-400 [animation-delay:300ms]`}
      />
      <span
        className={`${base} bottom-10 left-2 size-2 rounded-full bg-sky-400 [animation-delay:600ms]`}
      />
      <span
        className={`${base} right-10 bottom-4 size-3 rounded-full border-2 border-emerald-400 [animation-delay:900ms]`}
      />
      <span
        className={`${base} top-1/2 right-1 h-1 w-4 rotate-45 rounded-full bg-primary/40 [animation-delay:150ms]`}
      />
      <Svg
        className={`${base} top-2 right-24 size-4 text-emerald-500 [animation-delay:450ms]`}
      >
        <path d="M12 5v14M5 12h14" />
      </Svg>
      <Svg
        className={`${base} bottom-3 left-24 size-4 text-primary/60 [animation-delay:750ms]`}
      >
        <path d="M12 5v14M5 12h14" />
      </Svg>
    </div>
  );
}
