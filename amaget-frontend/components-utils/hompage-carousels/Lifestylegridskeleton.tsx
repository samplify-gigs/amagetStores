import { ProductCardSkeleton } from "./productskeletons";

export function LifestyleGridSkeleton({ count = 16 }: { count?: number }) {
  return (
    <div className="border border-gray-200 border-t-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 ">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="
              border-r border-gray-200 
              border-b border-gray-200 
              lg:[&:nth-child(n)]:border-b-1
            "
          >
            <div className="h-full">
              <ProductCardSkeleton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
