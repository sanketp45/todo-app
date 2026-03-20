"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Task } from "@/hooks/useTasks";
import { Button } from "@repo/ui/components/Button";
import styles from "./page.module.css";

function formatDate(dt: string | null): string {
  if (!dt) return "—";
  try {
    return new Date(dt).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch { return dt; }
}

function formatTime(dt: string | null): string {
  if (!dt) return "—";
  try {
    return new Date(dt).toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit",
    });
  } catch { return dt; }
}

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/login");
      else setAuthChecked(true);
    });
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks").select("*").eq("id", id).single();
      if (error) setError(error.message);
      else setTask(data as Task);
      setLoading(false);
    }
    if (id) load();
  }, [id, authChecked]);

  if (!authChecked) return null;

  async function handleToggleComplete(completed: boolean) {
    if (!task) return;
    const { data } = await supabase
      .from("tasks").update({ completed }).eq("id", id).select().single();
    if (data) setTask(data as Task);
  }

  async function handleDelete() {
    setDeleting(true);
    await supabase.from("tasks").delete().eq("id", id);
    router.push("/home");
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <button className={styles.back} onClick={() => router.back()}>← Back</button>
          <h1 className={styles.headerTitle}>Task Detail</h1>
          <div />
        </div>
        <div className={styles.content}><p className={styles.empty}>Loading…</p></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <button className={styles.back} onClick={() => router.back()}>← Back</button>
          <h1 className={styles.headerTitle}>Task Detail</h1>
          <div />
        </div>
        <div className={styles.content}><p className={styles.empty}>{error ?? "Task not found"}</p></div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <button className={styles.back} onClick={() => router.back()}>← Back</button>
        <h1 className={styles.headerTitle}>Task Detail</h1>
        <div />
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.taskTitle}>{task.name}</h2>

          {/* Complete toggle */}
          <label className={styles.checkRow}>
            <input
              type="checkbox"
              className={styles.checkInput}
              checked={task.completed}
              onChange={e => handleToggleComplete(e.target.checked)}
            />
            <span className={styles.checkLabel}>Mark as complete</span>
          </label>

          <div className={styles.divider} />

          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>📅</span>
            <span className={styles.metaLabel}>Date</span>
            <span className={styles.metaValue}>{formatDate(task.datetime)}</span>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>🕐</span>
            <span className={styles.metaLabel}>Time</span>
            <span className={styles.metaValue}>{formatTime(task.datetime)}</span>
          </div>

          {task.notes && (
            <>
              <div className={styles.divider} />
              <div className={styles.section}>
                <span className={styles.sectionLabel}>Notes</span>
                <p className={styles.sectionText}>{task.notes}</p>
              </div>
            </>
          )}

          {!task.notes && (
            <p className={styles.empty}>No additional details</p>
          )}
        </div>
      </div>

      {/* ── Delete button ── */}
      <div className={styles.footer}>
        <Button variant="primary" size="md" className={styles.deleteBtn}
          onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting…" : "DELETE TASK"}
        </Button>
      </div>
    </div>
  );
}
