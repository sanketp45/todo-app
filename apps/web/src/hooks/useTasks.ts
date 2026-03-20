"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export type Priority = "urgent" | "high" | "normal" | "low";

export interface Task {
  id: string;
  name: string;
  datetime: string | null;
  notes: string | null;
  description: string | null;
  completed: boolean;
  priority: Priority;
  created_at: string;
}

export interface AddTaskInput {
  name: string;
  datetime?: string | null;
  notes?: string | null;
  priority?: Priority;
}

function toError(err: unknown): Error {
  if (err instanceof Error) return err;
  if (err && typeof err === "object" && "message" in err) {
    return new Error(String((err as { message: unknown }).message));
  }
  return new Error(String(err));
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw toError(error);
      setTasks(data ?? []);
    } catch (err) {
      setError(toError(err).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (input: AddTaskInput): Promise<Task> => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        name: input.name,
        datetime: input.datetime ?? null,
        notes: input.notes ?? null,
        priority: input.priority ?? "normal",
        user_id: user!.id,
      })
      .select()
      .single();
    if (error) throw toError(error);
    const task = data as Task;
    setTasks((prev) => [task, ...prev]);
    return task;
  }, []);

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw toError(error);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTask = useCallback(
    async (
      id: string,
      updates: Partial<Omit<Task, "id" | "created_at">>
    ): Promise<Task> => {
      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw toError(error);
      const task = data as Task;
      setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
      return task;
    },
    []
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, fetchTasks, addTask, deleteTask, updateTask };
}
