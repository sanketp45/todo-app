"use client";

import { HTMLAttributes, forwardRef } from "react";
import "./Badge.css";

// Sourced from Figma "Badge" component set (node 1289:6514)
// Variant property: Default | Success | Destructive | Outline
// Shape: pill (cornerRadius 999), padding 4px / 8px, 12px Inter Medium

export type BadgeVariant = "default" | "success" | "destructive" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    const classes = ["badge", `badge--${variant}`, className]
      .filter(Boolean)
      .join(" ");

    return <span ref={ref} className={classes} {...props} />;
  }
);

Badge.displayName = "Badge";
