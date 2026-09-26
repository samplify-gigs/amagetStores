"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // send to your error reporting (Sentry, etc.) here
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] lg:min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-sm">
        <div className="w-14 h-14 rounded-full bg-[color:var(--primary)]/10 flex items-center justify-center mb-4">
          <AlertTriangle size={28} style={{ color: "var(--primary)" }} />
        </div>

        <h1 className="text-lg font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-400 mt-1.5">
          An unexpected error occurred. You can try again, or head back home.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-3 max-w-xs truncate rounded-md bg-gray-50 px-3 py-1.5 text-xs text-gray-400">
            {error.message}
          </p>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <RefreshCw size={15} />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 border border-gray-200 transition-colors hover:bg-gray-50"
          >
            Go home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-4 text-[11px] text-gray-300">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
