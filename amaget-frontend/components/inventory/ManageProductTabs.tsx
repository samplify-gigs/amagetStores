import Link from "next/link";
import Icon from "./icons";
import ProductThumb from "./ProductThumb";
import StatusBadge from "./StatusBadge";
import { controlClass, editLink, primaryButton } from "./Ui";
import type { Product, StoreName } from "./mock";

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
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-background text-foreground/50">
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

export default function ProductsTab({ products, store }: { products: Product[]; store: StoreName }) {
  return (
    <section aria-labelledby="available-heading" className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="available-heading" className="text-xl font-semibold">Available products</h2>
          <p className="text-sm text-foreground/70">Showing {products.length} products at {store}</p>
        </div>
        <Link href="?tab=manage" className={primaryButton}>
          <Icon name="plus" className="size-5" />
          Add product
        </Link>
      </div>

      {/* Filters (visual only) */}
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-foreground/50" />
          <input type="search" aria-label="Search by product name or SKU" placeholder="Search by product name or SKU" className={`${controlClass} pl-12`} />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:w-96">
          <select aria-label="Filter by stock status" className={controlClass}>
            <option>All statuses</option>
            <option>In stock</option>
            <option>Low stock</option>
            <option>Out of stock</option>
          </select>
          <select aria-label="Filter by category" className={controlClass}>
            <option>All categories</option>
            <option>Smartphones</option>
            <option>Laptops</option>
            <option>Tablets</option>
            <option>Accessories</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Tablet and up: table (scrolls sideways if the screen is narrow) */}
          <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead className="bg-background text-foreground/70">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 text-right font-medium">Price</th>
                  <th className="px-4 py-3 text-right font-medium">Quantity</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Store</th>
                  <th className="px-4 py-3 font-medium">Added</th>
                  <th className="px-4 py-3 font-medium"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-border transition hover:bg-background/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ProductThumb category={p.category} />
                        <div className="min-w-0">
                          <p className="font-semibold">{p.name}</p>
                          <p className="text-foreground/60">SKU {p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">{naira(p.price)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{p.stock}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3">{p.store}</td>
                    <td className="px-4 py-3">
                      <p>{p.addedDate}</p>
                      <p className="text-foreground/60">{p.addedTime}</p>
                    </td>
                    <td className="px-4 py-3 text-right"><EditLink name={p.name} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: compact product cards */}
          <ul className="space-y-3 md:hidden">
            {products.map((p) => (
              <li key={p.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <ProductThumb category={p.category} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-foreground/60">SKU {p.sku}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div><dt className="text-foreground/60">Price</dt><dd className="font-semibold tabular-nums">{naira(p.price)}</dd></div>
                  <div><dt className="text-foreground/60">Quantity</dt><dd className="font-semibold tabular-nums">{p.stock}</dd></div>
                  <div><dt className="text-foreground/60">Category</dt><dd>{p.category}</dd></div>
                  <div><dt className="text-foreground/60">Added</dt><dd>{p.addedDate}, {p.addedTime}</dd></div>
                </dl>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="inline-flex items-center gap-1.5 text-sm text-foreground/70">
                    <Icon name="pin" className="size-4" />
                    {p.store}
                  </span>
                  <EditLink name={p.name} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}