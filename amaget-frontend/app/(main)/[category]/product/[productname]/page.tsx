"use client";

import {
  IoBatteryFullOutline,
  IoBluetoothOutline,
  IoCheckmarkCircle,
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoSyncOutline,
  IoVolumeMuteOutline,
  IoHeadsetOutline,
} from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { ProductImageGallery } from "@/components/EachProductPage/productImageGallery";
import { ProductGalleryDesktop } from "@/components/EachProductPage/ProductGalleryDesktop";
import { ProductDetailsPanel } from "@/components/EachProductPage/ProductDetailsPanel";
import { ProductTabs } from "@/components/EachProductPage/productTabs";
import { StickyAddToCart } from "@/components/EachProductPage/addTocart";
import { RatingSummary } from "@/components/EachProductPage/rating-summary";
import { ProductInfo } from "@/components/EachProductPage/productInf0";
import { BreadCrumbs } from "@/components/EachProductPage/breadCrumbs";

const product = {
  name: "Wireless Headphone",
  price: 200,
  originalPrice: 500,
  currency: "₦",
  sellerName: "Tariqul Islam",
  rating: 4.1,
  reviewCount: 120,
  images: [
    "/Lifestyle/airpods pro.webp",
    "/Lifestyle/Led lightning.webp",
    "/Lifestyle/Onyx sydio 9.webp",
  ],
};

const featureHighlights = [
  { icon: <IoBluetoothOutline className="h-5 w-5" />, label: "Bluetooth 5.3" },
  { icon: <IoBatteryFullOutline className="h-5 w-5" />, label: "24H Battery" },
  {
    icon: <IoVolumeMuteOutline className="h-5 w-5" />,
    label: "Noise Cancellation",
  },
  { icon: <IoLeafOutline className="h-5 w-5" />, label: "Lightweight Design" },
];

const trustBadges = [
  {
    icon: <IoShieldCheckmarkOutline className="h-4 w-4" />,
    label: "1 Year",
    sublabel: "Warranty",
  },
  {
    icon: <IoSyncOutline className="h-4 w-4" />,
    label: "7 Days",
    sublabel: "Return",
  },
  {
    icon: <FaTruck className="h-4 w-4" />,
    label: "Free",
    sublabel: "Delivery",
  },
  {
    icon: <IoHeadsetOutline className="h-4 w-4" />,
    label: "24/7",
    sublabel: "Support",
  },
];

const descriptionPoints = [
  "High quality sound with deep bass",
  "Up to 24 hours of battery life",
  "Comfortable and adjustable fit",
];

const ratingBreakdown = [
  { stars: 5, percent: 72 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 7 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 3 },
];

export default function EachProductPage() {
  const handleAddToCart = (qty: number) => console.log("add to cart", qty);

  return (
    <main className="mt-30 sm:mt-17 md:mt-23 bg-gray-50">
      <BreadCrumbs
        items={[
          { label: "Clothing", href: "/category/clothing" },
          {
            label: "Hulchi",
            href: "/category/clothing/hulchi-pijama",
          },
        ]}
      />

      {/* Mobile (<640px) */}

      <div className="sm:hidden bg-secondary">
        <ProductImageGallery images={product.images} alt={product.name} />

        <div className="p-4 max-w-[420px]">
          <ProductInfo
            name={product.name}
            price={product.price}
            sellerName={product.sellerName}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />

          <div className="mt-1">
            <ProductTabs
              variant="underline"
              reviewCount={product.reviewCount}
              description={
                <div className="space-y-4 text-sm leading-relaxed text-gray-500">
                  <p>
                    Experience pure sound with our Wireless Headphone. Designed
                    for comfort and built for performance, it delivers rich
                    bass, clear highs, and seamless connectivity for an
                    immersive audio experience.
                  </p>
                  <ul className="space-y-2">
                    {descriptionPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <IoCheckmarkCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              }
              reviews={
                <p className="text-sm leading-relaxed text-gray-500">
                  Reviews list goes here.
                </p>
              }
            />
          </div>
        </div>
      </div>

      {/* sm and lg (>=640px) — max-w caps it on xl too, no extra breakpoint needed */}
      <div className="mx-auto hidden max-w-7xl px-6 sm:block lg:px-8 mb-2 mt-2">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr] lg:gap-14 ">
          <ProductGalleryDesktop
            images={product.images}
            alt={product.name}
            discountPercent={15}
          />

          <ProductDetailsPanel
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            currency={product.currency}
            rating={product.rating}
            reviewCount={product.reviewCount}
            features={featureHighlights}
            trustBadges={trustBadges}
            onAddToCart={handleAddToCart}
          />
        </div>

        <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProductTabs
                variant="underline"
                reviewCount={product.reviewCount}
                description={
                  <div className="space-y-4 text-sm leading-relaxed text-gray-500">
                    <p>
                      Experience pure sound with our Wireless Headphone.
                      Designed for comfort and built for performance, it
                      delivers rich bass, clear highs, and seamless connectivity
                      for an immersive audio experience.
                    </p>
                    <ul className="space-y-2">
                      {descriptionPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <IoCheckmarkCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                }
                reviews={
                  <p className="text-sm leading-relaxed text-gray-500">
                    Reviews list goes here.
                  </p>
                }
              />
            </div>

            <div className="lg:pt-[52px]">
              <RatingSummary
                rating={product.rating}
                reviewCount={product.reviewCount}
                breakdown={ratingBreakdown}
              />
            </div>
          </div>
        </div>
      </div>

      <StickyAddToCart onAddToCart={handleAddToCart} />
    </main>
  );
}
