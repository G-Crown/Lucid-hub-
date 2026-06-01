'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Dashboard',   href: '/admin/dashboard',  icon: '📊' },
  { label: 'Events',      href: '/admin/events',      icon: '📅' },
  { label: 'Mentorship',  href: '/admin/mentorship',  icon: '🤝' },
  { label: 'Users',       href: '/admin/users',       icon: '👥' },
  { label: 'Resources',   href: '/admin/resources',   icon: '📚' },
  { label: 'Settings',    href: '/admin/settings',    icon: '⚙️' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] shrink-0 bg-[#0E1F3D] border-r border-white/[0.08] flex flex-col min-h-screen sticky top-0">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.08]">
        <Link href="/">
          <Image
            src="/images/logo-blue-bg.jpg"
            alt="Lucid Hub"
            width={110}
            height={42}
            className="rounded-md object-contain"
          />
        </Link>
        <p className="text-white/30 text-[0.65rem] uppercase tracking-widest mt-2 font-semibold">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#1A1AFF] text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-white/[0.08] space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#F5AB00] flex items-center justify-center text-[#0A1628] text-xs font-bold shrink-0">
            GC
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-xs font-semibold truncate">G.Crown</p>
            <p className="text-white/35 text-[0.65rem] truncate">lucidhub.info@gmail.com</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-white/35 text-xs hover:text-white/60 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Back to Site
        </Link>
      </div>
    </aside>
  )
}
