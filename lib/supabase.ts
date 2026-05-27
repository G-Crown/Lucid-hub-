import { createBrowserClient } from '@supabase/ssr'

// ── Browser client (use in Client Components) ──────────────────
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ── Type definitions matching the database schema ──────────────
export type Event = {
  id: string
  title: string
  description: string
  event_type: 'webinar' | 'conference' | 'training'
  event_date: string
  location: string
  price: number
  capacity: number
  registered_count: number
  is_virtual: boolean
  is_published: boolean
  created_at: string
}

export type MentorshipProfile = {
  id: string
  user_id: string
  role: 'mentor' | 'mentee'
  full_name: string
  bio: string
  expertise: string[]
  goals: string
  industry: string
  is_verified: boolean
  is_available: boolean
  created_at: string
}

export type MentorshipPair = {
  id: string
  mentor_id: string
  mentee_id: string
  status: 'pending' | 'active' | 'completed' | 'paused'
  goal: string
  duration_months: number
  progress_percent: number
  started_at: string | null
  created_at: string
}

export type Donation = {
  id: string
  donor_name: string
  donor_email: string
  amount: number
  tier: 'spark' | 'growth' | 'community' | 'partner'
  is_recurring: boolean
  payment_reference: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export type Resource = {
  id: string
  title: string
  description: string
  resource_type: 'video' | 'pdf' | 'article' | 'framework'
  category: 'leadership' | 'eq' | 'finance' | 'health' | 'spiritual' | 'community'
  url: string
  duration_label: string | null
  author: string
  is_published: boolean
  created_at: string
}

export type Profile = {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'member' | 'mentor' | 'mentee'
  avatar_url: string | null
  created_at: string
}
