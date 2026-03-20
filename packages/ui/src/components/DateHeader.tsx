"use client";

import { HTMLAttributes, forwardRef } from "react";
import "./DateHeader.css";

// Figma: DateHeader component (node 1384:7659)
// 343×86, HORIZONTAL layout: ArrowLeft · DateCenter · ArrowRight
// DateCenter: DayName (32px/700, #1A1A2E) + DateStr (14px/400, #6D6891)

export interface DateHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Full day name, e.g. "Thursday" */
  dayName: string;
  /** Date string, e.g. "January 15th, 2026" */
  dateStr: string;
  /** Called when the left arrow is clicked */
  onPrev?: () => void;
  /** Called when the right arrow is clicked */
  onNext?: () => void;
}

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="8"
    height="14"
    viewBox="0 0 8 14"
    fill="none"
    aria-hidden="true"
    style={direction === "left" ? { transform: "rotate(180deg)" } : undefined}
  >
    <path
      d="M1 1L7 7L1 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DateHeader = forwardRef<HTMLDivElement, DateHeaderProps>(
  ({ dayName, dateStr, onPrev, onNext, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={["date-header", className].filter(Boolean).join(" ")}
      {...props}
    >
      <button
        type="button"
        className="date-header__arrow"
        onClick={onPrev}
        aria-label="Previous day"
      >
        <ArrowIcon direction="left" />
      </button>

      <div className="date-header__center">
        <span className="date-header__day">{dayName}</span>
        <span className="date-header__date">{dateStr}</span>
      </div>

      <button
        type="button"
        className="date-header__arrow"
        onClick={onNext}
        aria-label="Next day"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  )
);

DateHeader.displayName = "DateHeader";
