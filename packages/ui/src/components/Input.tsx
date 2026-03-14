"use client";

import { InputHTMLAttributes, forwardRef, useId } from "react";
import "./Input.css";

// Sourced from Figma "Input" component set (node 1287:10540)
// State property: Default | Focused | Error | Disabled
// States are driven by: :focus (CSS), aria-invalid (error), disabled (native)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Rendered as <label> above the field — 12px Medium */
  label?: string;
  /** Shown below the field in muted colour (hidden when error is present) */
  helperText?: string;
  /** Triggers error state: red border + label + message below field */
  error?: string;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, helperText, error, id: externalId, className = "", ...props },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hasError = Boolean(error);

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={id} className="input-label">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={["input-field", className].filter(Boolean).join(" ")}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={
            error
              ? `${id}-error`
              : helperText
                ? `${id}-helper`
                : undefined
          }
          {...props}
        />

        {error && (
          <span id={`${id}-error`} className="input-error" role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={`${id}-helper`} className="input-helper">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
