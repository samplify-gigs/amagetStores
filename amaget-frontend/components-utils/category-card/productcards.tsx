"use client";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { CATBRAND as BRAND } from "@/db/mock";
import { Heart } from "lucide-react";
import { Rating } from "../category-product-pages/ratings";
import { PriceFormatter } from "@/Helper-functions/price";

type CategProdProps = {
  id: string;
  name: string;
  price: string;
  total_count: string;
  url: string;
};

type itemProps = {
  p: CategProdProps;
};

export function ProductCard({ p }: itemProps) {
  const [fav, setFav] = useState(false);
  const discount = 55;

  return (
    <div className="group bg-secondary rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200">
      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
        <CldImage
          src={p.url}
          alt={p.name}
          fill
          loading="lazy"
          quality={88}
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 200px"
          className="object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
        />
        {discount && (
          <span
            className="absolute top-2 left-2 text-[10px] font-semibold text-white px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: BRAND }}
          >
            -{discount}%
          </span>
        )}
        <button
          onClick={() => setFav((f) => !f)}
          aria-label="Add to wishlist"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm"
        >
          <Heart
            size={14}
            className={fav ? "fill-[#fc0056] text-[#fc0056]" : "text-gray-400"}
          />
        </button>
      </div>

      <div className="p-2.5 sm:p-3">
        <h3 className="text-[12.5px] sm:text-[13px] font-semibold text-gray-900 leading-snug line-clamp-1">
          {p.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[13px] sm:text-[14px] font-bold text-gray-900">
            ₦{PriceFormatter(p.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
