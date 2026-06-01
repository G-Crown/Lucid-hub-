'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(ease * target).toLocaleString()
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])
  return ref
}

export default function Hero() {
  const count1 = useCountUp(12000)
  const count2 = useCountUp(340)
  const count3 = useCountUp(19)

  return (
    <section className="relative min-h-screen bg-[#0A1628] flex items-center px-[5%] pt-28 pb-20 overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 hero-grid-bg" />

      {/* Glow orbs */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-[#1A1AFF]/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-[10%] w-[400px] h-[400px] rounded-full bg-[#F5AB00]/08 blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[700px]">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-[#F5AB00]/10 border border-[#F5AB00]/30 rounded-full px-4 py-1.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5AB00] animate-pulse-dot" />
          <span className="text-[#F5AB00] text-xs font-bold tracking-[0.1em] uppercase">Leadership Development Platform</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(2.8rem,5vw,4.4rem)] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6">
          Where Leaders Are<br />
          <em className="italic text-[#F5AB00]">Forged,</em> Not Found.
        </h1>

        {/* Description */}
        <p className="text-white/60 text-[1.1rem] leading-[1.8] max-w-[520px] mb-10">
          Lucid Hub equips the next generation of African leaders through
          world-class mentorship, live training programmes, and a
          transformative community built on purpose.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-14">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-[#F5AB00] text-[#0A1628] px-7 py-3.5 rounded text-sm font-bold hover:bg-[#FFD54F] transition-all hover:-translate-y-0.5"
          >
            Explore Programmes
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/mentorship"
            className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-7 py-3.5 rounded text-sm font-medium hover:border-white/60 hover:bg-white/5 transition-all"
          >
            Apply for Mentorship →
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/[0.08] max-w-[480px]">
          <div>
            <div className="font-serif text-[2rem] font-bold text-white flex items-baseline gap-0.5">
              <span ref={count1}>0</span>
              <span className="text-[#F5AB00] text-xl">+</span>
            </div>
            <div className="text-white/40 text-[0.72rem] uppercase tracking-[0.06em] mt-1">Leaders Trained</div>
          </div>
          <div>
            <div className="font-serif text-[2rem] font-bold text-white flex items-baseline gap-0.5">
              <span ref={count2}>0</span>
              <span className="text-[#F5AB00] text-xl">+</span>
            </div>
            <div className="text-white/40 text-[0.72rem] uppercase tracking-[0.06em] mt-1">Mentors</div>
          </div>
          <div>
            <div className="font-serif text-[2rem] font-bold text-white flex items-baseline gap-0.5">
              <span ref={count3}>0</span>
            </div>
            <div className="text-white/40 text-[0.72rem] uppercase tracking-[0.06em] mt-1">States Active</div>
          </div>
        </div>
      </div>

      {/* Floating cards — hidden on small screens */}
      <div className="hidden xl:flex flex-col gap-4 absolute right-[5%] top-1/2 -translate-y-1/2 w-[360px] z-10">

        <div className="bg-white/[0.05] border border-white/[0.09] rounded-xl p-5 backdrop-blur-sm">
          <p className="text-[#F5AB00] text-[0.68rem] font-bold uppercase tracking-[0.1em] mb-2">Upcoming Event</p>
          <p className="text-white text-sm font-medium mb-1">Leadership in the AI Era — Masterclass</p>
          <p className="text-white/40 text-xs mb-3">Jul 14 · Zoom · 2,400 Registered</p>
          <div className="flex items-center justify-between">
            <span className="bg-[#1A1AFF]/20 text-[#8888FF] text-[0.68rem] font-bold px-2.5 py-1 rounded-full">Webinar · Free</span>
            <span className="text-white/30 text-xs">Seats closing</span>
          </div>
        </div>

        <div className="bg-white/[0.05] border border-white/[0.09] rounded-xl p-5 backdrop-blur-sm">
          <p className="text-[#F5AB00] text-[0.68rem] font-bold uppercase tracking-[0.1em] mb-2">Mentorship Match</p>
          <p className="text-white text-sm font-medium mb-1">Adaeze N. → Dr. Kemi Folake</p>
          <p className="text-white/40 text-xs mb-3">Executive Career Transition · Session 4 of 12</p>
          <div className="flex items-center justify-between mb-2">
            <span className="bg-[#F5AB00]/15 text-[#F5AB00] text-[0.68rem] font-bold px-2.5 py-1 rounded-full">67% Complete</span>
            <span className="text-white/30 text-xs">Next: Mon 9AM</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[67%] bg-gradient-to-r from-[#1A1AFF] to-[#F5AB00] rounded-full" />
          </div>
        </div>

        <div className="bg-white/[0.05] border border-white/[0.09] rounded-xl p-5 backdrop-blur-sm">
          <p className="text-[#F5AB00] text-[0.68rem] font-bold uppercase tracking-[0.1em] mb-2">Community Impact</p>
          <p className="text-white text-sm font-medium mb-1">₦2.4M raised this quarter</p>
          <p className="text-white/40 text-xs mb-3">Sponsoring 48 youth training seats</p>
          <span className="bg-teal-400/15 text-teal-400 text-[0.68rem] font-bold px-2.5 py-1 rounded-full">70% to Programmes</span>
        </div>

      </div>
    </section>
  )
}
