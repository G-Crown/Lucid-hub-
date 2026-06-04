
-- ============================================================
-- LUCID HUB PLATFORM SCHEMA v2
-- Production-ready starter schema for Supabase
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'member'
    CHECK (role IN ('super_admin','admin','member')),
  avatar_url TEXT,
  phone TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO profiles(id,email,full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name','')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  event_type TEXT NOT NULL CHECK (event_type IN ('webinar','conference','training')),
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT DEFAULT 'Online',
  is_virtual BOOLEAN DEFAULT true,
  price NUMERIC(10,2) DEFAULT 0,
  capacity INT DEFAULT 100,
  registered_count INT DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  cover_image_url TEXT,
  meeting_link TEXT,
  speaker_names TEXT[],
  tags TEXT[],
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

DROP TRIGGER IF EXISTS events_updated_at ON events;
CREATE TRIGGER events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'registered'
    CHECK (status IN ('registered','attended','cancelled')),
  registered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id,email)
);

CREATE OR REPLACE FUNCTION increment_registration_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events
  SET registered_count = registered_count + 1
  WHERE id = NEW.event_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_event_registration ON event_registrations;

CREATE TRIGGER on_event_registration
AFTER INSERT ON event_registrations
FOR EACH ROW
EXECUTE FUNCTION increment_registration_count();

-- ============================================================
-- MENTORSHIP
-- ============================================================
CREATE TABLE IF NOT EXISTS mentorship_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('mentor','mentee')),
  bio TEXT DEFAULT '',
  expertise TEXT[] DEFAULT '{}',
  goals TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  years_experience INT DEFAULT 0,
  linkedin_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

DROP TRIGGER IF EXISTS mentorship_profiles_updated_at ON mentorship_profiles;
CREATE TRIGGER mentorship_profiles_updated_at
BEFORE UPDATE ON mentorship_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS mentorship_pairs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID NOT NULL REFERENCES mentorship_profiles(id),
  mentee_id UUID NOT NULL REFERENCES mentorship_profiles(id),
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','active','completed','paused')),
  progress_percent INT DEFAULT 0 CHECK(progress_percent BETWEEN 0 AND 100),
  goal TEXT DEFAULT '',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CHECK (mentor_id <> mentee_id)
);

-- ============================================================
-- LEARNING HUB
-- ============================================================
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  resource_type TEXT NOT NULL
    CHECK(resource_type IN ('video','pdf','article','framework')),
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  access_level TEXT NOT NULL DEFAULT 'public'
    CHECK(access_level IN ('public','member_only')),
  is_published BOOLEAN DEFAULT false,
  author TEXT DEFAULT 'Lucid Hub',
  view_count INT DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- DONATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  provider TEXT NOT NULL
    CHECK(provider IN ('paystack','flutterwave')),
  payment_reference TEXT UNIQUE,
  status TEXT DEFAULT 'pending'
    CHECK(status IN ('pending','completed','failed','refunded')),
  is_recurring BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- COMMUNITY
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  author_title TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK(rating BETWEEN 1 AND 5),
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_resources_published ON resources(is_published);

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_pairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profile_self_select"
ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "admin_manage_profiles"
ON profiles FOR ALL USING (
 EXISTS (
  SELECT 1 FROM profiles p
  WHERE p.id = auth.uid()
  AND p.role IN ('super_admin','admin')
 )
);

CREATE POLICY "public_events"
ON events FOR SELECT USING (is_published = true);

CREATE POLICY "admin_manage_events"
ON events FOR ALL USING (
 EXISTS (
  SELECT 1 FROM profiles p
  WHERE p.id = auth.uid()
  AND p.role IN ('super_admin','admin')
 )
);

CREATE POLICY "register_event"
ON event_registrations FOR INSERT WITH CHECK (true);

CREATE POLICY "public_resources"
ON resources FOR SELECT USING (
 is_published = true AND access_level = 'public'
);

CREATE POLICY "member_resources"
ON resources FOR SELECT USING (
 is_published = true
 AND access_level = 'member_only'
 AND auth.uid() IS NOT NULL
);

CREATE POLICY "donation_insert"
ON donations FOR INSERT WITH CHECK (true);

CREATE POLICY "newsletter_insert"
ON newsletter_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "contact_insert"
ON contact_messages FOR INSERT WITH CHECK (true);

-- Promote first account manually:
-- UPDATE profiles
-- SET role='super_admin'
-- WHERE email='your@email.com';
