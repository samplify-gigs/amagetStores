import Link from "next/link";

export function CategoryCard({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        flex flex-col items-center justify-center gap-2
        px-2 py-4
        border border-gray-200
        bg-white
        hover:bg-[#fc0056] hover:border-[#fc0056]
        transition-all duration-200 ease-out
        cursor-pointer
        min-w-0
      "
    >
      {/* Icon circle */}
      <span
        className="
          flex items-center justify-center
          w-10 h-10 rounded-full
          bg-gray-100 group-hover:bg-white/20
          transition-colors duration-200
        "
      >
        <Icon className="text-xl text-gray-600 group-hover:text-white transition-colors duration-200" />
      </span>

      {/* Label */}
      <span
        className="
          text-[11px] sm:text-[12px] font-semibold text-center
          text-gray-700 group-hover:text-white
          leading-tight transition-colors duration-200
          line-clamp-2
        "
      >
        {label}
      </span>
    </Link>
  );
}
