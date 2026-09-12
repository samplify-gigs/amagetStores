interface TrustBadge {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}

export function TrustBadges({ badges }: { badges: TrustBadge[] }) {
  return (
    <div className="grid grid-cols-4 divide-x divide-gray-100 rounded-2xl border border-gray-100">
      {badges.map((b) => (
        <div key={b.label} className="flex flex-col items-center gap-2 px-2 py-5 text-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            {b.icon}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700">{b.label}</p>
            <p className="text-xs text-gray-400">{b.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}