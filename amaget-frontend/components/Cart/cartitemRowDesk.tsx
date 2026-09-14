import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";
import { QuantityStepper } from "./quantityStepper";

interface CartItemRowProps {
  image: string;
  name: string;
  variation?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItemRow({
  image,
  name,
  variation,
  price,
  originalPrice,
  currency = "₦",
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  return (
    <div className="flex items-center gap-5 py-5">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-background">
        <Image src={image} alt={name} fill className="object-contain p-2" />
        {discount && (
          <span className="absolute left-1 top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-secondary">
            -{discount}%
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        {variation && (
          <p className="mt-1 text-xs text-foreground/45">{variation}</p>
        )}
      </div>

      <div className="w-28 flex-shrink-0 text-right">
        <p className="text-sm font-semibold text-foreground">
          {currency}
          {price.toLocaleString()}
        </p>
        {originalPrice && (
          <p className="text-xs text-foreground/35 line-through">
            {currency}
            {originalPrice.toLocaleString()}
          </p>
        )}
      </div>

      <QuantityStepper
        quantity={quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      <button
        onClick={onRemove}
        className="flex-shrink-0 text-foreground/30 transition-colors hover:text-primary"
        aria-label="Remove item"
      >
        <IoTrashOutline className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}
