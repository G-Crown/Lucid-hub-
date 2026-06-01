import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

type CookieToSet = { name: string; value: string; options?: Record<string, unknown> }

// ── Server-side Supabase client (use in Server Components / API routes) ──
export async function createServerSupabase() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as never)
            )
          } catch {
            // Server Component — cookies can only be set in middleware / route handlers
          }
        },
      },
    }
  )
}

// ── Get current logged-in user (server-side) ──────────────────
export async function getCurrentUser() {
  const supabase = await createServerSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

// ── Get user profile with role ────────────────────────────────
export async function getUserProfile(userId: string) {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data
}

// ── Check if user is admin ────────────────────────────────────
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  const profile = await getUserProfile(user.id)
  return profile?.role === 'admin'
}
