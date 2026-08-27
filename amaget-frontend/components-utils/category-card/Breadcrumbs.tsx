import { CATEGORYPAGES as CATEGORY } from "@/db/mock";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type CategoryProps = {
  category: string;
};

export function Breadcrumbs({ category }: CategoryProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[12px] text-gray-400 flex items-center gap-1"
    >
      <Link href="#" className="hover:text-gray-600">
        Home
      </Link>
      <ChevronRight size={12} />
      <Link href={`/${category}`} className="hover:text-gray-600">
        {category}
      </Link>
    </nav>
  );
}
