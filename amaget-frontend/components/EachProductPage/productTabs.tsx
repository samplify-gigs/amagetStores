"use client";

import { useState } from "react";
import { IoChatbubbleOutline, IoDocumentTextOutline } from "react-icons/io5";

type TabKey = "description" | "reviews";
type TabVariant = "pill" | "underline";

interface ProductTabsProps {
  description: React.ReactNode;
  reviews: React.ReactNode;
  reviewCount?: number;
  variant?: TabVariant;
}

export function ProductTabs({
  description,
  reviews,
  reviewCount,
  variant = "pill",
}: ProductTabsProps) {
  const [active, setActive] = useState<TabKey>("description");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "description", label: "Description", icon: <IoDocumentTextOutline className="h-4 w-4" /> },
    {
      key: "reviews",
      label: typeof reviewCount === "number" ? `Reviews (${reviewCount})` : "Reviews",
      icon: <IoChatbubbleOutline className="h-4 w-4" />,
    },
  ];

  return (
    <div className="pt-6">
      <div className={variant === "underline" ? "flex items-center gap-8 border-b border-gray-100" : "flex items-center gap-2"}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={
              variant === "underline"
                ? `flex cursor-pointer items-center gap-2 border-b-2 pb-4 text-sm font-semibold transition-colors ${
                    active === tab.key ? "border-primary text-primary" : "border-transparent text-gray-400"
                  }`
                : `cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    active === tab.key ? "bg-primary text-secondary" : "text-gray-400"
                  }`
            }
          >
            {variant === "underline" && tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid pt-4">
        <div
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            active === "description" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {description}
        </div>
        <div
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            active === "reviews" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {reviews}
        </div>
      </div>
    </div>
  );
}