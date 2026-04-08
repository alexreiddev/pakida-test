-- ============================================================
-- PAKIDA BOARD GAME CAFÉ — SUPABASE SCHEMA
-- Migration: 001_schema.sql
-- Run this in Supabase SQL Editor
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- PLAYERS
-- ============================================================
create table players (
  id               uuid primary key default gen_random_uuid(),
  phone            text unique not null,
  name             text not null,
  loyalty_stamps   int not null default 0,
  credit_balance   numeric(10,2) not null default 0,
  membership_type  text not null default 'walk-in'
                   check (membership_type in ('walk-in','founders','monthly')),
  referral_code    text unique not null,
  birthday_month   int check (birthday_month between 1 and 12),
  is_founders_club boolean not null default false,
  founders_slot    int,
  visit_count      int not null default 0,
  total_spend      numeric(10,2) not null default 0,
  created_at       timestamptz not null default now(),
  last_seen_at     timestamptz
);

-- ============================================================
-- TABLES
-- ============================================================
create table tables (
  id       int primary key,
  name     text not null,
  capacity int not null,
  status   text not null default 'available'
           check (status in ('available','occupied','reserved','maintenance'))
);

insert into tables (id, name, capacity) values
  (1,  'Table 1',  2),
  (2,  'Table 2',  6),
  (3,  'Table 3',  4),
  (4,  'Table 4',  4),
  (5,  'Table 5',  6),
  (6,  'Table 6',  6),
  (7,  'Table 7',  6),
  (8,  'Table 8',  2),
  (9,  'Table 9',  2),
  (10, 'Table 10', 12);

