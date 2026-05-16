
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "admins read roles" on public.user_roles for select
  using (public.has_role(auth.uid(), 'admin'));
create policy "admins manage roles" on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- First signup gets admin
create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_first_admin();

-- Helper for updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- Generic public-read + admin-write policy installer
-- (we write the policies inline per table below)

-- PROFILE (singleton row)
create table public.profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  bio text not null,
  orcid text,
  website text,
  avatar text,
  socials jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.profile enable row level security;
create policy "profile public read" on public.profile for select using (true);
create policy "profile admin write" on public.profile for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger profile_touch before update on public.profile for each row execute function public.touch_updated_at();

-- BOOKS
create table public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  publisher text,
  date date not null,
  meta text,
  image text,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.books enable row level security;
create policy "books public read" on public.books for select using (true);
create policy "books admin write" on public.books for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger books_touch before update on public.books for each row execute function public.touch_updated_at();

-- EVENTS
create table public.events (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  title text not null,
  subtitle text,
  date date not null,
  meta text,
  image text,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.events enable row level security;
create policy "events public read" on public.events for select using (true);
create policy "events admin write" on public.events for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger events_touch before update on public.events for each row execute function public.touch_updated_at();

-- PROJECTS
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  date date not null,
  meta text,
  image text,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create policy "projects public read" on public.projects for select using (true);
create policy "projects admin write" on public.projects for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger projects_touch before update on public.projects for each row execute function public.touch_updated_at();

-- TRAVELS
create table public.travels (
  id uuid primary key default gen_random_uuid(),
  continent text not null,
  country text not null,
  title text not null,
  subtitle text,
  date date not null,
  meta text,
  lat double precision,
  lng double precision,
  image text,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.travels enable row level security;
create policy "travels public read" on public.travels for select using (true);
create policy "travels admin write" on public.travels for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger travels_touch before update on public.travels for each row execute function public.touch_updated_at();

-- RUNNING
create table public.running (
  id uuid primary key default gen_random_uuid(),
  race_name text not null,
  distance text not null,
  year int not null,
  time text not null,
  date date not null,
  image text,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.running enable row level security;
create policy "running public read" on public.running for select using (true);
create policy "running admin write" on public.running for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger running_touch before update on public.running for each row execute function public.touch_updated_at();

-- OPINION
create table public.opinion (
  id uuid primary key default gen_random_uuid(),
  magazine text not null,
  title text not null,
  subtitle text,
  date date not null,
  image text,
  url text,
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.opinion enable row level security;
create policy "opinion public read" on public.opinion for select using (true);
create policy "opinion admin write" on public.opinion for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger opinion_touch before update on public.opinion for each row execute function public.touch_updated_at();

-- OTHERS
create table public.others (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  role text,
  title text not null,
  subtitle text,
  date date not null,
  image text,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.others enable row level security;
create policy "others public read" on public.others for select using (true);
create policy "others admin write" on public.others for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger others_touch before update on public.others for each row execute function public.touch_updated_at();

-- UPCOMING
create table public.upcoming (
  id uuid primary key default gen_random_uuid(),
  facet text not null,
  title text not null,
  subtitle text,
  date date not null,
  meta text,
  image text,
  url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.upcoming enable row level security;
create policy "upcoming public read" on public.upcoming for select using (true);
create policy "upcoming admin write" on public.upcoming for all
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger upcoming_touch before update on public.upcoming for each row execute function public.touch_updated_at();
