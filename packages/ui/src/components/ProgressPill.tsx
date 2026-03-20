"use client";

import { HTMLAttributes, forwardRef } from "react";
import "./ProgressPill.css";

// Figma: ProgressPill component (node 1383:7646)
// 74×32, cornerRadius:99, white fill
// Children: emoji (14px) + "X / Y" count (13px/600, #1A1A2E)

export interface ProgressPillProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of completed tasks */
  completed: number;
  /** Total tasks in the group */
  total: number;
  /** Emoji displayed to the left of the count */
  emoji?: string;
}

export const ProgressPill = forwardRef<HTMLDivElement, ProgressPillProps>(
  ({ completed, total, emoji = "🎉", className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={["progress-pill", className].filter(Boolean).join(" ")}
      aria-label={`${completed} of ${total} tasks completed`}
      {...props}
    >
      <span className="progress-pill__emoji" aria-hidden="true">{emoji}</span>
      <span className="progress-pill__count">{completed} / {total}</span>
    </div>
  )
);

ProgressPill.displayName = "ProgressPill";
