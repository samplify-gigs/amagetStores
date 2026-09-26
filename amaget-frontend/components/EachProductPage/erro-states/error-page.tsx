import { IoAlertCircleOutline } from "react-icons/io5";

export function ProductPageError({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-gray-50 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <IoAlertCircleOutline className="h-7 w-7 text-red-500" />
      </div>
      <div>
        <p className="text-base font-semibold text-gray-900">
          Failed to load product
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Something went wrong while loading this page.
        </p>
      </div>
      <button
        onClick={onRetry}
        className="cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-secondary transition-opacity active:opacity-80"
      >
        Try again
      </button>
    </main>
  );
}
