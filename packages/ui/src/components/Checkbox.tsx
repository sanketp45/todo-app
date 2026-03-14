"use client";

import {
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useCallback,
} from "react";
import "./Checkbox.css";

// Sourced from Figma "Checkbox" component set (node 1289:2326)
// State property: Unchecked | Checked | Indeterminate | Disabled
// Box: 16×16px, cornerRadius 4, strokeWeight 1.5
// Row: HORIZONTAL, itemSpacing 8px, counterAxisAlignItems CENTER

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Text rendered beside the box — 14px Regular */
  label?: string;
  /**
   * Indeterminate state (partial selection). Sets the DOM `.indeterminate`
   * property — cannot be expressed as an HTML attribute, so must be a prop.
   * Visually: primary box with a white dash (10×2px, stroke 2).
   */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, indeterminate = false, disabled, className = "", ...props },
    forwardedRef
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);

    // Merge the forwarded ref with our internal ref
    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        (innerRef as React.MutableRefObject<HTMLInputElement | null>).current =
          node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (
            forwardedRef as React.MutableRefObject<HTMLInputElement | null>
          ).current = node;
        }
      },
      [forwardedRef]
    );

    // indeterminate is a DOM property, not an HTML attribute — must be set imperatively
    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const wrapperClass = [
      "checkbox-wrapper",
      disabled ? "checkbox-wrapper--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label className={wrapperClass}>
        <input
          ref={mergedRef}
          type="checkbox"
          className="checkbox-input"
          disabled={disabled}
          {...props}
        />
        {label && <span className="checkbox-label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
