import React from "react";

import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] lg:min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-sm">
        <div className="w-14 h-14 rounded-full bg-[color:var(--primary)]/10 flex items-center justify-center mb-4">
          <SearchX size={28} style={{ color: "var(--primary)" }} />
        </div>

        <h1 className="text-lg font-bold text-gray-900">
          404 Page not found
        </h1>
        <p className="text-sm text-gray-400 mt-1.5">
          This page can&apos;t be found.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}