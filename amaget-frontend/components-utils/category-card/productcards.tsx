"use client";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { allowedCategories, CATBRAND as BRAND } from "@/db/mock";
import { Heart } from "lucide-react";
import { Rating } from "../category-product-pages/ratings";
import { PriceFormatter } from "@/Helper-functions/price";
import { CartButtonContent } from "./cart-button-content";
import Link from "next/link";

type CategProdProps = {
  id: string;
  legacy_product_id: string;
  name: string;
  slug: string;
  price: string;
  total_count: string;
  url: string;
};

type itemProps = {
  p: CategProdProps;
  category: string | undefined;
};

export function ProductCard({ p, category }: itemProps) {
  const [fav, setFav] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = 55;
  const cleanProductName = p.slug
    ? p.slug.trim().toLowerCase().replace(/\s+/g, "-").replace(/-+/g, "-")
    : "";
  const slug = `${cleanProductName}-${p.legacy_product_id}`;

  const handleAddToCart = () => {
    if (added) return;
    setAdded(true);

    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group bg-secondary rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200">
      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
        <CldImage
          src={p.url}
          alt={p.name}
          fill
          loading="lazy"
          quality={90}
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

        {/**wishlist button */}
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
        <Link href={`/${category}/product/${slug}`}>
          <h3 className="text-[12.5px] sm:text-[13px] font-semibold text-gray-900 leading-snug line-clamp-1">
            {p.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[13px] sm:text-[14px] font-bold text-gray-900">
              ₦{PriceFormatter(p.price)}
            </span>
          </div>
        </Link>

        {/* Mobile/tablet-only: always visible pill */}
        <button
          onClick={handleAddToCart}
          disabled={added}
          aria-label={added ? "Added to cart" : "Add to cart"}
          className={`
            lg:hidden mt-2.5 w-full h-9
            rounded-full text-[12.5px] font-semibold text-white select-none
            transition-all duration-300 ease-out
            active:scale-[0.96]
            ${added ? "bg-emerald-500 scale-[1.02] ring-1 ring-emerald-200" : "ring-0 ring-transparent"}
          `}
          style={!added ? { backgroundColor: BRAND } : undefined}
        >
          <CartButtonContent added={added} />
        </button>

        {/* Desktop-only: hidden until hover, floats over the image */}
        <button
          onClick={handleAddToCart}
          disabled={added}
          aria-label={added ? "Added to cart" : "Add to cart"}
          className={`
            hidden lg:flex
             h-9 w-full
            rounded-full text-[12.5px] font-semibold text-white select-none mt-2.5
            transition-all duration-300 ease-out
            translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
            shadow-md group-hover:shadow-lg
            active:scale-[0.97]
            ${added ? "bg-emerald-500 ring-1 ring-emerald-200" : "ring-0 ring-transparent hover:brightness-95"}
          `}
          style={!added ? { backgroundColor: BRAND } : undefined}
        >
          <CartButtonContent added={added} />
        </button>
      </div>
    </div>
  );
}
