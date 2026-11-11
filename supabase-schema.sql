-- Run in the Supabase SQL Editor.
create table if not exists public.ailab_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.ailab_progress enable row level security;
create policy "Users can read their own AI LAB progress" on public.ailab_progress for select using (auth.uid() = user_id);
create policy "Users can insert their own AI LAB progress" on public.ailab_progress for insert with check (auth.uid() = user_id);
create policy "Users can update their own AI LAB progress" on public.ailab_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
