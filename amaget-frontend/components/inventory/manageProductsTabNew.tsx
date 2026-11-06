import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./icons";
import ProductThumb from "./ProductThumb";
import { statusMeta } from "./StatusBadge";
import { controlClass, primaryButton, secondaryButton, textareaClass } from "./UiForInventory";
import type { Product, StockStatus, StoreName } from "./mock";

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <h2 className="border-b border-border px-5 py-4 text-base font-semibold">{title}</h2>
      <div className="grid gap-5 p-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, htmlFor, hint, className = "", children }: { label: string; htmlFor: string; hint?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-sm text-foreground/60">{hint}</p>}
    </div>
  );
}

// Save and Cancel. Shown at the top on larger screens, at the bottom on phones.
function Actions({ className }: { className: string }) {
  return (
    <div className={`flex-col-reverse gap-3 sm:flex-row ${className}`}>
      <Link href="?tab=available" className={secondaryButton}>Cancel</Link>
      <button type="button" className={primaryButton}>Save product</button>
    </div>
  );
}

const stores: StoreName[] = ["Ikeja", "Lekki", "Abuja"];
const categories = ["Smartphones", "Laptops", "Tablets", "Accessories"];

/** Add mode when no product is passed, Edit mode when one is. */
export default function ManageProductTab({ store, product }: { store: StoreName; product?: Product }) {
  const isEdit = Boolean(product);
  const defaultStatus: StockStatus = product?.status ?? "in-stock";

  return (
    <section aria-labelledby="manage-heading" className="space-y-6">
      <div>
        <Link href="?tab=available" className="inline-flex items-center gap-1 text-sm text-foreground/70 transition hover:text-foreground">
          <Icon name="left" className="size-4" />
          Available products
        </Link>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 id="manage-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">{isEdit ? "Edit product" : "Add product"}</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold">
                <Icon name={isEdit ? "pencil" : "plus"} className="size-4 text-primary" />
                {isEdit ? "Editing" : "New product"}
              </span>
            </div>
            <p className="mt-1 text-foreground/70">
              {isEdit ? `Changing details for ${product?.name}.` : "Fill in the details to add a product to this store."}
            </p>
          </div>
          <Actions className="hidden sm:flex" />
        </div>
      </div>

      <form className="grid gap-6 lg:grid-cols-3" noValidate>
        <div className="space-y-6 lg:col-span-2">
          <Card title="Product information">
            <Field label="Product name" htmlFor="name" className="sm:col-span-2">
              <input id="name" name="name" defaultValue={product?.name} placeholder="e.g. iPhone 15 Pro 256GB" className={controlClass} />
            </Field>
            <Field label="Product ID or SKU" htmlFor="sku" hint="The code on the box or shelf label.">
              <input id="sku" name="sku" defaultValue={product?.sku} placeholder="e.g. PH-IP15P-256" className={controlClass} />
            </Field>
            <Field label="Brand" htmlFor="brand">
              <input id="brand" name="brand" defaultValue={product?.brand} placeholder="e.g. Apple" className={controlClass} />
            </Field>
            <Field label="Category" htmlFor="category" className="sm:col-span-2">
              <select id="category" name="category" defaultValue={product?.category ?? ""} className={controlClass}>
                <option value="" disabled>Select a category</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Description" htmlFor="description" className="sm:col-span-2">
              <textarea id="description" name="description" rows={4} defaultValue={product?.description} placeholder="Key details a customer or colleague should know" className={textareaClass} />
            </Field>
          </Card>

          <Card title="Pricing and inventory">
            <Field label="Selling price" htmlFor="price">
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-foreground/60">₦</span>
                <input id="price" name="price" inputMode="numeric" defaultValue={product?.price} placeholder="0" className={`${controlClass} pl-8`} />
              </div>
            </Field>
            <Field label="Regular price (optional)" htmlFor="regularPrice" hint="The price before any discount.">
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-foreground/60">₦</span>
                <input id="regularPrice" name="regularPrice" inputMode="numeric" defaultValue={product?.regularPrice} placeholder="0" className={`${controlClass} pl-8`} />
              </div>
            </Field>
            <Field label="Stock quantity" htmlFor="stock">
              <input id="stock" name="stock" type="number" min={0} defaultValue={product?.stock} placeholder="0" className={controlClass} />
            </Field>
            <Field label="Store location" htmlFor="store">
              <select id="store" name="store" defaultValue={product?.store ?? store} className={controlClass}>
                {stores.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <p id="status-label" className="mb-2 text-sm font-medium">Stock status</p>
              <div role="radiogroup" aria-labelledby="status-label" className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(statusMeta) as StockStatus[]).map((key) => (
                  <label key={key} className="cursor-pointer">
                    <input type="radio" name="status" value={key} defaultChecked={key === defaultStatus} className="peer sr-only" />
                    <span className="flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-3.5 text-sm font-medium transition peer-checked:border-primary peer-checked:bg-primary/10 peer-focus-visible:ring-4 peer-focus-visible:ring-primary/20">
                      <span className={`size-2.5 rounded-full ${statusMeta[key].dot}`} />
                      {statusMeta[key].label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Product image">
            <Field label="Image URL" htmlFor="imageUrl" className="sm:col-span-2 lg:col-span-2">
              <input id="imageUrl" name="imageUrl" type="url" placeholder="https://" className={controlClass} />
            </Field>
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-medium">Preview</p>
              {product ? (
                <ProductThumb category={product.category} className="aspect-square w-full max-w-48" />
              ) : (
                <div className="grid aspect-square w-full max-w-48 place-items-center rounded-lg border border-dashed border-border bg-background text-center text-sm text-foreground/60">
                  <div>
                    <Icon name="image" className="mx-auto size-8" />
                    <p className="mt-2">No image yet</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card title="Automatic details">
            <dl className="divide-y divide-border text-sm sm:col-span-2">
              {isEdit && product ? (
                <>
                  <div className="flex justify-between gap-4 pb-3"><dt className="text-foreground/60">Date added</dt><dd className="font-medium">{product.addedDate}</dd></div>
                  <div className="flex justify-between gap-4 py-3"><dt className="text-foreground/60">Time added</dt><dd className="font-medium">{product.addedTime}</dd></div>
                  <div className="flex justify-between gap-4 pt-3"><dt className="text-foreground/60">Last updated</dt><dd className="font-medium">{product.updatedAt}</dd></div>
                </>
              ) : (
                <p className="text-foreground/70">The date and time are added automatically when you save.</p>
              )}
            </dl>
          </Card>
        </div>

        <Actions className="flex sm:hidden lg:col-span-3" />
      </form>
    </section>
  );
}