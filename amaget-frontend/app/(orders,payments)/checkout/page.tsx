"use client";

import { useCart } from "@/components-utils/cart/items-to-cart";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { MobileTotalBar } from "@/components/checkout/mobile-totalbar";
import { OrderSummaryList } from "@/components/checkout/ordersummary";
import { ShippingForm } from "@/components/checkout/shippingForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoLockClosedOutline } from "react-icons/io5";

export type CartItems = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartProps = {
  totalItemPrice: number;
  productData: CartItems[];
};

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
  const { cart } = useCart();
  const [details, setDetails] = useState<ShippingDetails>(initialDetails);
  const [cartDetails, setCartDetails] = useState<CartProps>({
    totalItemPrice: 0,
    productData: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const urlHome = process.env.NEXT_PUBLIC_BASEURL;

  const userId = 12345;
  const orderNo = "12345";

  useEffect(() => {
    if (!cart.length) return;
    const controller = new AbortController();

    async function getCart() {
      try {
        const res = await fetch(`${urlHome}/cart-items/insert-into-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            items: cart.map((item) => ({
              productId: Number(item.id),
              quantity: Number(item.quantity),
            })),
          }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCartDetails({
          totalItemPrice: data.totalItemPrice ?? 0,
          productData: (data.productData ?? []).filter(Boolean),
        });
        console.log("data received:", data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("failed to send to cart:", err);
        }
      }
    }

    getCart();

    return () => controller.abort();
  }, [cart, urlHome]);

  const handleChange =
    (field: keyof ShippingDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDetails((prev) => ({ ...prev, [field]: e.target.value }));
    };

  console.log("cart items received:", cartDetails);

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${urlHome}/checkout/checkout-validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: details.fullName,
          email: details.email,
          phoneNo: details.phone,
          orderNumber: orderNo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? `HTTP ${res.status}`);
      }

      console.log("order data:", data);
      router.push("/order");
    } catch (err) {
      console.error("failed to add to order", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <CheckoutHeader />

      {/* Mobile (<640px) */}
      <div className="flex-1 sm:hidden">
        {/** checkout header */}
        <div className="px-4 pt-4">
          <h2 className="text-lg font-semibold text-foreground">
            Checkout{" "}
            <span className="font-normal text-foreground/45">
              {cartDetails.productData.length}{" "}
              {cartDetails.productData.length === 1 ? "item" : "items"}
            </span>
          </h2>
        </div>

        <OrderSummaryList
          items={cartDetails?.productData}
          className="mt-4 px-4"
        />

        <div className="mt-6 px-4">
          <ShippingForm details={details} onChange={handleChange} />
        </div>

        <MobileTotalBar
          total={cartDetails.totalItemPrice}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>

      {/* sm and up */}
      <div className="mx-auto hidden w-full max-w-2xl flex-1 px-6 sm:block lg:max-w-5xl lg:px-8 xl:max-w-6xl 2xl:max-w-7xl">
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Checkout{" "}
          <span className="font-normal text-foreground/45">
            {cartDetails.productData.length}{" "}
            {cartDetails.productData.length === 1 ? "item" : "items"}
          </span>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-12 mb-2">
          <div className="min-w-0 space-y-8">
            <section className="rounded-2xl border border-border/15 bg-card p-6 lg:p-8">
              <h3 className="text-sm font-semibold text-foreground">
                Shipping details
              </h3>
              <div className="mt-5">
                <ShippingForm details={details} onChange={handleChange} />
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start mb-2">
            <div className="rounded-2xl border border-border/15 bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">
                Order summary
              </h3>
              <OrderSummaryList
                items={cartDetails.productData}
                className="mt-4"
                compact
              />

              <div className="mt-5 space-y-2 border-t border-border/15 pt-4 text-sm">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>₦{cartDetails.totalItemPrice.toLocaleString()}</span>
                </div>
                {/*<div className="flex justify-between text-foreground/60">
                  <span>Delivery</span>
                  <span></span>
                </div>*/}
                <div className="flex justify-between pt-2 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>${cartDetails.totalItemPrice.toLocaleString()}</span>
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
    </div>
  );
}
