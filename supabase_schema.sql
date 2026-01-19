-- Enable Row Level Security
alter table "auth"."users" enable row level security;

-- Profiles Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  display_name text,
  status text check (status in ('online', 'offline', 'away')),
  partner_id uuid references auth.users,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.profiles enable row level security;

-- Check-ins Table
create table public.checkins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  mood text not null, -- emoji or label
  energy_level int check (energy_level between 1 and 100),
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.checkins enable row level security;

-- Cute Notes Table
create table public.notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  content text check (char_length(content) <= 120),
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.notes enable row level security;

-- Pings Table (Ephemeral)
create table public.pings (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references auth.users not null,
  type text check (type in ('miss_you', 'hug', 'proud', 'no_reply')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.pings enable row level security;

-- Schedule Windows
create table public.schedule_windows (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  type text check (type in ('free', 'busy', 'maybe')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.schedule_windows enable row level security;

-- Memory Cards (Board)
create table public.memory_cards (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  type text default 'text', -- text, photo
  user_id uuid references auth.users, -- nullable for system cards
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.memory_cards enable row level security;

-- Photos (Daily Drop)
create table public.photos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  url text not null,
  caption text,
  reactions jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.photos enable row level security;

-- RLS Policies
-- Allow users to read/write their own data and their partner's data (simplified for "2-person app")
-- In a real app, you'd check "partner_id". For simplicity here, we allow authenticated users to read all (assuming only 2 users in the project).

create policy "Enable read access for authenticated users" on public.profiles for select using (auth.role() = 'authenticated');
create policy "Enable update for users based on id" on public.profiles for update using (auth.uid() = id);

create policy "Enable all access for authenticated users" on public.checkins for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on public.notes for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on public.pings for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on public.schedule_windows for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on public.memory_cards for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on public.photos for all using (auth.role() = 'authenticated');

-- Realtime
alter publication supabase_realtime add table public.pings;
alter publication supabase_realtime add table public.notes;
