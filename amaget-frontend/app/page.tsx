import { HotSales } from "@/components/Hot-sales-carousel/hot-sales";
import { HeroCarousel } from "@/components/Hero-carousel.tsx/Herocarousel";
import BrowseCategorySection from "@/components/Browse-category-carousel/browse-category";
import UpgradePc from "@/components/upgrade-pc/upgrade-pc";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <section className="bg-secondary">
        <HotSales />
        <BrowseCategorySection />
        <UpgradePc/>
      </section>
    </main>
  );
}
