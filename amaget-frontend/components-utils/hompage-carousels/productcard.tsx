import Image from "next/image";

export function ProductCard({
  src,
  alt,
  price,
}: {
  src: string;
  alt: string;
  price: number;
}) {
  return (
    <div className="group flex flex-col bg-secondary rounded-xl overflow-hidden border border-gray-100 hover:border-[#7EB8C9]/40 hover:shadow-lg hover:shadow-[#7EB8C9]/10 transition-all duration-250 cursor-pointer">
      {/* Image container */}
      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 200px"
          quality={88}
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300 ease-out"
        />
        {/* Hot badge */}
        <span className="absolute top-2 left-2 bg-[#fc0056] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
          Hot
        </span>
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1">
        <p className="text-[12px] leading-snug text-gray-700 font-medium line-clamp-2 min-h-[32px]">
          {alt}
        </p>
        <p className="text-[13px] font-bold text-[#fc0056] tracking-tight">
          ₦{price}
        </p>
      </div>
    </div>
  );
}