-- ============================================================
-- SESSIONS
-- ============================================================
create table sessions (
  id             uuid primary key default gen_random_uuid(),
  table_id       int not null references tables(id),
  host_player_id uuid references players(id),
  start_time     timestamptz not null default now(),
  end_time       timestamptz,
  status         text not null default 'active'
                 check (status in ('active','billing','completed','cancelled','abandoned')),
  player_count   int not null default 1,
  rate_type      text not null default 'walk-in'
                 check (rate_type in ('walk-in','group','monthly')),
  gaming_total   numeric(10,2) not null default 0,
  food_total     numeric(10,2) not null default 0,
  tip_amount     numeric(10,2) not null default 0,
  total_amount   numeric(10,2) not null default 0,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- SESSION_PLAYERS
-- ============================================================
create table session_players (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null references sessions(id) on delete cascade,
  player_id        uuid not null references players(id),
  joined_at        timestamptz not null default now(),
  left_at          timestamptz,
  duration_minutes int,
  rate_type        text not null default 'walk-in'
                   check (rate_type in ('walk-in','group','founders','monthly')),
  individual_amount numeric(10,2) not null default 0,
  stamp_earned     boolean not null default false,
  is_courtesy      boolean not null default false,
  unique (session_id, player_id)
);

-- ============================================================
-- SESSION_RATE_EVENTS
-- Tracks rate changes mid-session for accurate billing
-- ============================================================
create table session_rate_events (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references sessions(id) on delete cascade,
  player_id    uuid references players(id),  -- null = applies to all active players
  event_type   text not null check (event_type in ('start','player_join','player_leave','rate_change')),
  rate_type    text not null check (rate_type in ('walk-in','group','founders','monthly')),
  player_count int not null,
  occurred_at  timestamptz not null default now()
);

-- ============================================================
-- SESSION_END_REQUESTS
-- Player-initiated end requests, must be approved by staff
-- ============================================================
create table session_end_requests (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references sessions(id) on delete cascade,
  requested_by uuid not null references players(id),
  status       text not null default 'pending'
               check (status in ('pending','approved','rejected')),
  created_at   timestamptz not null default now(),
  resolved_at  timestamptz,
  resolved_by  text
);

-- ============================================================
-- GAMES
-- ============================================================
create table games (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     text not null
               check (category in (
                 'Strategy','Party','Quick','Social',
                 '2-Player','Classic','Co-op','Push Your Luck'
               )),
  min_players  int not null,
  max_players  int not null,
  time_estimate text not null,
  description  text,
  is_available boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- MENU_ITEMS
-- ============================================================
create table menu_items (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  category         text not null
                   check (category in ('Combos','Bites','Chillers','Limes','Hot','Water')),
  price            numeric(10,2) not null,
  is_veg           boolean not null default true,
  emoji            text,
  description      text,
  stock            int,  -- null = unlimited
  is_available     boolean not null default true,
  is_daily_special boolean not null default false,
  is_seasonal      boolean not null default false,
  is_new           boolean not null default false,
  savings_amount   numeric(10,2),
  combo_contents   text,
  added_at         timestamptz not null default now()
);

-- ============================================================
-- ORDERS
-- ============================================================
create table orders (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id),
  table_id   int references tables(id),
  player_id  uuid references players(id),
  status     text not null default 'pending'
             check (status in ('pending','preparing','ready','delivered','cancelled')),
  total      numeric(10,2) not null default 0,
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- ORDER_ITEMS
-- ============================================================
create table order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references orders(id) on delete cascade,
  item_id    uuid not null references menu_items(id),
  quantity   int not null default 1,
  unit_price numeric(10,2) not null,
  subtotal   numeric(10,2) not null
);

-- ============================================================
-- BOOKINGS
-- ============================================================
create table bookings (
  id                uuid primary key default gen_random_uuid(),
  player_id         uuid references players(id),
  table_id          int references tables(id),
  booking_date      date not null,
  time_slot         time not null,
  party_size        int not null,
  deposit_amount    numeric(10,2) not null,
  deposit_paid      boolean not null default false,
  deposit_forfeited boolean not null default false,
  status            text not null default 'pending'
                    check (status in ('pending','confirmed','cancelled','no-show','completed')),
  is_corporate      boolean not null default false,
  company_name      text,
  notes             text,
  cancelled_at      timestamptz,
  created_at        timestamptz not null default now()
);

-- ============================================================
-- TRANSACTIONS
-- ============================================================
create table transactions (
  id          uuid primary key default gen_random_uuid(),
  player_id   uuid references players(id),
  session_id  uuid references sessions(id),
  booking_id  uuid references bookings(id),
  type        text not null
              check (type in (
                'session_charge','food_charge','tip',
                'referral_credit','loyalty_redeem',
                'deposit_paid','deposit_deducted',
                'membership_purchase','manual_credit'
              )),
  amount      numeric(10,2) not null,  -- positive = credit, negative = debit
  description text,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- APP_CONFIG (single-row settings)
-- ============================================================
create table app_config (
  id                   int primary key default 1 check (id = 1),
  wifi_name            text not null default 'Pakida_Guest',
  wifi_password        text not null default 'playandchill',
  admin_pin            text not null default '7364',
  staff_pin            text not null default '1234',
  monday_open          boolean not null default false,
  founders_slots_total int not null default 50,
  founders_slots_used  int not null default 0,
  is_open              boolean not null default true,
  upi_id               text not null default 'ashinaustrin740@fbl',
  upi_name             text not null default 'ASHIN AND ASTRIN ENTERTAINMENTS LLP B',
  owner_whatsapp       text not null default '918547183423'
);

insert into app_config default values;

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_sessions_table_status     on sessions(table_id, status);
create index idx_sessions_status           on sessions(status);
create index idx_session_players_session   on session_players(session_id);
create index idx_session_players_player    on session_players(player_id);
create index idx_session_rate_events_sess  on session_rate_events(session_id);
create index idx_session_end_requests_sess on session_end_requests(session_id, status);
create index idx_orders_session            on orders(session_id);
create index idx_orders_status             on orders(status);
create index idx_bookings_date             on bookings(booking_date);
create index idx_bookings_player           on bookings(player_id);
create index idx_transactions_player       on transactions(player_id);
create index idx_players_phone             on players(phone);
create index idx_players_referral          on players(referral_code);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table players              enable row level security;
alter table tables               enable row level security;
alter table sessions             enable row level security;
alter table session_players      enable row level security;
alter table session_rate_events  enable row level security;
alter table session_end_requests enable row level security;
alter table games                enable row level security;
alter table menu_items           enable row level security;
alter table orders               enable row level security;
alter table order_items          enable row level security;
alter table bookings             enable row level security;
alter table transactions         enable row level security;
alter table app_config           enable row level security;

-- Public read policies
create policy "Public read tables"       on tables       for select using (true);
create policy "Public read games"        on games        for select using (true);
create policy "Public read menu_items"   on menu_items   for select using (true);
create policy "Public read app_config"   on app_config   for select using (true);

-- Players
create policy "Anyone read players"   on players for select using (true);
create policy "Anyone insert players" on players for insert with check (true);
create policy "Anyone update players" on players for update using (true);

-- Sessions
create policy "Anyone read sessions"   on sessions for select using (true);
create policy "Anyone insert sessions" on sessions for insert with check (true);
create policy "Anyone update sessions" on sessions for update using (true);

-- Session players
create policy "Anyone read session_players"   on session_players for select using (true);
create policy "Anyone insert session_players" on session_players for insert with check (true);
create policy "Anyone update session_players" on session_players for update using (true);

-- Session rate events
create policy "Anyone read session_rate_events"   on session_rate_events for select using (true);
create policy "Anyone insert session_rate_events" on session_rate_events for insert with check (true);

-- Session end requests
create policy "Anyone read session_end_requests"   on session_end_requests for select using (true);
create policy "Anyone insert session_end_requests" on session_end_requests for insert with check (true);
create policy "Anyone update session_end_requests" on session_end_requests for update using (true);

-- Orders
create policy "Anyone read orders"   on orders for select using (true);
create policy "Anyone insert orders" on orders for insert with check (true);
create policy "Anyone update orders" on orders for update using (true);

-- Order items
create policy "Anyone read order_items"   on order_items for select using (true);
create policy "Anyone insert order_items" on order_items for insert with check (true);

-- Bookings
create policy "Anyone read bookings"   on bookings for select using (true);
create policy "Anyone insert bookings" on bookings for insert with check (true);
create policy "Anyone update bookings" on bookings for update using (true);

-- Transactions
create policy "Anyone read transactions"   on transactions for select using (true);
create policy "Anyone insert transactions" on transactions for insert with check (true);

-- App config
create policy "Anyone read app_config"   on app_config for select using (true);
create policy "Anyone update app_config" on app_config for update using (true);

-- ============================================================
-- FOUNDERS SLOT CLAIM (atomic RPC to prevent race conditions)
-- ============================================================
create or replace function claim_founders_slot()
returns table(slot_number int, success boolean)
language plpgsql
as $$
declare
  v_used int;
  v_total int;
  v_slot int;
begin
  -- Lock the config row
  select founders_slots_used, founders_slots_total
  into v_used, v_total
  from app_config
  where id = 1
  for update;

  if v_used >= v_total then
    return query select 0, false;
    return;
  end if;

  v_slot := v_used + 1;

  update app_config
  set founders_slots_used = v_slot
  where id = 1;

  return query select v_slot, true;
end;
$$;

-- ============================================================
-- REALTIME: Add tables to publication
-- Run these separately in Supabase SQL Editor after migration:
-- alter publication supabase_realtime add table tables;
-- alter publication supabase_realtime add table sessions;
-- alter publication supabase_realtime add table session_players;
-- alter publication supabase_realtime add table orders;
-- alter publication supabase_realtime add table session_end_requests;
-- ============================================================
