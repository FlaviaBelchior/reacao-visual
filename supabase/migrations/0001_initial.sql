-- ReAção Visual — schema inicial sincronizado com o projeto Supabase novo.
create extension if not exists pgcrypto;

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.glossary_terms (
  id uuid primary key default gen_random_uuid(),
  term_pt text unique not null,
  definition_pt text not null,
  example text,
  category text,
  libras_status text not null default 'pending' check (libras_status in ('pending','validated')),
  libras_video_path text,
  image_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  activity_key text unique not null,
  kind text not null,
  title text not null,
  payload jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  activity_key text not null,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(user_id,module_slug,activity_key)
);

create index if not exists activities_module_id_idx on public.activities(module_id);
create index if not exists learning_progress_user_id_idx on public.learning_progress(user_id);
create index if not exists modules_published_sort_idx on public.modules(published, sort_order);

alter table public.modules enable row level security;
alter table public.glossary_terms enable row level security;
alter table public.activities enable row level security;
alter table public.learning_progress enable row level security;

revoke all on public.modules, public.glossary_terms, public.activities, public.learning_progress from anon, authenticated;
grant select on public.modules, public.glossary_terms, public.activities to anon, authenticated;
grant select, insert, update, delete on public.learning_progress to authenticated;

create policy "public read published modules" on public.modules for select to anon, authenticated using (published = true);
create policy "public read glossary" on public.glossary_terms for select to anon, authenticated using (true);
create policy "public read published activities" on public.activities for select to anon, authenticated using (published = true);
create policy "users read own progress" on public.learning_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "users insert own progress" on public.learning_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "users update own progress" on public.learning_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "users delete own progress" on public.learning_progress for delete to authenticated using ((select auth.uid()) = user_id);