export function StockStatus({
  inStock,
  size = "sm",
}: {
  inStock: boolean | null;
  size?: "sm" | "lg";
}) {
  const isLg = size === "lg";

  if (inStock === null) {
    return (
      <div
        className={`inline-flex items-center gap-2 ${isLg ? "px-3 py-1.5" : ""}`}
      >
        <span className="h-2 w-2 rounded-full bg-gray-300 animate-pulse" />
        <span
          className={`font-medium text-gray-400 ${isLg ? "text-sm" : "text-[12.5px]"}`}
        >
          Checking availability...
        </span>
      </div>
    );
  }

  if (inStock) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full ${
          isLg ? "bg-emerald-50 px-3 py-1.5" : ""
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span
          className={`font-bold text-emerald-600 tracking-wide ${
            isLg ? "text-sm" : "text-[12.5px]"
          }`}
        >
          In Stock
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full ${
        isLg ? "bg-orange-50 px-3 py-1.5" : ""
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping opacity-75" />
      <span
        className={`font-bold text-orange-600 tracking-wide ${
          isLg ? "text-sm" : "text-[12.5px]"
        }`}
      >
        Confirm Availability
      </span>
    </div>
  );
}
