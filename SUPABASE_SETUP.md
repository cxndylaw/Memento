# 🗄️ Supabase Database Setup

Complete step-by-step guide to set up your Supabase database for Memento.

## Step 1: Create Supabase Account & Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or sign in
3. Create new project:
   - Name: `memento` (or whatever you want)
   - Password: Create a strong password
   - Region: Choose closest to you
   - Click "Create new project"
4. Wait ~2 minutes for setup (grab a coffee ☕)

## Step 2: Get Your Credentials

Once your project is ready:

1. Go to **Project Settings** (⚙️ icon bottom left)
2. Click **API** tab
3. Copy these two values:
   - **Project URL** (under "Project URL")
   - **Anon/Public Key** (under "Project API keys")
4. Paste them into `.env.local`:
   ```
   VITE_SUPABASE_URL=paste_project_url_here
   VITE_SUPABASE_ANON_KEY=paste_anon_key_here
   ```

## Step 3: Create Database Tables

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste this entire SQL:

```sql
-- Users table (Supabase Auth handles this, but we reference it)
-- No need to create - Supabase manages this

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT,
  description TEXT,
  theme TEXT DEFAULT 'minimal',
  dress_code TEXT,
  rsvp_deadline DATE,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- RSVPs table
CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  rsvp_status TEXT NOT NULL,
  plus_one INTEGER DEFAULT 0,
  dietary_requirements TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Wishlist items table
CREATE TABLE wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  reserved_by TEXT,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Users can view their own events"
ON events FOR SELECT
USING (auth.uid() = host_id);

CREATE POLICY "Users can create events"
ON events FOR INSERT
WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Users can update their own events"
ON events FOR UPDATE
USING (auth.uid() = host_id);

CREATE POLICY "Users can delete their own events"
ON events FOR DELETE
USING (auth.uid() = host_id);

-- RLS Policies for RSVPs (public read/write for guests)
CREATE POLICY "Anyone can view RSVPs"
ON rsvps FOR SELECT
USING (true);

CREATE POLICY "Anyone can create RSVPs"
ON rsvps FOR INSERT
WITH CHECK (true);

-- RLS Policies for wishlist items
CREATE POLICY "Anyone can view wishlist"
ON wishlist_items FOR SELECT
USING (true);

CREATE POLICY "Anyone can manage wishlist"
ON wishlist_items FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update wishlist"
ON wishlist_items FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete wishlist"
ON wishlist_items FOR DELETE
USING (true);

-- Create indexes for performance
CREATE INDEX idx_events_host_id ON events(host_id);
CREATE INDEX idx_rsvps_event_id ON rsvps(event_id);
CREATE INDEX idx_wishlist_event_id ON wishlist_items(event_id);
```

4. Click **Run** (▶️ button)
5. You should see "Success" messages
6. Done! ✅

## Step 4: Test Connection

Back in your project:

1. Edit `.env.local` with your credentials (if you haven't)
2. Run `npm run dev`
3. Go to `http://localhost:3000`
4. Try to sign up with an email
5. Create an event
6. If it works → You're all set! 🎉

## What Each Table Does

### `events`
Stores event information:
- `host_id` - Who created it
- `name` - Event name
- `date` & `time` - When
- `location` - Where
- `description` - Details
- `theme` - Visual style
- `slug` - Unique URL slug

### `rsvps`
Guest responses:
- `event_id` - Which event
- `guest_name` - Who's responding
- `rsvp_status` - yes/no/maybe
- `plus_one` - Bringing guests?
- `dietary_requirements` - Food needs
- `message` - Message to host

### `wishlist_items`
Gift wishlist:
- `event_id` - Which event
- `item_name` - What gift
- `reserved_by` - Who claimed it

## Troubleshooting

### "Project URL or API Key not found"
- Go to Project Settings → API
- Copy values again (they're under "Project API keys")

### "Error: relation 'events' does not exist"
- Run the SQL query again
- Make sure you clicked **Run**
- Check for errors in the output

### "403 Error when signing up"
- Check that RLS policies are enabled
- Re-run the SQL (policies section)

### "Can't connect to database"
- Verify `.env.local` has correct credentials
- Make sure Supabase project is active
- Restart dev server: `npm run dev`

## Enable Realtime (Optional)

To get real-time RSVP updates:

1. In Supabase, go to **Replication** (left sidebar)
2. Enable replication for:
   - `events`
   - `rsvps`
   - `wishlist_items`
3. The app will automatically use realtime subscriptions

## Backup Your Data

Supabase backs up automatically, but to be safe:

1. Go to **Database** → **Backups**
2. Enable automatic backups
3. You can manually export data anytime

## Next Steps

✅ Database is set up  
→ Go to `GITHUB_SETUP.md` to deploy  
or  
→ Run `npm run dev` to test locally  

---

**Database ready?** Time to test locally or deploy! 🚀
