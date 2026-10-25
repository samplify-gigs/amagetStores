"use client";

import { useState, type ComponentProps } from "react";
import TextField from "./textfield";
import { EyeIcon, EyeOffIcon } from "./icons";

type PasswordFieldProps = Omit<
  ComponentProps<typeof TextField>,
  "type" | "trailing"
>;

export default function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="grid size-10 place-items-center rounded-lg text-foreground/60 transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
        >
          {visible ? (
            <EyeOffIcon className="size-5" />
          ) : (
            <EyeIcon className="size-5" />
          )}
        </button>
      }
    />
  );
}
