type Products = {
  id: number | string;
  name: string;
};

type SearchDropDown = {
  query: string | undefined;
  products: Products[] | undefined;
};

export function SearchDropDown({ query, products }: SearchDropDown) {
  if (!query) return null;
  if (products === undefined) return null;
  if (products.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 z-55 mt-1 bg-secondary border border-zinc-200 rounded-xl shadow-md overflow-hidden ">
        <div className="px-3 py-4 text-center text-sm text-zinc-400 ">
          No results for{" "}
          <span className="font-medium text-zinc-600">{query}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 mx-4 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden">
      <ul className="divide-y divide-zinc-100 ">
        {products.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-md bg-zinc-100 flex-shrink-0" />{" "}
            {/* thumbnail placeholder */}
            <span className="text-sm font-medium text-zinc-800">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
