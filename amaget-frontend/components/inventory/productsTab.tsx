import Link from "next/link";
import Icon from "./icons";
import ProductThumb from "./ProductThumb";
import StatCards from "./statcards";
import StatusBadge from "./StatusBadge";
import { controlClass, editLink, primaryButton, secondaryButton } from "./Ui";
import type { Product, StoreName, mockStats } from "./mock";

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

function EditLink({ name }: { name: string }) {
  return (
    <Link href="?tab=manage&mode=edit" aria-label={`Edit ${name}`} className={editLink}>
      <Icon name="pencil" className="size-4" />
      Edit
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-xl bg-background text-foreground/50">
        <Icon name="package" className="size-7" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">No products yet</h3>
      <p className="mt-1 max-w-sm text-sm text-foreground/70">Add your first product to start tracking stock for this store.</p>
      <Link href="?tab=manage" className={`${primaryButton} mt-6`}>
        <Icon name="plus" className="size-5" />
        Add product
      </Link>
    </div>
  );
}

const pageButton = "grid size-10 place-items-center rounded-lg border border-border text-sm font-medium transition hover:bg-background focus-visible:outline-2 focus-visible:outline-primary";

export default function ProductsTab({ products, store, stats }: { products: Product[]; store: StoreName; stats: typeof mockStats }) {
  return (
    <section aria-labelledby="available-heading" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 id="available-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Available products</h1>
          <p className="mt-1 text-foreground/70">Stock and prices for the {store} store.</p>
        </div>
        <Link href="?tab=manage" className={primaryButton}>
          <Icon name="plus" className="size-5" />
          Add product
        </Link>
      </div>

      <StatCards stats={stats} />

      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Filters (visual only) */}
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Icon name="search" className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-foreground/50" />
            <input type="search" aria-label="Search by product name or SKU" placeholder="Search by product name or SKU" className={`${controlClass} pl-11`} />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:flex">
            <div className="lg:w-44">
              <select aria-label="Filter by stock status" className={controlClass}>
                <option>All statuses</option>
                <option>In stock</option>
                <option>Low stock</option>
                <option>Out of stock</option>
              </select>
            </div>
            <div className="lg:w-44">
              <select aria-label="Filter by category" className={controlClass}>
                <option>All categories</option>
                <option>Smartphones</option>
                <option>Laptops</option>
                <option>Tablets</option>
                <option>Accessories</option>
              </select>
            </div>
            <button type="button" className={`${secondaryButton} col-span-2 lg:col-span-1`}>Clear</button>
          </div>
        </div>

        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Large screens: table (scrolls sideways if space is tight) */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[52rem] text-left text-sm">
                <thead className="bg-background text-xs text-foreground/70">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Store</th>
                    <th className="px-4 py-3 text-right font-medium">Price</th>
                    <th className="px-4 py-3 text-right font-medium">Quantity</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Added</th>
                    <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-border transition hover:bg-background/60">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <ProductThumb category={p.category} className="size-10" />
                          <div className="min-w-0">
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-xs text-foreground/60">SKU {p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{p.category}</td>
                      <td className="px-4 py-3">{p.store}</td>
                      <td className="px-4 py-3 text-right font-semibold tabular-nums">{naira(p.price)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{p.stock}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3">
                        <p>{p.addedDate}</p>
                        <p className="text-xs text-foreground/60">{p.addedTime}</p>
                      </td>
                      <td className="px-4 py-3 text-right"><EditLink name={p.name} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phones and tablets: compact list */}
            <ul className="divide-y divide-border lg:hidden">
              {products.map((p) => (
                <li key={p.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <ProductThumb category={p.category} />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-foreground/60">SKU {p.sku}</p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
                    <div><dt className="text-foreground/60">Price</dt><dd className="font-semibold tabular-nums">{naira(p.price)}</dd></div>
                    <div><dt className="text-foreground/60">Quantity</dt><dd className="font-semibold tabular-nums">{p.stock}</dd></div>
                    <div><dt className="text-foreground/60">Category</dt><dd>{p.category}</dd></div>
                    <div><dt className="text-foreground/60">Added</dt><dd>{p.addedDate}, {p.addedTime}</dd></div>
                  </dl>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm text-foreground/70">
                      <Icon name="pin" className="size-4" />
                      {p.store}
                    </span>
                    <EditLink name={p.name} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination (visual only) */}
            <div className="flex flex-col gap-3 border-t border-border p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-foreground/70">Showing 1–{products.length} of {stats.total} products</p>
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Previous page" className={pageButton}><Icon name="left" className="size-4" /></button>
                <button type="button" aria-current="page" className={`${pageButton} border-primary bg-primary text-white dark:text-gray-900`}>1</button>
                <button type="button" className={pageButton}>2</button>
                <button type="button" className={pageButton}>3</button>
                <button type="button" aria-label="Next page" className={pageButton}><Icon name="right" className="size-4" /></button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}