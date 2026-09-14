import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";
import { QuantityStepper } from "./quantityStepper";

interface CartItemCardProps {
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

export function CartItemCard({
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
}: CartItemCardProps) {
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  return (
    <div className="flex gap-3 rounded bg-card p-3">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-background">
        <Image src={image} alt={name} fill className="object-contain p-2" />
        {discount && (
          <span className="absolute left-1 top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-secondary">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
            {name}
          </p>
          <button
            onClick={onRemove}
            className="flex-shrink-0 text-foreground/30 transition-colors hover:text-primary"
            aria-label="Remove item"
          >
            <IoTrashOutline className="h-4 w-4" />
          </button>
        </div>

        {variation && (
          <p className="mt-0.5 text-xs text-foreground/45">{variation}</p>
        )}

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-foreground">
              {currency}
              {price.toLocaleString()}
            </span>
          </div>
          <QuantityStepper
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
