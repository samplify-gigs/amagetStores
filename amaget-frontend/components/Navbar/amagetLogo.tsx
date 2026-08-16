import Image from "next/image";
import Link from "next/link";

type IconProps = {
  width?: number;
  height?: number;
  className?: string;
};

export function AmagetLogo({
  width = 100,
  height = 36,
  className = "h-8 w-auto object-contain",
}: IconProps) {
  return (
    <Link href="/">
      <Image
        src="/Amaget-Logo-Optimized.png"
        alt="Amaget store logo"
        loading="eager"
        width={width}
        height={height}
        className={className}
      />
    </Link>
  );
}
