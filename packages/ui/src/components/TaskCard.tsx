"use client";

import { HTMLAttributes, forwardRef } from "react";
import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import "./TaskCard.css";

// Sourced from Figma "Task Card" component set (node 1289:18510)
// State property: Default | Completed
//
// Layout: HORIZONTAL, gap 12px, padding pt:32 pb:32 pl:16 pr:16
// align-items: CENTER (Figma: crossAxisAlignItems CENTER)
// Badge: ABSOLUTE top-right (x:318/297, y:0)
// Children: Checkbox · Content (title + due date) · Right (Button only)
//
// Completed differences:
//   - Checkbox: checked
//   - Title: Regular weight, muted colour, strikethrough
//   - Badge: variant="success", label="Success"

export interface TaskCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
  /** Main task label — 14px Medium (default) / Regular strikethrough (completed) */
  title: string;
  /** Optional due-date string shown below the title (📅 prefix added automatically) */
  dueDate?: string;
  /** Drives the Completed visual state */
  completed?: boolean;
  /** Badge label shown when not completed. Defaults to "High" */
  badgeLabel?: string;
  /** Badge variant shown when not completed. Defaults to "outline" */
  badgeVariant?: BadgeVariant;
  /** Called when the checkbox is toggled */
  onToggle?: (completed: boolean) => void;
  /** Called when the DELETE button is pressed */
  onDelete?: () => void;
}

export const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  (
    {
      title,
      dueDate,
      completed = false,
      badgeLabel = "High",
      badgeVariant = "outline",
      onToggle,
      onDelete,
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
        {/* Badge — absolutely positioned at top-right (Figma: x:318/297, y:0) */}
        <Badge
          className="task-card__badge"
          variant={completed ? "success" : badgeVariant}
        >
          {completed ? "Success" : badgeLabel}
        </Badge>

        {/* Checkbox — no visible label */}
        <Checkbox
          className="task-card__checkbox"
          checked={completed}
          onChange={(e) => onToggle?.(e.target.checked)}
          aria-label={`Mark "${title}" as ${completed ? "incomplete" : "complete"}`}
        />

        {/* Content — title + optional due date */}
        <div className="task-card__content">
          <span className="task-card__title">{title}</span>
          {dueDate && (
            <span className="task-card__due-date">📅 {dueDate}</span>
          )}
        </div>

        {/* Right — Delete button (Figma: Badge moved to absolute, only Button remains) */}
        <div className="task-card__right">
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            aria-label={`Delete "${title}"`}
          >
            DELETE
          </Button>
        </div>
      </div>
    );
  }
);

TaskCard.displayName = "TaskCard";
