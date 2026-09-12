interface FeatureHighlight {
  icon: React.ReactNode;
  label: string;
}

export function FeatureHighlights({
  features,
}: {
  features: FeatureHighlight[];
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {features.map((f) => (
        <div
          key={f.label}
          className="flex flex-col items-center gap-2 text-center"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {f.icon}
          </div>
          <span className="text-xs leading-tight text-gray-500">{f.label}</span>
        </div>
      ))}
    </div>
  );
}
