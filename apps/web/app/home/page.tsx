"use client";

import { useState } from "react";
import { SearchBar } from "@repo/ui/components/SearchBar";
import { TabBar } from "@repo/ui/components/TabItem";
import { TaskCard } from "@repo/ui/components/TaskCard";
import { Badge } from "@repo/ui/components/Badge";
import styles from "./page.module.css";

type TabId = "pending" | "completed" | "overdue";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  overdue?: boolean;
  badgeLabel: string;
  badgeVariant: "outline" | "default" | "success" | "destructive";
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    dueDate: "Mar 20, 2026",
    completed: false,
    badgeLabel: "High",
    badgeVariant: "outline",
  },
  {
    id: "2",
    title: "Fix login bug",
    dueDate: "Mar 15, 2026",
    completed: false,
    badgeLabel: "Urgent",
    badgeVariant: "destructive",
  },
  {
    id: "3",
    title: "Write unit tests for auth module",
    dueDate: "Mar 25, 2026",
    completed: false,
    badgeLabel: "Normal",
    badgeVariant: "default",
  },
  {
    id: "4",
    title: "Update project README",
    dueDate: "Mar 30, 2026",
    completed: false,
    badgeLabel: "Low",
    badgeVariant: "success",
  },
  {
    id: "5",
    title: "Review pull request #42",
    dueDate: "Mar 12, 2026",
    completed: true,
    badgeLabel: "High",
    badgeVariant: "outline",
  },
  {
    id: "6",
    title: "Migrate database schema",
    dueDate: "Mar 8, 2026",
    completed: true,
    badgeLabel: "Urgent",
    badgeVariant: "destructive",
  },
  {
    id: "7",
    title: "Set up CI/CD pipeline",
    dueDate: "Mar 10, 2026",
    completed: false,
    overdue: true,
    badgeLabel: "High",
    badgeVariant: "outline",
  },
  {
    id: "8",
    title: "Prepare Q1 report",
    dueDate: "Mar 5, 2026",
    completed: false,
    overdue: true,
    badgeLabel: "Urgent",
    badgeVariant: "destructive",
  },
];

const TABS = [
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
  { id: "overdue", label: "Overdue" },
];

const SECTION_LABELS: Record<TabId, string> = {
  pending: "Pending Tasks",
  completed: "Completed Tasks",
  overdue: "Overdue Tasks",
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<TabId>("pending");
  const [search, setSearch] = useState("");

  const filtered = tasks
    .filter((t) => {
      if (activeTab === "pending") return !t.completed && !t.overdue;
      if (activeTab === "completed") return t.completed;
      if (activeTab === "overdue") return t.overdue && !t.completed;
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  const counts: Record<TabId, number> = {
    pending: tasks.filter((t) => !t.completed && !t.overdue).length,
    completed: tasks.filter((t) => t.completed).length,
    overdue: tasks.filter((t) => t.overdue && !t.completed).length,
  };

  const totalActive = tasks.filter((t) => !t.completed).length;

  function handleToggle(id: string, completed: boolean) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.title}>My Tasks</h1>
            <p className={styles.subtitle}>
              You have {totalActive} task{totalActive !== 1 ? "s" : ""} today
            </p>
          </div>
          <div className={styles.avatar} aria-hidden="true">
            JD
          </div>
        </div>

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />

        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabId)}
        />
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>
            {SECTION_LABELS[activeTab]}
          </span>
          <Badge variant="default">{counts[activeTab]}</Badge>
        </div>

        <div className={styles.taskList}>
          {filtered.length === 0 ? (
            <p className={styles.empty}>No tasks found</p>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                dueDate={task.dueDate}
                completed={task.completed}
                badgeLabel={task.badgeLabel}
                badgeVariant={task.badgeVariant}
                onToggle={(c) => handleToggle(task.id, c)}
                onDelete={() => handleDelete(task.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
