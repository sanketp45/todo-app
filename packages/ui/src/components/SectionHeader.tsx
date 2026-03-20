"use client";

import { HTMLAttributes, forwardRef } from "react";
import "./SectionHeader.css";

// Figma: SectionHeader component (node 1384:7649)
// Pill with warm bg (#FFF3DA), emoji + label text (12px/600, #8B6914)
// Used to label task sections: MORNING, AFTERNOON, EVENING

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Section label, e.g. "MORNING (3)" */
  label: string;
  /** Emoji icon, e.g. "🌅" */
  emoji?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ label, emoji = "🌅", className = "", ...props }, ref) => (
    <div ref={ref} className={["section-header", className].filter(Boolean).join(" ")} {...props}>
      <div className="section-header__pill">
        <span className="section-header__emoji" aria-hidden="true">{emoji}</span>
        <span className="section-header__label">{label}</span>
      </div>
    </div>
  )
);

SectionHeader.displayName = "SectionHeader";
