import { PriceFormatter } from "@/Helper-functions/price";
import Image from "next/image";
import Link from "next/link";


export function ProductCardLifestyle({
  src,
  alt,
  price,
}: {
  src: string;
  alt: string;
  price: string;
}) {
  return (
    <Link
      href="#"
      className="
        group flex flex-col bg-secondary cursor-pointer
        border-b border-gray-200 last:border-b-0
        hover:bg-gray-50 transition-colors duration-150
      "
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-secondary overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          quality={88}
          className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300 ease-out"
        />
      </div>

     

      {/* Info */}
      <div className="px-3 py-2.5 flex flex-col gap-0.5 h-[56px] justify-between">
        <p className="text-[12px] sm:text-[13px] leading-snug text-gray-700 font-medium line-clamp-2">
          {alt}
        </p>
        <p className="text-[13px] sm:text-[14px] font-bold text-[#fc0056]">
          ₦{PriceFormatter(price)}
        </p>
      </div>
    </Link>
  );
}