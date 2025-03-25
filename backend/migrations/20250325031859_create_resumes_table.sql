-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 1: Create a new column `uuid_id` with UUID type
ALTER TABLE users ADD COLUMN uuid_id UUID DEFAULT gen_random_uuid();

-- Step 2: Populate `uuid_id` with new UUIDs
UPDATE users SET uuid_id = gen_random_uuid();

-- Step 3: Set `uuid_id` as the new primary key
ALTER TABLE users DROP CONSTRAINT users_pkey;
ALTER TABLE users ADD PRIMARY KEY (uuid_id);

-- Step 4: Remove the old `id` column
ALTER TABLE users DROP COLUMN id;

-- Step 5: Rename `uuid_id` to `id`
ALTER TABLE users RENAME COLUMN uuid_id TO id;

-- Step 6: Create `resumes` table with UUID foreign key reference
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    experience TEXT NOT NULL,
    skills TEXT[] NOT NULL, -- Storing skills as an array
    created_at TIMESTAMP DEFAULT now()
);
