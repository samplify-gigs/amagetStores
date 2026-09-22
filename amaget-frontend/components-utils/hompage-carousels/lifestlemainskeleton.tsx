export function LifestyleCardSkeletonMain() {
  return (
    <div className="h-full flex flex-col animate-pulse">
      {/* Image — matches aspect-square */}
      <div className="relative w-full aspect-square bg-gray-200" />

      {/* Info — matches px-3 py-2.5 h-[56px] justify-between */}
      <div className="px-3 py-2.5 flex flex-col gap-0.5 h-[56px] justify-between">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3.5 w-1/2 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
