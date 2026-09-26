import { Skeleton } from "./skeleton";

export function DesktopProductSkeleton() {
  return (
    <div className="mx-auto hidden max-w-7xl px-6 sm:block lg:px-8 xl:max-w-6xl mb-2 mt-2">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Gallery: aspect-square, max-w-[480px], + thumbnail row */}
          <div className="rounded bg-gray-50 p-2 bg-secondary mt-1 max-w-[480px] mx-auto lg:mx-0 w-full">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="mt-5 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-4 rounded-full bg-gray-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-16 rounded-xl" />
                  ))}
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          {/* ProductDetailsPanel */}
          <div className="flex flex-col gap-6">
            <Skeleton className="h-8 w-3/4" /> {/* name: text-2xl font-bold */}
            <div className="-mt-2 flex items-baseline gap-3">
              <Skeleton className="h-8 w-28" /> {/* price */}
              <Skeleton className="h-5 w-20" /> {/* original price */}
            </div>
            <div className="-mt-4 flex items-center gap-1.5">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="-mt-2 h-5 w-24 rounded-full" />{" "}
            {/* stock status */}
            <div className="mt-2 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-11 w-32 rounded-full" />{" "}
                {/* qty stepper */}
                <Skeleton className="h-11 flex-1 rounded-full" />{" "}
                {/* add to cart */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-8 border-b border-gray-100 pb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-3 pt-4">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/5" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-3.5 w-1/2" />
                  <Skeleton className="h-3.5 w-3/5" />
                </div>
              </div>
            </div>

            {/* RatingSummary */}
            <div className="lg:pt-[52px] space-y-4">
              <Skeleton className="h-10 w-20" />
              <div className="space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-3 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
