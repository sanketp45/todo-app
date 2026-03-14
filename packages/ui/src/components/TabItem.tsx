"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import "./TabItem.css";

// Sourced from Figma "TabItem" component set (node 1309:6556)
// State property: Active | Inactive
//
// Active:   white fill, primary text #5B68D8, Semi Bold (600), 13px, radius:99, padding 7/16
// Inactive: transparent fill, white 75% opacity text, Medium (500), 13px
//
// Designed for use on the primary blue (#5B68D8) header background.

export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tab label text */
  label: string;
  /** Whether this tab is currently active */
  active?: boolean;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  ({ label, active = false, className = "", ...props }, ref) => {
    const classes = [
      "tab-item",
      active ? "tab-item--active" : "tab-item--inactive",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} {...props}>
        {label}
      </button>
    );
  }
);

TabItem.displayName = "TabItem";

// ── TabBar ─────────────────────────────────────────────────────────────────

export interface TabBarTab {
  id: string;
  label: string;
}

export interface TabBarProps {
  tabs: TabBarTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export const TabBar = forwardRef<HTMLDivElement, TabBarProps>(
  ({ tabs, activeTab, onTabChange, className = "" }, ref) => {
    const classes = ["tab-bar", className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} role="tablist">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
          />
        ))}
      </div>
    );
  }
);

TabBar.displayName = "TabBar";
