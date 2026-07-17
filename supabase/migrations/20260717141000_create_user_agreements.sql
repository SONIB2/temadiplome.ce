create table if not exists user_agreements (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  university text,
  study_field text,
  signature_name text,
  accepted_terms boolean default false,
  accepted_privacy boolean default false,
  accepted_academic_integrity boolean default false,
  agreement_version text,
  created_at timestamptz default now()
);

alter table user_agreements enable row level security;

drop policy if exists "Allow public insert user agreements" on user_agreements;

create policy "Allow public insert user agreements"
on user_agreements
for insert
to anon
with check (true);