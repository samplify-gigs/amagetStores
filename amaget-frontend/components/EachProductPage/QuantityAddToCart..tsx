import { useState } from "react";
import { IoCartOutline, IoCheckmark } from "react-icons/io5";

const MAX_QTY = 5; 

interface QuantityAddToCartProps {
  onAddToCart: (quantity: number) => void;
}

export function QuantityAddToCart({ onAddToCart }: QuantityAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-full border border-gray-200">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-lg text-gray-500 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          –
        </button>
        <span className="w-6 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
          disabled={quantity >= MAX_QTY}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-lg text-gray-500 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={added}
        aria-label={added ? "Added to cart" : "Add to cart"}
        className={`
          flex flex-1 items-center justify-center gap-2 rounded-full py-3.5
          text-sm font-semibold select-none
          transition-all duration-300 ease-out active:scale-[0.98]
          ${
            added
              ? "bg-emerald-500 text-white scale-[1.02] ring-1 ring-emerald-200"
              : "cursor-pointer bg-primary text-secondary"
          }
        `}
      >
        {added ? (
          <IoCheckmark className="h-4 w-4" />
        ) : (
          <IoCartOutline className="h-4 w-4" />
        )}
        {added ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}