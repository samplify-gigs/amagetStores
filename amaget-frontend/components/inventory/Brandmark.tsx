import Image from "next/image";

// Logo tile. The white tile keeps the logo readable on the dark sidebar too.
export default function BrandMark() {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-black/5">
      <Image src="/Amaget-Logo-Optimized.png" alt="Amaget" width={70} height={90} className="h-7 w-auto" />
    </span>
  );
}