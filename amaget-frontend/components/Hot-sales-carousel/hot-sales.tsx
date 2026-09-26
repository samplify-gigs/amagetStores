import { ProductCard } from "@/components-utils/hompage-carousels/productcard";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "../../components-utils/carousels-utils/carousel";
import Link from "next/link";
import { ProductCardSkeleton } from "@/components-utils/hompage-carousels/productskeletons";
import { SectionErrorOverlay } from "../Error-comps/error-for-home-sections";

interface CarouselItems {
  id: string;
  name: string;
  category_id: string;
  legacy_product_id: string;
  price: string;
  url: string;
  categ_name: string;
}

interface HomepageData {
  hotsales: CarouselItems[];
}

type FetchStatus = "loading" | "error" | "success";

export function HotSales({
  hotsales,
  status,
  onRetry,
}: HomepageData & {
  status: FetchStatus;
  onRetry: () => void;
}) {
  const skeletonCount = 8;
  const showSkeleton = status === "loading" || status === "error";

  return (
    <section className="w-full max-w-[1400px] mx-auto px-1 sm:max-sm:px-4 lg:px-0 py-6">
      <div className="flex items-center px-4 py-2.5 mb-4 bg-red-600">
        <div className="flex items-center gap-2">
          <h2 className="ml-1 text-[15px] text-white sm:text-[17px] font-extrabold tracking-tight">
            Hot Sales
          </h2>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden relative">
        {showSkeleton ? (
          <>
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 basis-[42%] sm:basis-1/3 md:basis-1/4"
                >
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
            {status === "error" && <SectionErrorOverlay onRetry={onRetry} />}
          </>
        ) : (
          <Carousel
            opts={{ align: "start", loop: false, dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {hotsales.map((items) => (
                <CarouselItem
                  key={items.id}
                  className="pl-3 basis-[42%] sm:basis-1/3 md:basis-1/4"
                >
                  <Link
                    href={`/${items.categ_name}/${items.legacy_product_id}`}
                  >
                    <ProductCard
                      src={items.url}
                      alt={items.name}
                      price={items.price}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
            <CarouselNext className="hidden sm:flex -right-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
          </Carousel>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-4 xl:grid-cols-8 gap-3 relative">
        {showSkeleton
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : hotsales.map((items) => (
              <ProductCard
                key={items.id}
                src={items.url}
                alt={items.name}
                price={items.price}
              />
            ))}
        {status === "error" && <SectionErrorOverlay onRetry={onRetry} />}
      </div>
    </section>
  );
}
