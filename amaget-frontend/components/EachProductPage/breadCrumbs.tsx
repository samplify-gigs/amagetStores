import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadCrumbsProps {
  items: BreadcrumbItem[];
}

export function BreadCrumbs({ items }: BreadCrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-secondary p-2 text-sm text-gray-500 sm:px-6 mt-2"
    >
      <div className="lg:px-8 xl:max-w-6xl">
        <ol
          className="flex flex-nowrap items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <li className="shrink-0">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
          </li>

          {items.map((item, i) => {
            const isLast = i === items.length - 1;

            return (
              <li key={item.label} className="flex shrink-0 items-center gap-1.5">
                <IoChevronForward
                  className="h-3 w-3 shrink-0 text-gray-300"
                  aria-hidden="true"
                />

                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="text-gray-700"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-gray-700">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
