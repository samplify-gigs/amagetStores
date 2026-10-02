import { ShippingDetails } from "@/app/(orders,payments)/checkout/page";
import { Field } from "./field";
import { inputClass } from "./field";

export function ShippingForm({
  details,
  onChange,
}: {
  details: ShippingDetails;
  onChange: (
    field: keyof ShippingDetails,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" span="sm:col-span-2">
          <input
            value={details.fullName}
            onChange={onChange("fullName")}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            value={details.email}
            onChange={onChange("email")}
            placeholder="jane@email.com"
            className={inputClass}
          />
        </Field>

        <Field label="Phone number">
          <input
            type="tel"
            value={details.phone}
            onChange={onChange("phone")}
            placeholder="080 000 0000"
            className={inputClass}
          />
        </Field>

        {/*<Field label="Address line 1" span="sm:col-span-2">
          <input
            value={details.addressLine1}
            onChange={onChange("addressLine1")}
            placeholder="Street address"
            className={inputClass}
          />
        </Field>

        <Field label="Address line 2 (optional)" span="sm:col-span-2">
          <input
            value={details.addressLine2}
            onChange={onChange("addressLine2")}
            placeholder="Apartment, suite, unit"
            className={inputClass}
          />
        </Field>

        <Field label="City">
          <input
            value={details.city}
            onChange={onChange("city")}
            className={inputClass}
          />
        </Field>

        <Field label="State">
          <input
            value={details.state}
            onChange={onChange("state")}
            className={inputClass}
          />
        </Field>

        <Field label="Postal code">
          <input
            value={details.postalCode}
            onChange={onChange("postalCode")}
            className={inputClass}
          />
        </Field>

        <Field label="Country">
          <input
            value={details.country}
            onChange={onChange("country")}
            placeholder="Nigeria"
            className={inputClass}
          />
        </Field>

        <Field label="Delivery notes (optional)" span="sm:col-span-2">
          <textarea
            value={details.notes}
            onChange={onChange("notes")}
            rows={3}
            placeholder="Gate code, landmark, preferred drop-off time..."
            className={`${inputClass} resize-none`}
          />
        </Field>
        */}
      </div>
    </div>
  );
}
