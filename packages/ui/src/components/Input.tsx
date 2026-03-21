"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useId } from "react";
import "./Input.css";

// Figma: "Input" component set (node 1287:10540)
// States: Default | Focused | Error | Disabled | Multiline | Text area focused | Text area filled
// cornerRadius:16, Label:14px/600, Input:16px/400

interface InputBaseProps {
  label?: string;
  helperText?: string;
  error?: string;
  /** Renders a <textarea> instead of <input> (maps to Figma Multiline state) */
  multiline?: boolean;
}

export interface InputProps
  extends InputBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  multiline?: false;
  id?: string;
}

export interface TextareaProps
  extends InputBaseProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  multiline: true;
  id?: string;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps | TextareaProps
>((props, ref) => {
  const { label, helperText, error, multiline = false, id: externalId, className = "", ...rest } = props;

  const generatedId = useId();
  const id = externalId ?? generatedId;
  const hasError = Boolean(error);

  const describedBy = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={id}
          className={["input-field", "input-field--multiline", className].filter(Boolean).join(" ")}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={describedBy}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          className={["input-field", className].filter(Boolean).join(" ")}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={describedBy}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

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
});

Input.displayName = "Input";
