"use client";

import { HTMLAttributes, forwardRef } from "react";
import "./TaskCard.css";

// Figma: "Task Card" component set (node 1364:6655)
// State: Default | Completed
// Layout: HORIZONTAL, h:76, w:343, cornerRadius:16, gap:12, padding:14px 16px
// Border: 1px solid #EEECFF
// Children: Icon (48×48, #FFECC8 bg) · Content (title + time) · Checkbox (24×24)

export type TaskIconVariant = "office" | "reading" | "water" | "morning" | "meeting" | "break";

// Emoji icons — visible on any background, clear at any size
const ICON_EMOJI: Record<TaskIconVariant, string> = {
  morning:   "🌅",
  office:    "💼",
  reading:   "📖",
  water:     "💧",
  meeting:   "🤝",
  break:     "☕",
};

export interface TaskCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
  title: string;
  /** Time string shown below title, e.g. "09:10 AM" */
  time?: string;
  completed?: boolean;
  /** Icon shown in the colored square */
  icon?: TaskIconVariant;
  onToggle?: (completed: boolean) => void;
}

export const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  (
    {
      title,
      time,
      completed = false,
      icon = "office",
      onToggle,
      className = "",
      ...props
    },
    ref
  ) => {
    const cardClass = [
      "task-card",
      completed ? "task-card--completed" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={cardClass} {...props}>
        {/* Icon — 48×48, cornerRadius:12, amber bg (#FFECC8 default, #EDE9FF completed) */}
        <div className="task-card__icon-wrap">
          <span className="task-card__icon-emoji" aria-hidden="true">
            {ICON_EMOJI[icon]}
          </span>
        </div>

        {/* Content — title + optional time */}
        <div className="task-card__content">
          <span className="task-card__title">
            {title}
            {completed && (
              <span className="task-card__sr-only"> (completed)</span>
            )}
          </span>
          {time && (
            <span className="task-card__time">{time}</span>
          )}
        </div>

        {/* Checkbox — 24×24 circle */}
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          aria-label={`Mark "${title}" as ${completed ? "incomplete" : "complete"}`}
          className="task-card__check"
          onClick={() => onToggle?.(!completed)}
        >
          {completed && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 7L5.5 10.5L12 4"
                stroke="#1A7A4A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    );
  }
);

TaskCard.displayName = "TaskCard";
