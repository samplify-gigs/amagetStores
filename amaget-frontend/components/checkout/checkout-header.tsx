"use client";

import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

export function CheckoutHeader() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 border-b border-border/15 bg-secondary/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3 sm:px-6 lg:max-w-5xl lg:px-8 xl:max-w-6xl 2xl:max-w-7xl">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-card"
        >
          <IoChevronBack className="h-5 w-5" />
        </button>
        <h1 className="text-sm font-semibold text-foreground sm:text-base">
          Complete your order
        </h1>
      </div>
    </div>
  );
}
