import { LifestyleItems } from "@/db/mock";
import { ProductCardLifestyle } from "@/components-utils/hompage-carousels/productcardLifestyle";
import { LifestyleGridSkeleton } from "@/components-utils/hompage-carousels/Lifestylegridskeleton";
import { SectionErrorOverlay } from "../Error-comps/error-for-home-sections";
import Link from "next/link";

interface CarouselItems {
  id: string;
  name: string;
  category_id: string;
  legacy_product_id: string;
  price: string;
  url: string;
  categ_name: string;
  slug:string
}

type FetchStatus = "loading" | "error" | "success";

interface HomepageData {
  lifestyle: CarouselItems[];
  status: FetchStatus;
  onRetry: () => void;
}

export function Lifestyle({ lifestyle, status, onRetry }: HomepageData) {
  const showSkeleton = status === "loading" || status === "error";

  return (
    <section className="w-full max-w-[1400px] mx-auto px-1 sm:max-sm:px-4 lg:px-0 py-6">
      {/* header */}
      <div className="flex items-center bg-primary px-4 py-2.5 mb-0">
        <div className="flex items-center">
          <h2 className="text-[15px] text-white sm:text-[17px] font-extrabold text-gray-900 tracking-tight">
            Lifestyle gadgets for you
          </h2>
        </div>
      </div>

      <div className="relative border border-gray-200 border-t-0">
        {showSkeleton ? (
          <LifestyleGridSkeleton count={LifestyleItems?.length ?? 16} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
            {lifestyle.map((items) => (
              <div
                key={items.id}
                className="
                  border-r border-gray-200 
                  border-b border-gray-200 
                  lg:[&:nth-child(n)]:border-b-1
                "
              >
                <div className="h-full">
                  <Link
                    href={`/${items.categ_name}/product/${items.slug}-${items.legacy_product_id}`}
                  >
                    <ProductCardLifestyle
                      src={items.url}
                      alt={items.name}
                      price={items.price}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "error" && <SectionErrorOverlay onRetry={onRetry} />}
      </div>
    </section>
  );
}
