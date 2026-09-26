import { Skeleton } from "./skeleton";

export function MobileProductSkeleton() {
  return (
    <div className="sm:hidden bg-secondary">
      {/* mirrors ProductImageGallery: aspect-square max-w-[420px] mx-auto mt-1 */}
      <div className="relative w-full aspect-square max-w-[420px] mx-auto bg-gray-50 overflow-hidden mt-1">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <span className="h-1.5 w-4 rounded-full bg-gray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="p-4 max-w-[420px]">
        {/* ProductInfo: h1 text-md + price text-lg font-bold */}
        <Skeleton className="h-[18px] w-3/4" />
        <Skeleton className="mt-2 h-[22px] w-28" />

        {/* rating row */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-3.5 w-8" />
          <Skeleton className="h-3.5 w-20" />
        </div>

        {/* StockStatus pill */}
        <Skeleton className="mt-3 h-5 w-24 rounded-full" />

        {/* ProductTabs (underline variant) */}
        <div className="mt-1 pt-6">
          <div className="flex items-center gap-8 border-b border-gray-100 pb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-3 pt-4">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-5/6" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-3.5 w-1/2" />
              <Skeleton className="h-3.5 w-3/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
