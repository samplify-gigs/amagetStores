"use client";

import { CartItemCard } from "@/components/Cart/cartItemCard";
import { CartItemRow } from "@/components/Cart/cartitemRowDesk";
import { CartSummary } from "@/components/Cart/cartSummary";
import { cartItems } from "@/db/cart-mock";

export default function CartPage() {
  const items = cartItems;
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center mt-29">
        <p className="text-base font-medium text-foreground">
          Your cart is empty
        </p>
        <p className="mt-1 text-sm text-foreground/45">
          Items you add will show up here.
        </p>
      </main>
    );
  }

  return (
    <main className="mt-30 pb-2 sm:pb-10 sm:mt-18 md:mt-24 lg:mt-30">
      {/* Mobile (<640px) */}

      <div className="sm:hidden">
        {/**cart header */}
        <div className="px-4">
          <h1 className="text-lg font-semibold text-foreground">
            Cart{" "}
            <span className="font-normal text-foreground/45">
              ({items.length})
            </span>
          </h1>
        </div>

        {/** cart item cards */}

        <div className="mt-4 flex flex-col gap-3 px-4 mb-2">
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              {...item}
              onIncrease={() => {}}
              onDecrease={() => {}}
              onRemove={() => {}}
            />
          ))}
        </div>
      </div>
      <div className="sm:hidden">
        <CartSummary
          itemCount={items.length}
          subtotal={subtotal}
          onCheckout={() => {}}
          variant="bar"
        />
      </div>

      {/* Desktop (640px+) */}

      <div className="mx-auto hidden max-w-2xl px-6 sm:block  lg:max-w-5xl lg:px-8 xl:max-w-6xl">
        <h1 className="text-2xl font-semibold text-foreground">
          Shopping Cart{" "}
          <span className="font-normal text-foreground/45">
            ({items.length} items)
          </span>
        </h1>

        <div className="mt-6 grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-2xl border border-border/15 bg-card px-6 divide-y divide-border/15">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                {...item}
                onIncrease={() => {}}
                onDecrease={() => {}}
                onRemove={() => {}}
              />
            ))}
          </div>

          <CartSummary
            itemCount={items.length}
            subtotal={subtotal}
            onCheckout={() => {}}
            variant="card"
          />
        </div>
      </div>
    </main>
  );
}
