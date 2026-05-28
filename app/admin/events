import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Dashboard' }

const STATS = [
  { label: 'Total Members',    value: '12,847', change: '+234 this month', icon: '👥', color: 'text-[#1A1AFF]' },
  { label: 'Active Events',    value: '6',      change: '3 upcoming',      icon: '📅', color: 'text-[#F5AB00]' },
  { label: 'Mentor Pairs',     value: '48',     change: '5 pending match', icon: '🤝', color: 'text-teal-400' },
  { label: 'Donations (Q2)',   value: '₦2.4M',  change: '+18% vs Q1',     icon: '💰', color: 'text-[#F5AB00]' },
]

const RECENT_REGISTRATIONS = [
  { name: 'Adaeze Okonkwo', event: 'Leadership in the AI Era', date: '2 hrs ago', status: 'Confirmed' },
  { name: 'Bayo Martins',   event: 'Digital Media Mastery',   date: '5 hrs ago', status: 'Confirmed' },
  { name: 'Chioma Ike',     event: 'Lucid Summit 2025',       date: '1 day ago', status: 'Pending' },
  { name: 'Folake Mensah',  event: 'Leadership in the AI Era', date: '1 day ago', status: 'Confirmed' },
  { name: 'Emeka Nwosu',    event: 'Digital Media Mastery',   date: '2 days ago', status: 'Cancelled' },
]

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm">Welcome back. Here's what's happening at Lucid Hub.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{s.change}</span>
            </div>
            <div className={`font-serif text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent registrations */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white text-sm">Recent Registrations</h2>
            <Link href="/admin/events" className="text-[#F5AB00] text-xs hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {RECENT_REGISTRATIONS.map((r) => (
              <div key={r.name + r.event} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
                <div>
                  <p className="text-white text-sm font-medium">{r.name}</p>
                  <p className="text-white/40 text-xs">{r.event} · {r.date}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  r.status === 'Confirmed' ? 'bg-teal-400/15 text-teal-400' :
                  r.status === 'Pending'   ? 'bg-[#F5AB00]/15 text-[#F5AB00]' :
                                             'bg-red-400/15 text-red-400'
                }`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
          <h2 className="font-semibold text-white text-sm mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Create Event',       href: '/admin/events',      icon: '📅' },
              { label: 'Review Mentorship',  href: '/admin/mentorship',  icon: '🤝' },
              { label: 'Manage Users',       href: '/admin/users',       icon: '👥' },
              { label: 'Upload Resource',    href: '/admin/resources',   icon: '📚' },
              { label: 'View Messages',      href: '/admin/settings',    icon: '✉️' },
              { label: 'Site Settings',      href: '/admin/settings',    icon: '⚙️' },
            ].map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-4 hover:border-[#1A1AFF] hover:bg-[#1A1AFF]/10 transition-all"
              >
                <span className="text-xl">{a.icon}</span>
                <span className="text-white text-xs font-medium">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
