import { Check, ShoppingCart } from "lucide-react";

export const CartButtonContent = ({ added }: { added: boolean }) => (
  
  <span className="relative flex items-center justify-center h-full w-full">
    <span
      className={`flex items-center gap-1.5 transition-all duration-200 ${
        added ? "opacity-0 scale-75" : "opacity-100 scale-100"
      }`}
    >
      <ShoppingCart size={14} />
      Add to cart
    </span>
    <span
      className={`absolute flex items-center gap-1.5 transition-all duration-200 ${
        added ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}
    >
      <Check size={14} strokeWidth={3} />
      Added
    </span>
  </span>
);
