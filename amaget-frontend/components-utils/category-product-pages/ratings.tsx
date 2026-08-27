import { Star } from "lucide-react";

export function Rating({ value }) {
  return (
    <span className="flex items-center gap-0.5 text-[11px] text-gray-500">
      <Star size={11} className="fill-amber-400 text-amber-400" />
      {value}
    </span>
  );
}
