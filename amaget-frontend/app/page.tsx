import { HotSales } from "@/components/Hot-sales-carousel/hot-sales";
import { HeroCarousel } from "@/components/Hero-carousel.tsx/Herocarousel";
import BrowseCategorySection from "@/components/Browse-category-carousel/browse-category";
import UpgradePc from "@/components/upgrade-pc/upgrade-pc";
import { Lifestyle } from "@/components/Lifestyle-carousels/Lifestyle";
import { BNPL } from "@/components/BNPL-carousel/bnpl";
import { SideBar } from "@/components/Sidebar/sidebar";


export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <section className="bg-secondary">
        <HotSales />
        <BrowseCategorySection />
        <UpgradePc/>
        <Lifestyle/>
        <BNPL/>
      </section>
    </main>
  );
}
