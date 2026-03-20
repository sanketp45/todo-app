"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@repo/ui/components/Button";
import styles from "./AddTaskDrawer.module.css";

// Figma: AddTaskDrawer — node 1391:9739
// 375×496, slides up from bottom, white fill
// Children: DrawerHeader · TaskNameWrap · Row_Time of day · Row_Date · Row_Time · CTAWrap

export type TimeOfDay = "morning" | "afternoon" | "evening";

export interface AddTaskData {
  name: string;
  timeOfDay: TimeOfDay;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
}

export interface AddTaskDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: AddTaskData) => Promise<void>;
}

const TIME_OPTIONS: { value: TimeOfDay; emoji: string; label: string }[] = [
  { value: "morning",   emoji: "🌅", label: "Morning" },
  { value: "afternoon", emoji: "☀️", label: "Afternoon" },
  { value: "evening",   emoji: "🌙", label: "Evening" },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function defaultTime(tod: TimeOfDay) {
  return tod === "morning" ? "09:00" : tod === "afternoon" ? "14:00" : "19:00";
}

export default function AddTaskDrawer({ open, onClose, onSave }: AddTaskDrawerProps) {
  const [name, setName] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("09:00");
  const [saving, setSaving] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // Auto-update time when time-of-day changes
  useEffect(() => { setTime(defaultTime(timeOfDay)); }, [timeOfDay]);

  // Focus name field when drawer opens
  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 80);
      setName("");
      setTimeOfDay("morning");
      setDate(todayISO());
      setTime("09:00");
      setDropdownOpen(false);
    }
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) { nameRef.current?.focus(); return; }
    setSaving(true);
    try {
      await onSave({ name: name.trim(), timeOfDay, date, time });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  const selected = TIME_OPTIONS.find(o => o.value === timeOfDay)!;

  return (
    <>
      {/* ── Scrim ── */}
      <div
        className={[styles.scrim, open ? styles.scrimVisible : ""].join(" ")}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <div
        className={[styles.drawer, open ? styles.drawerOpen : ""].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Add task"
      >
        <form onSubmit={handleSubmit} noValidate>
          {/* ── DrawerHeader ── */}
          <div className={styles.header}>
            <h2 className={styles.title}>Add task</h2>
            <div className={styles.headerActions}>
              <button type="button" className={styles.iconBtn} onClick={onClose} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Task name ── */}
          <div className={styles.nameWrap}>
            <label htmlFor="task-name" className={styles.nameLabel}>Task name</label>
            <input
              ref={nameRef}
              id="task-name"
              type="text"
              className={styles.nameInput}
              placeholder="name of the task"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className={styles.divider} />

          {/* ── Time of day row — shows selected pill with chevron, click to open dropdown ── */}
          <div className={styles.row}>
            <span className={styles.rowLabel}>
              <span aria-hidden="true">🕐</span> Time of day
            </span>
            <div className={styles.todDropdownWrap}>
              <button
                type="button"
                className={styles.todPill}
                onClick={() => setDropdownOpen(v => !v)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span aria-hidden="true">{selected.emoji}</span>
                <span>{selected.label}</span>
                <svg
                  className={[styles.todChevron, dropdownOpen ? styles.todChevronOpen : ""].join(" ")}
                  width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
                >
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <ul className={styles.todDropdown} role="listbox" aria-label="Time of day">
                  {TIME_OPTIONS.map(opt => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={timeOfDay === opt.value}
                      className={[styles.todOption, timeOfDay === opt.value ? styles.todOptionActive : ""].join(" ")}
                      onClick={() => { setTimeOfDay(opt.value); setDropdownOpen(false); }}
                    >
                      <span aria-hidden="true">{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.divider} />

          {/* ── Date row ── */}
          <div className={styles.row}>
            <span className={styles.rowLabel}>
              <span aria-hidden="true">📅</span> Date
            </span>
            <input
              type="date"
              className={styles.nativeInput}
              value={date}
              onChange={e => setDate(e.target.value)}
              aria-label="Task date"
            />
          </div>

          <div className={styles.divider} />

          {/* ── Time row ── */}
          <div className={styles.row}>
            <span className={styles.rowLabel}>
              <span aria-hidden="true">⏰</span> Time
            </span>
            <input
              type="time"
              className={styles.nativeInput}
              value={time}
              onChange={e => setTime(e.target.value)}
              aria-label="Task time"
            />
          </div>

          <div className={styles.divider} />

          {/* ── CTA ── */}
          <div className={styles.ctaWrap}>
            <Button type="submit" variant="primary" size="md" disabled={saving} style={{ width: "100%" }}>
              {saving ? "Saving…" : "ADD TASK"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
