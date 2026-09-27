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
import { DeliveryInfo } from "@/components/EachProductPage/Delivery-info";
import { useEffect, useState } from "react";
import { StockStatus } from "@/components/EachProductPage/stockstatus-desk";
import { useParams } from "next/navigation";
import { urlHome } from "@/db/mock";
import { ProductPageError } from "@/components/EachProductPage/erro-states/error-page";
import { MobileProductSkeleton } from "@/components/EachProductPage/loading-states/mobile-skeleton";
import { DesktopProductSkeleton } from "@/components/EachProductPage/loading-states/desktop-skeleton";
import { formatCategoryLabel } from "@/Helper-functions/productPage";
import { useCart } from "@/components-utils/cart/items-to-cart";

type ProductData = {
  id: number;
  legacy_product_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: number;
  cat_name: string;
  in_stock: boolean | null;
  images: string[];
  sellerName?: string;
  rating?: number | undefined;
  reviewCount: number;
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
  const [products, setProducts] = useState<ProductData[] | null>(null);
  const [inStock, setInStock] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [retrycount, setRetrycount] = useState(0);
  const [error, setError] = useState(false);
  const { cart, addItem, increaseQty, decreaseQty, removeItem, dispatch } =
    useCart();

  const handleAddToCart = (qty: number) => {
    const product = products?.[0];
    if (!product) return;

    for (let i = 0; i < qty; i++) {
      const result = addItem({
        id: String(product.legacy_product_id),
        name: product.name,
        price: product.price,
        image: product.images?.[0],
      });

      if (result === "max_reached") {
        // trigger your "contact sales rep" popup here
        break;
      }
    }
  };
  const resolveParams = useParams<{ productname: string }>();
  const { productname } = resolveParams;
  const ProductId = productname.split("-").pop();
  const legacyProductId = Number(ProductId);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await fetch(`${urlHome}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ legacyProductId }),
        });

        if (!result.ok) throw new Error(`Request failed with ${result.status}`);

        const data = await result.json();
        setProducts(data.product?.[0] ?? data);
        setInStock(data.inStock ?? null);
      } catch (err) {
        console.error("couldn't fetch product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [legacyProductId, retrycount]);

  const categoryLabel = formatCategoryLabel(products?.[0]?.cat_name);

  const fetchProduct = () => {
    setRetrycount((prev) => prev + 1);
  };

  if (error) {
    return <ProductPageError onRetry={fetchProduct} />;
  }

  if (loading || !products) {
    return (
      <main className="bg-gray-50">
        <BreadCrumbs
          items={[
            {
              label: categoryLabel,
              href: `/${products?.[0]?.cat_name}`,
            },
            {
              label: products?.[0]?.name ?? "",
              href: `/${products?.[0]?.cat_name}/product/${products?.[0]?.slug}-${products?.[0]?.legacy_product_id}`,
            },
          ]}
        />
        <MobileProductSkeleton />
        <DesktopProductSkeleton />
      </main>
    );
  }

  return (
    <main className="bg-gray-50">
      <BreadCrumbs
        items={[
          {
            label: categoryLabel,
            href: `/${products?.[0]?.cat_name}`,
          },
          {
            label: products?.[0]?.name ?? "",
            href: `/${products?.[0]?.cat_name}/product/${products?.[0]?.slug}-${products?.[0]?.legacy_product_id}`,
          },
        ]}
      />

      {/* Mobile (<640px) */}

      <div className="sm:hidden bg-secondary">
        <ProductImageGallery
          images={products?.[0].images}
          alt={products?.[0].slug}
        />

        <div className="p-4 max-w-[420px]">
          <ProductInfo
            name={products?.[0].name}
            price={products?.[0].price}
            sellerName={products?.[0].sellerName}
            rating={products?.[0].rating}
            reviewCount={products?.[0].reviewCount}
          />
          <StockStatus inStock={inStock} />

          <div className="mt-1">
            <ProductTabs
              variant="underline"
              reviewCount={products?.[0].reviewCount}
              description={
                <div className="space-y-4 text-sm leading-relaxed text-gray-500">
                  <p>{products?.[0].description}</p>
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

      {/* sm and lg (>=640px) */}
      <div className="mx-auto hidden max-w-7xl px-6 sm:block lg:px-8 xl:max-w-6xl mb-2 mt-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div className="min-w-0">
              <ProductGalleryDesktop
                images={products?.[0].images}
                alt={products?.[0].name}
                discountPercent={15}
              />
            </div>

            <div className="flex flex-col gap-6 min-w-0">
              <ProductDetailsPanel
                name={products?.[0].name}
                price={products?.[0].price}
                originalPrice={products?.[0].originalPrice}
                currency={products?.[0].currency}
                rating={products?.[0].rating}
                reviewCount={products?.[0].reviewCount}
                features={featureHighlights}
                trustBadges={trustBadges}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ProductTabs
                  variant="underline"
                  reviewCount={products?.[0].reviewCount}
                  description={
                    <div className="space-y-4 text-sm leading-relaxed text-gray-500">
                      <p>
                        Experience pure sound with our Wireless Headphone.
                        Designed for comfort and built for performance, it
                        delivers rich bass, clear highs, and seamless
                        connectivity for an immersive audio experience.
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
                {/*<RatingSummary
                  rating={products?.[0].rating}
                  reviewCount={products?.[0].reviewCount}
                  breakdown={ratingBreakdown}
                />*/}
              </div>
            </div>
          </div>
        </div>
      </div>

      <StickyAddToCart onAddToCart={handleAddToCart} />
    </main>
  );
}
