import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components-utils/carousels-utils/carousel";
import { ProductCardForUpgrade } from "@/components-utils/hompage-carousels/productcardupgrade";
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
  slug: string;
  categ_name: string;
}
type FetchStatus = "loading" | "error" | "success";

interface HomepageData {
  upgrade: CarouselItems[];
  status: FetchStatus;
  onRetry: () => void;
}

export default function UpgradePc({ upgrade, status, onRetry }: HomepageData) {
  const skeletonCount = 8;
  const showSkeleton = status === "loading" || status === "error";

  return (
    <section className="w-full max-w-[1400px] mx-auto px-1 sm:max-sm:px-4 lg:px-0 py-6">
      {/* header */}
      <div className="flex items-center px-4 py-2.5 mb-4 bg-primary">
        <div className="flex items-center gap-2">
          <h2 className="ml-1 text-[15px] text-white sm:text-[17px] font-extrabold text-gray-900 tracking-tight">
            Upgrade your pc
          </h2>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden relative">
        {showSkeleton ? (
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
        ) : (
          <Carousel
            opts={{ align: "start", loop: false, dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {upgrade.map((items) => (
                <CarouselItem
                  key={items.id}
                  className="pl-3 basis-[42%] sm:basis-1/3 md:basis-1/4"
                >
                  <Link
                    href={`/${items.categ_name}/product/${items.slug}-${items.legacy_product_id}`}
                  >
                    <ProductCardForUpgrade
                      src={items.url}
                      alt={items.name}
                      price={items.price}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden -left-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
            <CarouselNext className="hidden -right-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
          </Carousel>
        )}

        {status === "error" && <SectionErrorOverlay onRetry={onRetry} />}
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-4 xl:grid-cols-8 gap-3 relative">
        {showSkeleton
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : upgrade.map((items) => (
              <Link
                key={items.id}
                href={`/${items.categ_name}/product/${items.slug}-${items.legacy_product_id}`}
              >
                <ProductCardForUpgrade
                  src={items.url}
                  alt={items.name}
                  price={items.price}
                />
              </Link>
            ))}

        {status === "error" && <SectionErrorOverlay onRetry={onRetry} />}
      </div>
    </section>
  );
}
