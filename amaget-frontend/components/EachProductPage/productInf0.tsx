import { PriceFormatter } from "@/Helper-functions/price";
import { IoStar } from "react-icons/io5";

interface ProductInfoProps {
  name: string;
  price: number;
  sellerName?: string;
  rating?: number;
  reviewCount?: number;
}

export function ProductInfo({
  name,
  price,
  rating,
  reviewCount,
}: ProductInfoProps) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-md text-gray-900">{name}</h1>
          <p className="mt-1 text-lg font-bold text-gray-900">
            ₦{PriceFormatter(price)}
          </p>
        </div>
      </div>

      {typeof rating === "number" && (
        <div className="mt-1.5 flex items-center gap-1 text-sm text-gray-500">
          <IoStar className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
          {typeof reviewCount === "number" && (
            <span>({reviewCount} Reviews)</span>
          )}
        </div>
      )}
    </div>
  );
}
