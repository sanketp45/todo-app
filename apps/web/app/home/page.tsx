"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ProgressPill } from "@repo/ui/components/ProgressPill";
import { NavAddButton } from "@repo/ui/components/NavAddButton";
import { DateHeader } from "@repo/ui/components/DateHeader";
import { SectionHeader } from "@repo/ui/components/SectionHeader";
import { TaskCard } from "@repo/ui/components/TaskCard";
import type { TaskIconVariant } from "@repo/ui/components/TaskCard";
import { FAB } from "@repo/ui/components/FAB";
import AddTaskDrawer from "@/components/AddTaskDrawer";
import type { AddTaskData, TimeOfDay } from "@/components/AddTaskDrawer";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/hooks/useTasks";
import styles from "./page.module.css";

// ── Date helpers ──────────────────────────────────────────────────────────

function toISO(d: Date) {
  return d.toISOString().slice(0, 10);
}

function addDays(dateStr: string, delta: number) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + delta);
  return toISO(d);
}

function formatDayName(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" });
}

function formatDateStr(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ── Time-of-day helpers ───────────────────────────────────────────────────

type Section = "morning" | "afternoon" | "evening";

const SECTIONS: { id: Section; emoji: string; label: string }[] = [
  { id: "morning",   emoji: "🌅", label: "MORNING" },
  { id: "afternoon", emoji: "☀️", label: "AFTERNOON" },
  { id: "evening",   emoji: "🌙", label: "EVENING" },
];

const SECTION_ICONS: Record<Section, TaskIconVariant[]> = {
  morning:   ["morning", "water", "office"],
  afternoon: ["meeting", "office", "water"],
  evening:   ["reading", "break", "morning"],
};

function getSection(datetime: string | null): Section {
  if (!datetime) return "morning";
  const h = new Date(datetime).getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

function getIcon(section: Section, index: number): TaskIconVariant {
  const opts = SECTION_ICONS[section];
  return opts[index % opts.length] ?? "office";
}

function formatTime(datetime: string | null): string {
  if (!datetime) return "";
  return new Date(datetime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getDatePart(datetime: string | null): string {
  if (!datetime) return "";
  return new Date(datetime).toISOString().slice(0, 10);
}

// ── Component ─────────────────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();
  const { tasks, loading, addTask, updateTask } = useTasks();
  const [selectedDate, setSelectedDate] = useState(toISO(new Date()));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [nowStr, setNowStr] = useState("9:41");

  // Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/login");
      else setAuthChecked(true);
    });
  }, [router]);

  // Live clock
  useEffect(() => {
    function tick() {
      setNowStr(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false }));
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Filter tasks to selected date and group by section
  const grouped = useMemo(() => {
    const bySection: Record<Section, (Task & { section: Section; icon: TaskIconVariant; timeStr: string })[]> = {
      morning: [], afternoon: [], evening: [],
    };
    const dayTasks = tasks.filter(t => getDatePart(t.datetime) === selectedDate);
    dayTasks.forEach(task => {
      const sec = getSection(task.datetime);
      const idx = bySection[sec].length;
      bySection[sec].push({
        ...task,
        section: sec,
        icon: getIcon(sec, idx),
        timeStr: formatTime(task.datetime),
      });
    });
    return bySection;
  }, [tasks, selectedDate]);

  const total = useMemo(() => Object.values(grouped).flat().length, [grouped]);
  const completed = useMemo(() => Object.values(grouped).flat().filter(t => t.completed).length, [grouped]);
  const isEmpty = total === 0;

  const handleToggle = useCallback(async (id: string, done: boolean) => {
    await updateTask(id, { completed: done });
  }, [updateTask]);

  const handleSave = useCallback(async (data: AddTaskData) => {
    // Combine date + time into ISO datetime
    const datetime = `${data.date}T${data.time}:00`;
    await addTask({ name: data.name, datetime, priority: "normal" });
  }, [addTask]);

  if (!authChecked) return null;

  return (
    <div className={styles.page}>
      {/* ── StatusBar — Figma: 375×44, white bg ── */}
      <div className={styles.statusBar}>
        <span className={styles.statusTime}>{nowStr}</span>
        <span className={styles.statusIcons}>▲ ))) ▮</span>
      </div>

      {/* ── TopBar — ProgressPill left, NavAddButton right — Figma: y:44 ── */}
      <div className={styles.topBar}>
        <ProgressPill completed={completed} total={total || 8} emoji="🎉" />
        <NavAddButton aria-label="Add task" onClick={() => setDrawerOpen(true)} />
      </div>

      {/* ── Divider — Figma: y:96, 1px ── */}
      <div className={styles.divider} />

      {/* ── DateSection — Figma: 375×100, y:97 ── */}
      <div className={styles.dateSection}>
        <DateHeader
          dayName={formatDayName(selectedDate)}
          dateStr={formatDateStr(selectedDate)}
          onPrev={() => setSelectedDate(d => addDays(d, -1))}
          onNext={() => setSelectedDate(d => addDays(d, 1))}
        />
      </div>

      {/* ── Divider — Figma: y:197 ── */}
      <div className={styles.divider} />

      {/* ── TaskList — Figma: 375×614, y:198, scrollable ── */}
      <div className={styles.taskList}>
        {loading && <p className={styles.empty}>Loading…</p>}

        {!loading && isEmpty && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>Your day is a blank slate. Make it count.</p>
          </div>
        )}

        {!loading && !isEmpty && SECTIONS.map(sec => {
          const items = grouped[sec.id];
          if (items.length === 0) return null;
          return (
            <div key={sec.id} className={styles.section}>
              {/* SectionHeader — Figma: 133×31, MORNING(3) etc. */}
              <SectionHeader
                emoji={sec.emoji}
                label={`${sec.label}  (${items.length})`}
              />
              <div className={styles.cards}>
                {items.map(task => (
                  <TaskCard
                    key={task.id}
                    title={task.name}
                    time={task.timeStr || ""}
                    completed={task.completed}
                    icon={task.icon}
                    onToggle={done => handleToggle(task.id, done)}
                    onClick={() => router.push(`/tasks/${task.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FAB — Figma: 60×60, #0F1111, y:728, absolute bottom-right ── */}
      <FAB
        className={styles.fab}
        onClick={() => setDrawerOpen(true)}
        aria-label="Add new task"
      />

      {/* ── Add Task Drawer — Figma: 1391:9739 ── */}
      <AddTaskDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
