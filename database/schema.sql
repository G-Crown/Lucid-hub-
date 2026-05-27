-- ============================================================
-- LUCID HUB — Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  full_name     TEXT NOT NULL DEFAULT '',
  role          TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin','member','mentor','mentee')),
  avatar_url    TEXT,
  phone         TEXT,
  location      TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on sign-up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name',''));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title             TEXT NOT NULL,
  description       TEXT NOT NULL DEFAULT '',
  event_type        TEXT NOT NULL CHECK (event_type IN ('webinar','conference','training')),
  event_date        TIMESTAMPTZ NOT NULL,
  end_date          TIMESTAMPTZ,
  location          TEXT NOT NULL DEFAULT 'Online',
  price             NUMERIC(10,2) NOT NULL DEFAULT 0,
  capacity          INT NOT NULL DEFAULT 100,
  registered_count  INT NOT NULL DEFAULT 0,
  is_virtual        BOOLEAN NOT NULL DEFAULT TRUE,
  is_published      BOOLEAN NOT NULL DEFAULT FALSE,
  cover_image_url   TEXT,
  zoom_link         TEXT,
  speaker_names     TEXT[],
  tags              TEXT[],
  created_by        UUID REFERENCES profiles(id),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EVENT REGISTRATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id     UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES profiles(id),
  full_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  status       TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered','attended','cancelled')),
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-increment registered_count
CREATE OR REPLACE FUNCTION increment_registration_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE events SET registered_count = registered_count + 1 WHERE id = NEW.event_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_event_registration
  AFTER INSERT ON event_registrations
  FOR EACH ROW EXECUTE FUNCTION increment_registration_count();

-- ============================================================
-- MENTORSHIP PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS mentorship_profiles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  role            TEXT NOT NULL CHECK (role IN ('mentor','mentee')),
  full_name       TEXT NOT NULL,
  bio             TEXT NOT NULL DEFAULT '',
  expertise       TEXT[] DEFAULT '{}',
  goals           TEXT DEFAULT '',
  industry        TEXT DEFAULT '',
  years_experience INT DEFAULT 0,
  linkedin_url    TEXT,
  is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  is_available    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MENTORSHIP PAIRS
-- ============================================================
CREATE TABLE IF NOT EXISTS mentorship_pairs (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id        UUID NOT NULL REFERENCES mentorship_profiles(id),
  mentee_id        UUID NOT NULL REFERENCES mentorship_profiles(id),
  status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','completed','paused')),
  goal             TEXT NOT NULL DEFAULT '',
  duration_months  INT NOT NULL DEFAULT 6,
  progress_percent INT NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  notes            TEXT,
  started_at       TIMESTAMPTZ,
  ended_at         TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DONATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS donations (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name          TEXT NOT NULL,
  donor_email         TEXT NOT NULL,
  amount              NUMERIC(12,2) NOT NULL,
  tier                TEXT NOT NULL CHECK (tier IN ('spark','growth','community','partner')),
  is_recurring        BOOLEAN NOT NULL DEFAULT FALSE,
  payment_reference   TEXT UNIQUE,
  payment_channel     TEXT DEFAULT 'paystack',
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','completed','failed','refunded')),
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RESOURCES (Learning Hub)
-- ============================================================
CREATE TABLE IF NOT EXISTS resources (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  description     TEXT NOT NULL DEFAULT '',
  resource_type   TEXT NOT NULL CHECK (resource_type IN ('video','pdf','article','framework')),
  category        TEXT NOT NULL CHECK (category IN ('leadership','eq','finance','health','spiritual','community')),
  url             TEXT NOT NULL,
  thumbnail_url   TEXT,
  duration_label  TEXT,
  author          TEXT NOT NULL DEFAULT 'Lucid Hub',
  is_published    BOOLEAN NOT NULL DEFAULT FALSE,
  view_count      INT NOT NULL DEFAULT 0,
  created_by      UUID REFERENCES profiles(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email        TEXT NOT NULL UNIQUE,
  full_name    TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name  TEXT NOT NULL,
  author_title TEXT NOT NULL,
  content      TEXT NOT NULL,
  rating       INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_featured  BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Profiles: users can read their own; admins can read all
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile"        ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"      ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles"      ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Events: published events are public; admin can manage all
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published events"  ON events FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can manage events"          ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Registrations: users can create; admins can view all
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register"               ON event_registrations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can view own registrations"  ON event_registrations FOR SELECT USING (email = (SELECT email FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Admins can view all registrations" ON event_registrations FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Donations: anyone can insert; only admins can view all
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can donate"                 ON donations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins can view donations"         ON donations FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Resources: published resources are public
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published resources" ON resources FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can manage resources"         ON resources FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Newsletter: public insert only
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe"              ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);

-- Contact: public insert only
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message"         ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins can view messages"          ON contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Testimonials: published ones are public
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can manage testimonials"         ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Mentorship: authenticated users can apply; admins can manage
ALTER TABLE mentorship_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can create profile" ON mentorship_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own mentorship profile"  ON mentorship_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage mentorship profiles"  ON mentorship_profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

ALTER TABLE mentorship_pairs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Participants can view their pairs"  ON mentorship_pairs FOR SELECT USING (
  mentor_id IN (SELECT id FROM mentorship_profiles WHERE user_id = auth.uid()) OR
  mentee_id IN (SELECT id FROM mentorship_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Admins can manage pairs"            ON mentorship_pairs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- SEED: Admin user (run after creating account in Supabase Auth)
-- Replace the UUID with your actual admin user UUID.
-- ============================================================
-- UPDATE profiles SET role = 'admin' WHERE email = 'lucidhub.info@gmail.com';
