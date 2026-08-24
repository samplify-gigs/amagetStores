export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-square bg-gray-200 rounded-md" />
      <div className="mt-2 h-3 w-3/4 bg-gray-200 rounded" />
      <div className="mt-1.5 h-3 w-1/2 bg-gray-200 rounded" />
    </div>
  );
}