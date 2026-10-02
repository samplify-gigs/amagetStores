"use client";

import { MobileTotalBar } from "@/components/checkout/mobile-totalbar";
import { OrderSummaryList } from "@/components/checkout/ordersummary";
import { PaymentMethodPicker } from "@/components/checkout/payment-method";
import { ShippingForm } from "@/components/checkout/shippingForm";
import { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";

export interface CheckoutItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const mockCheckoutItems: CheckoutItem[] = [
  {
    id: "21949",
    name: "Samsung Galaxy Note 9 128gb, London Used",
    image:
      "https://res.cloudinary.com/dawdn2m0d/image/upload/v1786552064/21949-Samsung_Galaxy_Note_9_128gb_London_Used-1_ywake6.jpg",
    price: 147.0,
    quantity: 2,
  },
  {
    id: "18332",
    name: "Anker PowerCore 10000 Portable Charger",
    image:
      "https://res.cloudinary.com/dawdn2m0d/image/upload/v1786552064/anker-powercore-placeholder.jpg",
    price: 22.5,
    quantity: 1,
  },
];

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes: string;
}

export type PaymentMethod = "card" | "delivery" | "samplify_pay";

const initialDetails: ShippingDetails = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  notes: "",
};

const DELIVERY_FEE = 3.5;

export default function CheckoutPage() {
  const items = mockCheckoutItems;
  const [details, setDetails] = useState<ShippingDetails>(initialDetails);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  const handleChange =
    (field: keyof ShippingDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDetails((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handlePlaceOrder = () => {
    // Backend handles validation + payment — this just hands off the payload.
    console.log("place order", { items, details, paymentMethod, total });
  };

  return (
    <main className="h-full">
      {/* Mobile (<640px) */}
      <div className="sm:hidden ">
        {/** checkout header */}
        <div className="px-4 pt-2">
          <h1 className="text-lg font-semibold text-foreground">
            Checkout{" "}
            <span className="font-normal text-foreground/45">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </h1>
        </div>

        <OrderSummaryList items={items} className="mt-4 px-4" />

        <div className="mt-6 px-4">
          <ShippingForm details={details} onChange={handleChange} />
        </div>
        {/*
        <div className="mt-6 px-4">
          <PaymentMethodPicker value={paymentMethod} onChange={setPaymentMethod} />
        </div>*/}

        <MobileTotalBar total={total} onPlaceOrder={handlePlaceOrder} />
        
      </div>

      {/* sm and up */}
      <div className="mx-auto hidden max-w-2xl px-6 sm:block lg:max-w-5xl lg:px-8 xl:max-w-6xl 2xl:max-w-7xl">
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          Checkout{" "}
          <span className="font-normal text-foreground/45">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </h1>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-12 mb-2">
          <div className="min-w-0 space-y-8">
            <section className="rounded-2xl border border-border/15 bg-card p-6 lg:p-8">
              <h2 className="text-sm font-semibold text-foreground">
                Shipping details
              </h2>
              <div className="mt-5">
                <ShippingForm details={details} onChange={handleChange} />
              </div>
            </section>

            {/*<section className="rounded-2xl border border-border/15 bg-card p-6 lg:p-8">
              <h2 className="text-sm font-semibold text-foreground">
                Payment method
              </h2>
              <div className="mt-5">
                <PaymentMethodPicker
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />
              </div>
            </section>*/}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start mb-2">
            <div className="rounded-2xl border border-border/15 bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground">
                Order summary
              </h2>
              <OrderSummaryList items={items} className="mt-4" compact />

              <div className="mt-5 space-y-2 border-t border-border/15 pt-4 text-sm">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Delivery</span>
                  <span>${DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-secondary transition-transform active:scale-[0.98]"
              >
                <IoLockClosedOutline className="h-4 w-4" />
                Place order
              </button>
              <p className="mt-3 text-center text-xs text-foreground/40">
                You won&apos;t be charged until your order is confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
