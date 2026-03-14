"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import "./SearchBar.css";

// Sourced from Figma "SearchBar" component set (node 1309:6551)
// State property: Default | Focused | Active
//
// Default:  grey border #E0E1E3, muted icon + placeholder
// Focused:  primary border #5B68D8 1.5px, primary icon, cursor rectangle
// Active:   grey border, dark text value, clear × icon at right

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Called when the clear (×) button is pressed */
  onClear?: () => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = "Search a task...",
      className = "",
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const hasValue = Boolean(value && String(value).length > 0);

    // Derive state for styling: active > focused > default
    const state = hasValue ? "active" : focused ? "focused" : "default";

    const wrapperClass = [
      "search-bar",
      `search-bar--${state}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClass}>
        {/* Magnifier icon */}
        <svg
          className="search-bar__icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10.5 10.5L13.5 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <input
          ref={ref}
          className="search-bar__input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {/* Clear button — only shown in Active state */}
        {hasValue && (
          <button
            className="search-bar__clear"
            onClick={onClear}
            aria-label="Clear search"
            type="button"
            tabIndex={-1}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";
