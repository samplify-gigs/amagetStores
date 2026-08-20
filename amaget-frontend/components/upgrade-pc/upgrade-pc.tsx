import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components-utils/carousels-utils/carousel";
import { ProductCardForUpgrade } from "@/components-utils/hompage-carousels/productcardupgrade";
import Link from "next/link";
import { upgradeItems } from "@/db/mock";
import { PriceFormatter } from "@/Helper-functions/price";

export default function UpgradePc() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-1 sm:max-sm:px-4 lg:px-0 py-6">
      {/* header */}
      <div className="flex items-center px-4 py-2.5 mb-4 bg-primary">
        <div className="flex items-center gap-2 ">
          <h2 className="ml-1 text-[15px] text-white sm:text-[17px] font-extrabold text-gray-900 tracking-tight">
            Upgrade your pc
          </h2>
        </div>
      </div>
      {/** for mobile */}
      <div className="lg:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true /* smooth free-scroll feel */,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {upgradeItems.map((items) => {
              return (
                <CarouselItem
                  key={items.id}
                  /*
                   * basis-[42%]  → ~2.4 cards visible on mobile (nice peek effect)
                   * sm:basis-1/3 → 3 full cards on sm
                   * md:basis-1/4 → 4 on md tablets
                   */
                  className="pl-3 basis-[42%] sm:basis-1/3 md:basis-1/4"
                >
                  <Link href={`/${items.slug}/${items.id}`}>
                    <ProductCardForUpgrade
                      src={items.url}
                      alt={items.name}
                      price={items.price}
                    />
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Arrows — hidden on mobile (drag to scroll), visible sm+ */}
          <CarouselPrevious className="hidden  -left-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
          <CarouselNext className="hidden -right-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
        </Carousel>
      </div>
      
      {/** Desktop */}
      <div className="hidden lg:grid grid-cols-4 xl:grid-cols-8 gap-3">
        {upgradeItems.map((items) => (
          <ProductCardForUpgrade
            key={items.id}
            src={items.url}
            alt={items.name}
            price={PriceFormatter(items.price)}
          />
        ))}
      </div>
    </section>
  );
}
