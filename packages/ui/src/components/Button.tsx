"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import "./Button.css";

// Variants and sizes sourced from Figma "Button" component set (node 1287:2346)
// Type property: Primary | Secondary | Destructive
// Size property: SM | MD
export type ButtonVariant = "primary" | "secondary" | "destructive";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    const classes = ["btn", `btn--${variant}`, `btn--${size}`, className]
      .filter(Boolean)
      .join(" ");

    return <button ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = "Button";
