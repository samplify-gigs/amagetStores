"use client";

import Image from "next/image";
import { useState } from "react";
import { IoChevronBack, IoChevronForward, IoHeart, IoHeartOutline } from "react-icons/io5";

interface ProductGalleryDesktopProps {
  images: string[];
  alt: string;
  discountPercent?: number;
}

export function ProductGalleryDesktop({ images, alt, discountPercent }: ProductGalleryDesktopProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const showThumbnails = images.length > 1;
  const goTo = (i: number) => setActiveIndex((i + images.length) % images.length);

  return (
    <div className="rounded bg-gray-50 p-2 bg-secondary mt-1 max-w-[480px] mx-auto lg:mx-0">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        {typeof discountPercent === "number" && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-secondary">
            -{discountPercent}%
          </span>
        )}

        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-sm"
          aria-label="Toggle wishlist"
        >
          {wishlisted ? <IoHeart className="h-4 w-4 text-primary" /> : <IoHeartOutline className="h-4 w-4" />}
        </button>

        <Image
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${alt} ${activeIndex + 1}`}
          fill
          priority
          className="object-contain p-6"
        />
      </div>

      {showThumbnails && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500"
              aria-label="Previous image"
            >
              <IoChevronBack className="h-4 w-4" />
            </button>

            <div className="flex gap-3">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveIndex(i)}
                  className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 bg-white transition-colors ${
                    i === activeIndex ? "border-primary" : "border-transparent"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <div className="relative h-full w-full">
                    <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-contain p-1" />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => goTo(activeIndex + 1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500"
              aria-label="Next image"
            >
              <IoChevronForward className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}