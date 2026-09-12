"use client";

import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

interface QuantityAddToCartProps {
  onAddToCart: (quantity: number) => void;
}

export function QuantityAddToCart({ onAddToCart }: QuantityAddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-full border border-gray-200">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-lg text-gray-500"
          aria-label="Decrease quantity"
        >
          –
        </button>
        <span className="w-6 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-lg text-gray-500"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onAddToCart(quantity)}
        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-secondary transition-transform active:scale-[0.98]"
      >
        <IoCartOutline className="h-4 w-4" />
        Add to Cart
      </button>
    </div>
  );
}