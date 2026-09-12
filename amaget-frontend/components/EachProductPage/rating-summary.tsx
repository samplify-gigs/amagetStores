import { IoStar } from "react-icons/io5";

interface RatingBreakdownRow {
  stars: number;
  percent: number;
}

interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
  breakdown: RatingBreakdownRow[];
}

export function RatingSummary({ rating, reviewCount, breakdown }: RatingSummaryProps) {
  return (
    <div className="rounded-2xl bg-gray-50 p-6">
      <p className="text-4xl font-bold text-gray-900">{rating.toFixed(1)}</p>
      <div className="mt-1 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <IoStar key={i} className={`h-4 w-4 ${i < Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} />
        ))}
      </div>
      <p className="mt-1 text-sm text-gray-500">{reviewCount} Reviews</p>

      <div className="mt-5 space-y-2">
        {breakdown.map((row) => (
          <div key={row.stars} className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex w-7 items-center gap-0.5">
              {row.stars} <IoStar className="h-3 w-3 text-amber-400" />
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-primary" style={{ width: `${row.percent}%` }} />
            </div>
            <span className="w-8 text-right">{row.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}