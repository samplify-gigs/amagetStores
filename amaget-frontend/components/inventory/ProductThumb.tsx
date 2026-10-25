import Icon, { type IconName } from "./icons";
import type { Category } from "./mock";

const categoryIcon: Record<Category, IconName> = {
  Smartphones: "phone",
  Laptops: "laptop",
  Tablets: "tablet",
  Accessories: "headphones",
};

// Stand-in for a product photo. Swap for <Image> when real images exist.
export default function ProductThumb({ category, className = "size-12" }: { category: Category; className?: string }) {
  return (
    <div className={`grid shrink-0 place-items-center rounded-lg bg-background text-foreground/50 ${className}`}>
      <Icon name={categoryIcon[category]} className="size-1/2" />
    </div>
  );
}