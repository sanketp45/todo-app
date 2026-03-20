"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import "./FAB.css";

// Floating Action Button — primary colour circle with white + icon
// Position is controlled by the parent (see home/page.module.css .fab)

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label"?: string;
}

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      className = "",
      "aria-label": ariaLabel = "Add task",
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={["fab", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      type="button"
      {...props}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 5V19M5 12H19"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
);

FAB.displayName = "FAB";
