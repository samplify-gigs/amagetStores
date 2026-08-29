import { ChevronRight, ChevronLeft } from "lucide-react";
import { CATBRAND as BRAND } from "@/db/mock";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
type PaginationProps = {
  currentPage: number;
  totalPage: number;
};

export function CategPagination({ currentPage, totalPage }: PaginationProps) {
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const router = useRouter();

  if (totalPage <= 1) return null;

  function gotoPage(page: number) {
    if (page < 1 || page > totalPage || page === currentPage) return;
    const params = new URLSearchParams(searchparams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  function getPages(): (number | "...")[] {
    if (totalPage <= 7) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPage - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPage - 2) pages.push("...");

    pages.push(totalPage);
    return pages;
  }

  const pages = getPages();
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPage;

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-8">
      <button
        onClick={() => gotoPage(currentPage - 1)}
        className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:border-[#fc0056] hover:text-[#fc0056] disabled:hover:border-gray-200 disabled:hover:text-gray-300"
        disabled={isFirst}
      >
        <ChevronLeft size={15} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-[13px] text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => gotoPage(p)}
            className="w-9 h-9 text-[13px] font-medium rounded-lg border"
            style={
              p === currentPage
                ? { backgroundColor: BRAND, borderColor: BRAND, color: "white" }
                : { borderColor: "#e5e7eb", color: "#4b5563" }
            }
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => gotoPage(currentPage + 1)}
        className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:border-[#fc0056] hover:text-[#fc0056] disabled:hover:border-gray-200 disabled:hover:text-gray-300"
        disabled={isLast}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
