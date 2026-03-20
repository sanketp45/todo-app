"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import "./NavAddButton.css";

// Figma: NavAddButton component (node 1384:7657)
// 38×38 circle, transparent bg, "+" text (20px/700, #4E42B8)
// Used in the top navigation bar to add a new task

export interface NavAddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label"?: string;
}

export const NavAddButton = forwardRef<HTMLButtonElement, NavAddButtonProps>(
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
      type="button"
      className={["nav-add-btn", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      {...props}
    >
      <span aria-hidden="true">+</span>
    </button>
  )
);

NavAddButton.displayName = "NavAddButton";
