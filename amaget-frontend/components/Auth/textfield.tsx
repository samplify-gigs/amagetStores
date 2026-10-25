import type { ComponentProps, ReactNode } from "react";

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  name: string;
  /** Optional element pinned to the right inside the input (e.g. show/hide button). */
  trailing?: ReactNode;
};

export default function TextField({ label, name, trailing, className = "", ...props }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          {...props}
          className={`h-12 w-full rounded-xl  bg-background px-4 text-base text-foreground outline-hidden transition placeholder:text-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            trailing ? "pr-12" : ""
          } ${className}`}
        />
        {trailing && <div className="absolute inset-y-0 right-1 flex items-center">{trailing}</div>}
      </div>
    </div>
  );
}