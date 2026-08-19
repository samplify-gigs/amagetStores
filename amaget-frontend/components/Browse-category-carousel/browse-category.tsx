import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components-utils/carousels-utils/carousel";
import { CategoryCard } from "@/components-utils/hompage-carousels/categorycard";
import { Categories } from "@/db/mock";



export default function BrowseCategorySection() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 py-5 lg:hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 px-4 py-2.5">
        <h2 className="text-[15px] lg:hidden sm:text-[17px] font-extrabold text-gray-900 tracking-tight whitespace-nowrap">
          Browse by Category
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
      </div>

      <div>
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {Categories.map(({ icon, label, href }) => (
              <CarouselItem
                key={label}
                className="pl-2 basis-1/3 sm:basis-1/4 md:basis-1/5"
              >
                <CategoryCard icon={icon} label={label} href={href} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden  -left-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
          <CarouselNext className="hidden -right-4 bg-white border border-gray-200 shadow-sm hover:bg-[#fc0056] hover:text-white hover:border-[#fc0056] transition-colors" />
        </Carousel>
      </div>
    </section>
  );
}
