"use client";
import { HotSales } from "@/components/Hot-sales-carousel/hot-sales";
import { HeroCarousel } from "@/components/Hero-carousel.tsx/Herocarousel";
import BrowseCategorySection from "@/components/Browse-category-carousel/browse-category";
import UpgradePc from "@/components/upgrade-pc/upgrade-pc";
import { Lifestyle } from "@/components/Lifestyle-carousels/Lifestyle";
import { BNPL } from "@/components/BNPL-carousel/bnpl";
import { useEffect, useState, useCallback } from "react";

interface CarouselItems {
  id: string;
  name: string;
  category_id: string;
  legacy_product_id: string;
  price: string;
  url: string;
  categ_name: string;
}

interface HomepageData {
  hotsales: CarouselItems[];
  upgradepc: CarouselItems[];
  lifestyle: CarouselItems[];
  bnpl: CarouselItems[];
}
type FetchStatus = "loading" | "error" | "success";

export default function Home() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [retryToken, setRetryToken] = useState(0);
  const urlHome = process.env.NEXT_PUBLIC_BASEURL;

  useEffect(() => {
    let cancelled = false;
    const fetchHomepageProducts = async () => {
      try {
        const result = await fetch(`${urlHome}/node-cron/home-daily-products`);
        if (!result.ok) throw new Error(`Request failed: ${result.status}`);
        const res = await result.json();
        if (!cancelled) {
          setData(res);
          setStatus("success");
        }
      } catch (err) {
        console.error("error fetching home carousels products:", err);
        if (!cancelled) setStatus("error");
      }
    };

    fetchHomepageProducts();

    return () => {
      cancelled = true;
    };
  }, [urlHome, retryToken]);

  const onRetry = useCallback(() => {
    setStatus("loading");
    setRetryToken((t) => t + 1);
  }, []);

  return (
    <main>
      <HeroCarousel />
      <section className="bg-secondary">
        <HotSales
          hotsales={data?.hotsales || []}
          status={status}
          onRetry={onRetry}
        />
        <BrowseCategorySection />
        <UpgradePc
          upgrade={data?.upgradepc || []}
          status={status}
          onRetry={onRetry}
        />
        <Lifestyle
          lifestyle={data?.lifestyle || []}
          status={status}
          onRetry={onRetry}
        />
        <BNPL bnpl={data?.bnpl || []} status={status} onRetry={onRetry} />
      </section>
    </main>
  );
}
