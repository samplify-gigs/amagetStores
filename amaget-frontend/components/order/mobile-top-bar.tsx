import { IoLockClosedOutline } from "react-icons/io5";

export function MobileTotalBar({
  subtotal,
  deliveryFee,
  total,
  disabled,
  onContinue,
}: {
  subtotal: number;
  deliveryFee: number;
  total: number;
  disabled: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/15 bg-secondary px-4 py-3">
      <div className="mx-auto flex max-w-[420px] items-center gap-3">
        <div className="min-w-0">
          <p className="text-[11px] text-foreground/45">
            {deliveryFee > 0
              ? `+₦${deliveryFee.toLocaleString()} delivery`
              : "Total"}
          </p>
          <p className="text-base font-semibold text-foreground">
            ${total.toFixed(2)}
          </p>
        </div>
        <button
          onClick={onContinue}
          disabled={disabled}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-secondary transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IoLockClosedOutline className="h-4 w-4" />
          Continue
        </button>
      </div>
    </div>
  );
}
