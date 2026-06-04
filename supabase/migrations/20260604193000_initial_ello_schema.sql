create extension if not exists pgcrypto;

do $$
begin
  create type public.app_role as enum ('client', 'professional', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.quote_status as enum (
    'new',
    'quoted',
    'accepted',
    'in_progress',
    'completed',
    'cancelled',
    'declined'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.verification_status as enum ('draft', 'pending', 'verified', 'rejected');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role public.app_role not null,
  full_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  birth_date date,
  city text not null,
  region text,
  interests text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.professional_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  public_name text,
  specialty text not null,
  city text not null,
  coverage text not null,
  description text not null,
  base_price text not null,
  charge_type text not null,
  availability text,
  materials text,
  phone text,
  fiscal_city text,
  document_ref text,
  verification_status public.verification_status not null default 'pending',
  profile_status text not null default 'draft',
  avatar_url text,
  banner_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.professional_profiles(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  base_price text,
  charge_type text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.professional_profiles(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.client_profiles(id) on delete cascade,
  professional_id uuid not null references public.professional_profiles(id) on delete cascade,
  service_id uuid references public.services(id) on delete set null,
  description text not null,
  desired_date date,
  location text not null,
  status public.quote_status not null default 'new',
  response_price text,
  response_eta text,
  response_message text,
  responded_at timestamptz,
  accepted_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quote_messages (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  sender_user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null unique references public.quote_requests(id) on delete cascade,
  client_id uuid not null references public.client_profiles(id) on delete cascade,
  professional_id uuid not null references public.professional_profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_professionals_city_specialty on public.professional_profiles(city, specialty);
create index if not exists idx_services_professional_active on public.services(professional_id, active);
create index if not exists idx_quotes_client_status on public.quote_requests(client_id, status, created_at desc);
create index if not exists idx_quotes_professional_status on public.quote_requests(professional_id, status, created_at desc);
create index if not exists idx_messages_quote_created on public.quote_messages(quote_request_id, created_at);
create index if not exists idx_reviews_professional_created on public.reviews(professional_id, created_at desc);
create index if not exists idx_audit_actor_created on public.audit_events(actor_user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_client_profiles_updated_at on public.client_profiles;
create trigger set_client_profiles_updated_at
before update on public.client_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_professional_profiles_updated_at on public.professional_profiles;
create trigger set_professional_profiles_updated_at
before update on public.professional_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_quote_requests_updated_at on public.quote_requests;
create trigger set_quote_requests_updated_at
before update on public.quote_requests
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.client_profiles enable row level security;
alter table public.professional_profiles enable row level security;
alter table public.services enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.quote_requests enable row level security;
alter table public.quote_messages enable row level security;
alter table public.reviews enable row level security;
alter table public.audit_events enable row level security;

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "client profiles own access" on public.client_profiles;
create policy "client profiles own access"
on public.client_profiles for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "professional profiles public read" on public.professional_profiles;
create policy "professional profiles public read"
on public.professional_profiles for select
using (profile_status = 'published' or auth.uid() = user_id);

drop policy if exists "professional profiles own write" on public.professional_profiles;
create policy "professional profiles own write"
on public.professional_profiles for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "services public active read" on public.services;
create policy "services public active read"
on public.services for select
using (
  active = true
  or exists (
    select 1 from public.professional_profiles p
    where p.id = services.professional_id and p.user_id = auth.uid()
  )
);

drop policy if exists "services professional write" on public.services;
create policy "services professional write"
on public.services for all
using (
  exists (
    select 1 from public.professional_profiles p
    where p.id = services.professional_id and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.professional_profiles p
    where p.id = services.professional_id and p.user_id = auth.uid()
  )
);

drop policy if exists "portfolio public read" on public.portfolio_items;
create policy "portfolio public read"
on public.portfolio_items for select
using (true);

drop policy if exists "portfolio professional write" on public.portfolio_items;
create policy "portfolio professional write"
on public.portfolio_items for all
using (
  exists (
    select 1 from public.professional_profiles p
    where p.id = portfolio_items.professional_id and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.professional_profiles p
    where p.id = portfolio_items.professional_id and p.user_id = auth.uid()
  )
);

drop policy if exists "quotes participant read" on public.quote_requests;
create policy "quotes participant read"
on public.quote_requests for select
using (
  exists (
    select 1 from public.client_profiles c
    where c.id = quote_requests.client_id and c.user_id = auth.uid()
  )
  or exists (
    select 1 from public.professional_profiles p
    where p.id = quote_requests.professional_id and p.user_id = auth.uid()
  )
);

drop policy if exists "quotes client create" on public.quote_requests;
create policy "quotes client create"
on public.quote_requests for insert
with check (
  exists (
    select 1 from public.client_profiles c
    where c.id = quote_requests.client_id and c.user_id = auth.uid()
  )
);

drop policy if exists "quotes participant update" on public.quote_requests;
create policy "quotes participant update"
on public.quote_requests for update
using (
  exists (
    select 1 from public.client_profiles c
    where c.id = quote_requests.client_id and c.user_id = auth.uid()
  )
  or exists (
    select 1 from public.professional_profiles p
    where p.id = quote_requests.professional_id and p.user_id = auth.uid()
  )
);

drop policy if exists "messages participant read" on public.quote_messages;
create policy "messages participant read"
on public.quote_messages for select
using (
  exists (
    select 1
    from public.quote_requests q
    left join public.client_profiles c on c.id = q.client_id
    left join public.professional_profiles p on p.id = q.professional_id
    where q.id = quote_messages.quote_request_id
      and (c.user_id = auth.uid() or p.user_id = auth.uid())
  )
);

drop policy if exists "messages participant create" on public.quote_messages;
create policy "messages participant create"
on public.quote_messages for insert
with check (
  sender_user_id = auth.uid()
  and exists (
    select 1
    from public.quote_requests q
    left join public.client_profiles c on c.id = q.client_id
    left join public.professional_profiles p on p.id = q.professional_id
    where q.id = quote_messages.quote_request_id
      and (c.user_id = auth.uid() or p.user_id = auth.uid())
  )
);

drop policy if exists "reviews public read" on public.reviews;
create policy "reviews public read"
on public.reviews for select
using (true);

drop policy if exists "reviews client create" on public.reviews;
create policy "reviews client create"
on public.reviews for insert
with check (
  exists (
    select 1 from public.client_profiles c
    where c.id = reviews.client_id and c.user_id = auth.uid()
  )
);

drop policy if exists "audit no client access" on public.audit_events;
create policy "audit no client access"
on public.audit_events for select
using (false);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars', 'avatars', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),
  ('portfolio', 'portfolio', true, 10485760, array['image/png', 'image/jpeg', 'image/webp']),
  ('quote-attachments', 'quote-attachments', false, 10485760, array['image/png', 'image/jpeg', 'image/webp', 'application/pdf'])
on conflict (id) do nothing;
