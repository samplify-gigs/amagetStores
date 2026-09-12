"use client";
import { QuantityAddToCart } from "./QuantityAddToCart.";

interface StickyAddToCartProps {
  onAddToCart: (quantity: number) => void;
}

export function StickyAddToCart({ onAddToCart }: StickyAddToCartProps) {
  return (
    <div className="sticky inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-secondary px-5 py-1 sm:hidden">
      <div className="max-w-[420px] mx-auto">
        <QuantityAddToCart onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}
