export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="relative w-full aspect-[4/5] bg-gray-200" />
      <div className="p-2.5 flex flex-col gap-1">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded min-h-[14px]" />
        <div className="h-3.5 w-1/3 bg-gray-200 rounded mt-0.5" />
      </div>
    </div>
  );
}
