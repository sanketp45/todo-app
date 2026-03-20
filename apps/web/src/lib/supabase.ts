import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Run this SQL in your Supabase dashboard (https://app.supabase.com) → SQL Editor:
 *
 * create table if not exists public.tasks (
 *   id           uuid        primary key default gen_random_uuid(),
 *   user_id      uuid        not null references auth.users(id) on delete cascade,
 *   name         text        not null,
 *   datetime     timestamptz,
 *   notes        text,
 *   description  text,
 *   completed    boolean     not null default false,
 *   priority     text        not null default 'normal'
 *                            check (priority in ('urgent','high','normal','low')),
 *   created_at   timestamptz not null default now()
 * );
 *
 * alter table public.tasks enable row level security;
 *
 * create policy "users manage own tasks" on public.tasks
 *   for all to authenticated
 *   using (auth.uid() = user_id)
 *   with check (auth.uid() = user_id);
 */
