import { IoStar } from "react-icons/io5";
import { QuantityAddToCart } from "./QuantityAddToCart.";


interface ProductDetailsPanelProps {
  name: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  features: { icon: React.ReactNode; label: string }[];
  trustBadges: { icon: React.ReactNode; label: string; sublabel: string }[];
  onAddToCart: (quantity: number) => void;
}

export function ProductDetailsPanel({
  name,
  price,
  originalPrice,
  currency = "$",
  rating,
  reviewCount,
  features,
  trustBadges,
  onAddToCart,
}: ProductDetailsPanelProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900">{name}</h1>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-2xl font-bold ">
          {currency}
          {price.toLocaleString()}
        </span>
        {typeof originalPrice === "number" && (
          <span className="text-lg text-gray-400 line-through">
            {currency}
            {originalPrice.toLocaleString()}
          </span>
        )}
      </div>

      {typeof rating === "number" && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
          <IoStar className="h-4 w-4 text-amber-400" />
          <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
          {typeof reviewCount === "number" && (
            <span>({reviewCount} Reviews)</span>
          )}
        </div>
      )}

      <div className="mt-6 border-t border-gray-100 pt-6">
        <QuantityAddToCart onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}
