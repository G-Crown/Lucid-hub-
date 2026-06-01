import Link from 'next/link'
import Image from 'next/image'

const LINKS = {
  Programmes: [
    { label: 'Events & Webinars',  href: '/events' },
    { label: 'Skill Training',     href: '/events' },
    { label: 'Conferences',        href: '/events' },
    { label: 'Mentorship Portal',  href: '/mentorship' },
  ],
  Resources: [
    { label: 'Learning Hub',       href: '/learning' },
    { label: 'Frameworks & Tools', href: '/learning' },
    { label: 'Video Library',      href: '/learning' },
    { label: 'Lucid Spark Series', href: '/learning' },
  ],
  Organisation: [
    { label: 'About Lucid Hub',    href: '/about' },
    { label: 'Impact Reports',     href: '/donate' },
    { label: 'Donate',             href: '/donate' },
    { label: 'Contact Us',         href: '/contact' },
  ],
}

const SOCIALS = [
  { label: 'LinkedIn', symbol: 'in', href: '#' },
  { label: 'Facebook', symbol: 'f',  href: '#' },
  { label: 'Twitter',  symbol: '𝕏',  href: '#' },
  { label: 'YouTube',  symbol: '▶',  href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] border-t border-white/[0.08] pt-16 pb-8 px-[5%]">
      <div className="max-w-6xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logo-blue-bg.jpg"
                alt="Lucid Hub"
                width={120}
                height={46}
                className="rounded-md mb-4 object-contain"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Equipping the next generation of African leaders through world-class
              mentorship, live training, and transformative community.
            </p>
            <a
              href="mailto:lucidhub.info@gmail.com"
              className="inline-flex items-center gap-2 text-[#F5AB00] text-sm mt-4 hover:text-[#FFD54F] transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              lucidhub.info@gmail.com
            </a>
            <p className="text-white/20 text-xs font-bold tracking-[0.12em] uppercase mt-6 pt-4 border-t border-white/[0.08]">
              Inspire . Empower . Transform.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white/35 text-xs font-bold uppercase tracking-[0.12em] mb-5">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 text-sm hover:text-[#F5AB00] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Lucid Hub. All rights reserved. Built with purpose.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded flex items-center justify-center bg-white/[0.05] border border-white/[0.08] text-white/40 text-xs font-semibold hover:bg-[#F5AB00] hover:border-[#F5AB00] hover:text-[#0A1628] transition-all"
              >
                {s.symbol}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
