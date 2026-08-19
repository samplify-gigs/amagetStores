import { ProductCard } from "@/components-utils/hompage-carousels/productcard";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "../../components-utils/carousels-utils/carousel";
import Link from "next/link";
import { products } from "@/db/mock";

export type HotItems = {
  id: number;
  url: string;
  name: string;
  price: number;
  category: string;
};

export function HotSales() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-1 sm:max-sm:px-4 lg:px-0 py-6">
      {/* Hot Sales header */}
      <div className="flex items-center px-4 py-2.5 mb-4 bg-red-600">
        <div className="flex items-center gap-2 ">
          <h2 className="ml-1 text-[15px] text-white sm:text-[17px] font-extrabold text-gray-900 tracking-tight ">
            Hot Sales
          </h2>
        </div>
      </div>
      {/* Mobile Hot sales products */}
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
            {products.map((items) => {
              return (
                <CarouselItem
                  key={items.id}
                  className="pl-3 basis-[42%] sm:basis-1/3 md:basis-1/4"
                >
                  <Link href={`/${items.category}/${items.id}`}>
                    <ProductCard
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
          <CarouselPrevious className="hidden sm:flex -left-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
          <CarouselNext className="hidden sm:flex -right-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
        </Carousel>
      </div>

      {/*desktop hot sales products */}

      <div className="hidden lg:grid grid-cols-4 xl:grid-cols-8 gap-3">
        {products.map((items) => (
          <ProductCard
            key={items.id}
            src={items.url}
            alt={items.name}
            price={items.price}
          />
        ))}
      </div>
    </section>
  );
}
