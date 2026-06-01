'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Events',      href: '/events' },
  { label: 'Mentorship',  href: '/mentorship' },
  { label: 'Give',        href: '/donate' },
  { label: 'Learning Hub',href: '/learning' },
  { label: 'About',       href: '/about' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[72px] transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,22,40,0.97)] backdrop-blur-xl border-b border-white/[0.08]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo-blue-bg.jpg"
            alt="Lucid Hub"
            width={110}
            height={42}
            className="rounded-md object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                pathname === link.href
                  ? 'text-[#F5AB00]'
                  : 'text-white/70 hover:text-[#F5AB00]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/donate"
            className="hidden md:inline-flex bg-[#F5AB00] text-[#0A1628] px-5 py-2 rounded text-sm font-bold hover:bg-[#FFD54F] transition-colors"
          >
            Support Us
          </Link>
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-[72px] left-0 right-0 z-40 bg-[rgba(10,22,40,0.99)] border-b border-white/[0.08] px-[5%] flex flex-col gap-1 transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 py-5' : 'max-h-0 py-0'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium py-3 border-b border-white/[0.07] transition-colors ${
              pathname === link.href ? 'text-[#F5AB00]' : 'text-white/70'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/donate"
          className="mt-4 block text-center bg-[#F5AB00] text-[#0A1628] py-3 rounded text-sm font-bold"
        >
          Support Us
        </Link>
        <Link
          href="/contact"
          className="block text-center border border-white/20 text-white py-3 rounded text-sm font-medium mt-2"
        >
          Contact
        </Link>
      </div>
    </>
  )
}
