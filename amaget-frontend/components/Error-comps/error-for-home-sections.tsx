import { Loader2 } from "lucide-react";


export function SectionErrorOverlay({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <Loader2 className="w-5 h-5 text-gray-400" />
        <p className="text-[13px] text-gray-600 font-medium">
          Couldn&apos;t load this section
        </p>
        <button
          onClick={onRetry}
          className="text-[12px] font-semibold text-white bg-[#fc0056] px-4 py-1.5 rounded-full hover:bg-[#e0004a] transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
