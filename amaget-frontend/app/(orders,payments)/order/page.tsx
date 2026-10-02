"use client";

import { DeliveryStep } from "@/components/order/delivery-step";
import { LocationStep } from "@/components/order/location-step";
import { MobileTotalBar } from "@/components/order/mobile-top-bar";
import { PaymentStep } from "@/components/order/psyment-step";
import { TopBar } from "@/components/order/topbar";
import {
  DeliveryOptionId,
  FAST_STATE_CODES,
  fastDeliveryOptions,
  LocationRow,
  mockOrderItems,
  PaymentMethodId,
  standardDeliveryOptions,
  StateRow,
} from "@/db/order-mock";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoLockClosedOutline, IoAlertCircleOutline } from "react-icons/io5";

type FetchStatus = "loading" | "error" | "success";

export default function DeliveryPaymentPage() {
  const router = useRouter();
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [state, setState] = useState<StateRow[]>([]);
  const [locationItems, setLocation] = useState<LocationRow[]>([]);

  const [stateId, setStateId] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOptionId | null>(
    null,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId | null>(
    null,
  );
  const BaseUrl = process.env.NEXT_PUBLIC_BASEURL;

  const fetchDeliveryItems = useCallback(async () => {
    setStatus("loading");
    try {
      const result = await fetch(`${BaseUrl}/orders-delivery`);
      if (!result.ok) throw new Error(`Request failed with ${result.status}`);

      const res = await result.json();
      setState(res.state);
      setLocation(res.location);
      setStatus("success");
    } catch (err) {
      console.error("failed to fetch location and state:", err);
      setStatus("error");
    }
  }, [BaseUrl]);

  useEffect(() => {
    fetchDeliveryItems();
  }, [fetchDeliveryItems]);

  const selectedState = state.find((s) => String(s.id) === stateId) ?? null;
  const locationsForState = locationItems.filter(
    (l) => String(l.state_id) === stateId,
  );
  const selectedLocation =
    locationItems.find((l) => String(l.id) === locationId) ?? null;

  const isFastState = selectedState
    ? FAST_STATE_CODES.includes(selectedState.code)
    : false;
  const deliveryOptions = isFastState
    ? fastDeliveryOptions
    : standardDeliveryOptions;
  const selectedDelivery =
    deliveryOptions.find((d) => d.id === deliveryOption) ?? null;
  const needsPayment = selectedDelivery ? selectedDelivery.id !== "pod" : false;

  const subtotal = useMemo(
    () => mockOrderItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [],
  );
  const deliveryFee = selectedDelivery?.fee ?? 0;
  const total = subtotal + deliveryFee;

  const canContinue =
    !!selectedLocation &&
    !!selectedDelivery &&
    (!needsPayment || !!paymentMethod);

  const handleStateChange = (id: string) => {
    setStateId(id);
    setLocationId(null);
    setDeliveryOption(null);
    setPaymentMethod(null);
  };

  const handleLocationChange = (id: string) => {
    setLocationId(id);
    setDeliveryOption(null);
    setPaymentMethod(null);
  };

  const handleDeliveryChange = (id: DeliveryOptionId) => {
    setDeliveryOption(id);
    setPaymentMethod(null);
  };

  const handleContinue = () => {
    if (!canContinue) return;
    // TODO: point at your real payment-verification route
    console.log("continue to payment verification", {
      location: selectedLocation,
      delivery: selectedDelivery,
      paymentMethod,
      total,
    });
    router.push("/payment-verification");
  };

  const stepsComplete = [
    !!selectedLocation,
    !!selectedDelivery,
    !needsPayment || !!paymentMethod,
  ];

  // ---------- Loading ----------
  if (status === "loading") {
    return (
      <main className="min-h-screen bg-background">
        <TopBar
          onBack={() => router.back()}
          stepsComplete={[false, false, false]}
        />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-border/20 border-t-primary" />
          <p className="text-sm text-foreground/45">
            Loading delivery options…
          </p>
        </div>
      </main>
    );
  }

  // ---------- Error ----------
  if (status === "error") {
    return (
      <main className="min-h-screen bg-background">
        <TopBar
          onBack={() => router.back()}
          stepsComplete={[false, false, false]}
        />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
          <IoAlertCircleOutline className="h-8 w-8 text-foreground/30" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Couldn&apos;t load delivery options
            </p>
            <p className="mt-1 text-sm text-foreground/45">
              Check your connection and try again.
            </p>
          </div>
          <button
            onClick={fetchDeliveryItems}
            className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-secondary transition-transform active:scale-[0.98]"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  // ---------- Success ----------
  return (
    <main className="min-h-screen bg-background pb-32 sm:pb-16">
      <TopBar onBack={() => router.back()} stepsComplete={stepsComplete} />

      {/* Mobile (<640px) */}
      <div className="sm:hidden">
        <div className="px-4 pt-5">
          <h1 className="text-lg font-semibold text-foreground">
            Delivery &amp; payment
          </h1>
          <p className="mt-1 text-sm text-foreground/45">
            Choose where and how you&apos;d like your order delivered.
          </p>
        </div>

        <div className="mt-5 px-4">
          <LocationStep
            states={state}
            locations={locationsForState}
            stateId={stateId}
            locationId={locationId}
            onStateChange={handleStateChange}
            onLocationChange={handleLocationChange}
          />
        </div>

        {selectedLocation && (
          <div className="mt-6 px-4">
            <DeliveryStep
              options={deliveryOptions}
              selected={deliveryOption}
              onSelect={handleDeliveryChange}
            />
          </div>
        )}

        {selectedDelivery && (
          <div className="mt-6 px-4">
            <PaymentStep
              needsPayment={needsPayment}
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
          </div>
        )}

        <MobileTotalBar
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          disabled={!canContinue}
          onContinue={handleContinue}
        />
      </div>

      {/* sm and up */}
      <div className="mx-auto hidden max-w-2xl px-6 sm:block lg:max-w-5xl lg:px-8 xl:max-w-6xl 2xl:max-w-7xl">
        <div className="pt-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Delivery &amp; payment
          </h1>
          <p className="mt-1 text-sm text-foreground/45">
            Choose where and how you&apos;d like your order delivered.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-12">
          <div className="min-w-0 space-y-6">
            <section className="rounded-2xl border border-border/15 bg-card p-6 lg:p-8">
              <h2 className="text-sm font-semibold text-foreground">
                Delivery location
              </h2>
              <div className="mt-5">
                <LocationStep
                  states={state}
                  locations={locationsForState}
                  stateId={stateId}
                  locationId={locationId}
                  onStateChange={handleStateChange}
                  onLocationChange={handleLocationChange}
                />
              </div>
            </section>

            <section
              className={`rounded-2xl border border-border/15 bg-card p-6 transition-opacity lg:p-8 ${
                selectedLocation ? "" : "pointer-events-none opacity-40"
              }`}
            >
              <h2 className="text-sm font-semibold text-foreground">
                Delivery method
              </h2>
              <div className="mt-5">
                <DeliveryStep
                  options={deliveryOptions}
                  selected={deliveryOption}
                  onSelect={handleDeliveryChange}
                />
              </div>
            </section>

            <section
              className={`rounded-2xl border border-border/15 bg-card p-6 transition-opacity lg:p-8 ${
                selectedDelivery ? "" : "pointer-events-none opacity-40"
              }`}
            >
              <h2 className="text-sm font-semibold text-foreground">
                Payment method
              </h2>
              <div className="mt-5">
                <PaymentStep
                  needsPayment={needsPayment}
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                />
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-border/15 bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground">
                Order summary
              </h2>

              <div className="mt-4 space-y-2 text-sm">
                {mockOrderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 text-foreground/60"
                  >
                    <span className="line-clamp-1">
                      {item.name}{" "}
                      <span className="text-foreground/40">
                        ×{item.quantity}
                      </span>
                    </span>
                    <span className="flex-shrink-0 text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-border/15 pt-4 text-sm">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Delivery</span>
                  <span>
                    {selectedDelivery
                      ? `₦${deliveryFee.toLocaleString()}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-secondary transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IoLockClosedOutline className="h-4 w-4" />
                Continue to payment
              </button>
              {!canContinue && (
                <p className="mt-3 text-center text-xs text-foreground/40">
                  {!selectedLocation
                    ? "Pick a delivery location to continue."
                    : !selectedDelivery
                      ? "Choose a delivery method to continue."
                      : "Choose a payment method to continue."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
