-- Supabase is used as the database only. Authentication/email delivery is handled by our API + your SMTP account.
create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  password_hash text not null,
  email_verified boolean not null default false,
  verification_token_hash text,
  verification_expires_at timestamptz,
  reset_token_hash text,
  reset_expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists users_verification_token_hash_idx on public.users(verification_token_hash);
create index if not exists users_reset_token_hash_idx on public.users(reset_token_hash);

alter table public.users enable row level security;
-- No public policies are created intentionally. The server uses the Supabase service-role key.
