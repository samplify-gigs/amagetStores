import { LocationRow, StateRow } from "@/db/order-mock";
import { IoLocationOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LocationStep({
  states,
  locations,
  stateId,
  locationId,
  onStateChange,
  onLocationChange,
}: {
  states: StateRow[];
  locations: LocationRow[];
  stateId: string | null;
  locationId: string | null;
  onStateChange: (id: string) => void;
  onLocationChange: (id: string) => void;
}) {
  const selectedLocation = locations.find((l) => String(l.id) === locationId);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <span className="mb-1.5 block text-xs font-medium text-foreground/60">
            State
          </span>
          <Select
            value={stateId ?? ""}
            onValueChange={(value) => value && onStateChange(value)}
          >
            <SelectTrigger className="w-full min-w-0 rounded-xl border-border/20 bg-secondary px-3.5 py-2.5 text-sm text-foreground focus:border-primary">
              <SelectValue className="truncate" placeholder="Select state">
                {(value: string) =>
                  states.find((s) => String(s.id) === value)?.name
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 rounded-xl border border-border/15 bg-card shadow-lg">
              {states.map((s) => (
                <SelectItem
                  key={s.id}
                  value={String(s.id)}
                  className="cursor-pointer rounded-lg text-sm text-foreground data-[highlighted]:bg-secondary data-[highlighted]:text-foreground"
                >
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0">
          <span className="mb-1.5 block text-xs font-medium text-foreground/60">
            Delivery area
          </span>
          <Select
            value={locationId ?? ""}
            onValueChange={(value) => value && onLocationChange(value)}
            disabled={!stateId}
          >
            <SelectTrigger className="w-full min-w-0 rounded-xl border-border/20 bg-secondary px-3.5 py-2.5 text-sm text-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue
                className="truncate"
                placeholder={stateId ? "Select area" : "Select a state first"}
              >
                {(value: string) =>
                  locations.find((l) => String(l.id) === value)?.name
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 rounded-xl border border-border/15 bg-card shadow-lg">
              {locations.map((l) => (
                <SelectItem
                  key={l.id}
                  value={String(l.id)}
                  className="cursor-pointer rounded-lg text-sm text-foreground data-[highlighted]:bg-secondary data-[highlighted]:text-foreground"
                >
                  {l.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedLocation && (
        <div className="flex items-start gap-2.5 rounded-xl bg-secondary px-3.5 py-3">
          <IoLocationOutline className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/40" />
          <p className="text-sm text-foreground/60">{selectedLocation.address}</p>
        </div>
      )}
    </div>
  );
}