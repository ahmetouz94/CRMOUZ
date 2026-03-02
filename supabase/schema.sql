create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  company text,
  afm text,
  phone text,
  email text,
  address text,
  status text default 'active',
  tags text[] default '{}',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  title text not null,
  notes text,
  status text not null default 'open',
  priority text not null default 'Orta',
  type text not null default 'Diger',
  start_date date,
  end_date date,
  fee_amount numeric(12,2) not null default 0,
  auto_invoice_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  document_no text,
  type text not null default 'service',
  status text not null default 'unpaid',
  amount numeric(12,2) not null default 0,
  currency text not null default 'EUR',
  issue_date date not null default current_date,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.tasks enable row level security;
alter table public.invoices enable row level security;

create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = id);

create policy "profiles_upsert_own" on public.profiles
for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "clients_owner_all" on public.clients
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "tasks_owner_all" on public.tasks
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "invoices_owner_all" on public.invoices
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
