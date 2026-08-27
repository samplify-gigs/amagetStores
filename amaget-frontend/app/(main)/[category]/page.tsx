"use client";
import { useState, useMemo, useEffect } from "react";
import { Breadcrumbs } from "@/components-utils/category-card/Breadcrumbs";
import { EmptyState } from "@/components-utils/category-card/emptystate";
import { FilterGroup } from "@/components-utils/category-card/filter-group";
import { ProductSkeleton } from "@/components-utils/category-card/product-skeleton";
import { ProductCard } from "@/components-utils/category-card/productcards";
import Link from "next/link";
import {
  FILTERS,
  CATBRAND as BRAND,
  TRENDING,
  CategoriesForSidebar,
} from "@/db/mock";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

type CategProdProps = {
  id: string;
  name: string;
  price: string;
  total_count: string;
  url: string;
};

export default function CategoryPage() {
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [categProducts, setCategProducts] = useState<CategProdProps[] | null>(
    null,
  );
  const resolveParams = useParams<{ category: string }>();
  const { category } = resolveParams;

  const activeFilterCount = Object.values(selected).flat().length;

  const pageSize = 20;
  const currentPage = 1;
  const offset = (currentPage - 1) * pageSize;
  const urlHome = process.env.NEXT_PUBLIC_BASEURL;

  useEffect(() => {
    async function fetchCategproducts() {
      try {
        const result = await fetch(`${urlHome}/category/pagination`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ offset }),
        });

        const res = await result.json();
        console.log("categ products:", res.categoryProducts);
        setCategProducts(res.categoryProducts);
      } catch (err) {
        console.error("fetch category products failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategproducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans mt-29">
      {/* HEADER  */}
      <div className="bg-white border-b border-gray-100 ">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4 lg:py-6 mt-5">
          <div className="mb-2 mt-3">
            <Breadcrumbs category={category} />
          </div>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold tracking-tight">
              {category}
            </h1>
            <span className="text-[12px] sm:text-[13px] text-gray-400 font-medium">
              {categProducts?.[0].total_count ?? 0} products
            </span>
          </div>
        </div>
      </div>

      {/* ============ BODY ============ */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4 lg:py-6 flex gap-6">
        {/* ---- Desktop sidebar ---- */}
        <aside className="hidden lg:block w-[250px] shrink-0 bg-secondary p-2 rounded-xl">
          <div className="sticky top-6 space-y-5">
            <div>
              <h2 className="text-[12px] font-bold ml-2 text-gray-400 uppercase tracking-wide mb-2">
                Categories
              </h2>
              <ul className="space-y-1">
                {CategoriesForSidebar.map((c) => (
                  <li key={c.label}>
                    <Link
                      href="#"
                      className="flex items-center justify-between text-[13px] py-1.5 px-2 rounded-l font-semibold text-gray-400 hover:bg-gray-50"
                    >
                      {c.label}
                      <ChevronRight size={12} className="text-gray-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Trending */}

            <div>
              <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-2">
                Trending
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {TRENDING.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] text-gray-600 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Filters for lg */}

            <div className="border-t border-gray-100 pt-1">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-medium"
                    style={{ color: BRAND }}
                  >
                    Reset
                  </button>
                )}
              </div>
              {Object.entries(FILTERS).map(([group, options]) => (
                <FilterGroup
                  key={group}
                  title={group}
                  options={options}
                  selected={selected[group] || []}
                  onToggle={(opt) => toggleFilter(group, opt)}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* ---- Main content ---- */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : categProducts?.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {categProducts?.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}

          {/* Pagination  */}
          {categProducts && categProducts.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-8">
              <button
                className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-300 rounded-lg"
                disabled
              >
                <ChevronLeft size={15} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className="w-9 h-9 text-[13px] font-medium rounded-lg border"
                  style={
                    p === 1
                      ? {
                          backgroundColor: BRAND,
                          borderColor: BRAND,
                          color: "white",
                        }
                      : { borderColor: "#e5e7eb", color: "#4b5563" }
                  }
                >
                  {p}
                </button>
              ))}
              <button className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg hover:border-[#fc0056] hover:text-[#fc0056]">
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
