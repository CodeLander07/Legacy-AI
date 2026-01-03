-- Create the memories table
create table if not exists memories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  tags text[],
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table memories enable row level security;

-- Create policies

-- 1. INSERT POLICY
create policy "Users can insert their own memories"
  on memories for insert
  with check (auth.uid() = user_id);

-- 2. SELECT POLICY
create policy "Users can view their own memories"
  on memories for select
  using (auth.uid() = user_id);

-- 3. UPDATE POLICY
create policy "Users can update their own memories"
  on memories for update
  using (auth.uid() = user_id);

-- 4. DELETE POLICY
create policy "Users can delete their own memories"
  on memories for delete
  using (auth.uid() = user_id);
