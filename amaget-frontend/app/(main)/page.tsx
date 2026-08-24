"use client";
import { HotSales } from "@/components/Hot-sales-carousel/hot-sales";
import { HeroCarousel } from "@/components/Hero-carousel.tsx/Herocarousel";
import BrowseCategorySection from "@/components/Browse-category-carousel/browse-category";
import UpgradePc from "@/components/upgrade-pc/upgrade-pc";
import { Lifestyle } from "@/components/Lifestyle-carousels/Lifestyle";
import { BNPL } from "@/components/BNPL-carousel/bnpl";
import { useEffect, useState } from "react";

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
  upgradPc: CarouselItems[];
  Lifestyle: CarouselItems[];
  bnpl: CarouselItems[];
}

export default function Home() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isloading, setIsloading] = useState(true);
  const urlHome = process.env.NEXT_PUBLIC_BASEURL;

  useEffect(() => {
    const fetchHomepageProducts = async () => {
      try {
        setIsloading(true);
        const result = await fetch(`${urlHome}`);
        const res = await result.json();
        setData(res);
        console.log("products:", res);
      } catch (err) {
        console.error("error fetching home carousels products:", err);
      } finally {
        setIsloading(false);
      }
    };

    fetchHomepageProducts();
  }, []);

  return (
    <main>
      <HeroCarousel />
      <section className="bg-secondary">
        <HotSales hotsales={data?.hotsales || []} isloading={isloading} />
        <BrowseCategorySection />
        <UpgradePc upgrade={data?.upgradPc || []} isloading={isloading} />
        <Lifestyle lifestyle={data?.Lifestyle || []} isloading={isloading} />
        <BNPL bnpl={data?.bnpl || []} isloading={isloading} />
      </section>
    </main>
  );
}
