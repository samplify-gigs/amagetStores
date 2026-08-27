import { Search } from "lucide-react";
import { CATBRAND as BRAND } from "@/db/mock";

export function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4">
        <Search size={22} className="text-gray-300" />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-900">
        No products match your filters
      </h3>
      <p className="text-[13px] text-gray-400 mt-1 max-w-xs">
        Try adjusting or clearing your filters, or browse a related category
        instead.
      </p>
      <button
        onClick={onReset}
        className="mt-4 text-[13px] font-semibold text-white px-4 py-2 rounded-lg"
        style={{ backgroundColor: BRAND }}
      >
        Clear all filters
      </button>
    </div>
  );
}
