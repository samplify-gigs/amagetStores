type Products = {
  id: number | string;
  name: string;
};

type SearchDropDown = {
  query: string | undefined;
  products: Products[];
  status: "idle" | "loading" | "success" | "error";
};

export function SearchDropDown({ query, products, status }: SearchDropDown) {
  if (!query) return null;
  if (status === "idle") return null;
  if (products === undefined) return null;
  const wrapperClass =
    "absolute top-full left-0 right-0 z-50 mt-1 mx-4 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden";
  if (status === "loading") {
    return (
      <div className={wrapperClass}>
        <div className="px-3 py-4 text-center text-sm text-zinc-400">
          Searching…
        </div>
      </div>
    );
  }

    if (status === "error") {
    return (
      <div className={wrapperClass}>
        <div className="px-3 py-4 text-center text-sm text-red-500">
          Something went wrong. Please try again.
        </div>
      </div>
    );
  }

   if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className={wrapperClass}>
        <div className="px-3 py-4 text-center text-sm text-zinc-400">
          No results for{" "}
          <span className="font-medium text-zinc-600">{query}</span>
        </div>
      </div>
    );
  }


  return (
    <div className={wrapperClass}>
      <ul className="divide-y divide-bg-primary">
        {products.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-md bg-zinc-100 flex-shrink-0" />
            <span className="text-sm font-medium text-zinc-800">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
