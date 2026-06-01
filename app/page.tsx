import Hero from '@/components/Hero'
import EventCard from '@/components/EventCard'
import DonationCard from '@/components/DonationCard'
import TestimonialCard from '@/components/TestimonialCard'
import Link from 'next/link'

// ── Static data (replace with Supabase fetch once DB is live) ──
const EVENTS = [
  {
    id: '1',
    title: 'Leadership in the AI Era: Navigating Disruption With Purpose',
    event_type: 'webinar' as const,
    event_date: '2025-07-14T10:00:00Z',
    location: 'Zoom · Live',
    price: 0,
    capacity: 3000,
    registered_count: 2400,
    is_virtual: true,
  },
  {
    id: '2',
    title: 'Lucid Summit 2025 — The Future Belongs to the Bold',
    event_type: 'conference' as const,
    event_date: '2025-08-22T09:00:00Z',
    location: 'Lagos · In-Person',
    price: 15000,
    capacity: 800,
    registered_count: 540,
    is_virtual: false,
  },
  {
    id: '3',
    title: 'Digital Media Mastery: 4-Week Intensive Programme',
    event_type: 'training' as const,
    event_date: '2025-09-05T09:00:00Z',
    location: '4 Weeks · Hybrid',
    price: 25000,
    capacity: 30,
    registered_count: 22,
    is_virtual: false,
  },
]

const DONATIONS = [
  {
    id: 'spark',
    tier: 'Spark Giver',
    amount: 5000,
    period: 'One-time · or ₦2,000/month',
    description:
      'Cover learning materials and digital tools for one participant in our skill development programmes.',
    impact: '📚 Covers materials for 1 student',
    featured: false,
  },
  {
    id: 'growth',
    tier: 'Growth Champion',
    amount: 25000,
    period: 'One-time · or ₦8,000/month',
    description:
      'Sponsor a full seat in our Digital Media Mastery or Lucid Spark programme — training, mentorship, and certification.',
    impact: '🎓 Sponsors 1 full training seat',
    featured: true,
  },
  {
    id: 'community',
    tier: 'Community Builder',
    amount: 100000,
    period: 'One-time · or ₦20,000/month',
    description:
      'Fund an entire cohort module including facilitation, community access, and 3 months of post-programme mentoring.',
    impact: '🏆 Funds a full cohort module',
    featured: false,
  },
  {
    id: 'partner',
    tier: 'Strategic Partner',
    amount: null,
    period: 'Corporate · Partnership',
    description:
      'Co-brand a flagship event, sponsor a regional youth conference, or establish a named scholarship fund at Lucid Hub.',
    impact: '🌍 Regional conference sponsorship',
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    id: '1',
    author_name: 'Adaeze Nwosu',
    author_title: 'Senior Manager, Access Bank',
    content:
      "Lucid Hub didn't just give me a mentor — they gave me a map. Within 3 months of the programme, I landed my first senior management role.",
    rating: 5,
    initials: 'AN',
    color: '#1A1AFF',
  },
  {
    id: '2',
    author_name: 'Tunde Karibi',
    author_title: 'Founder, Karibi Creative Studio',
    content:
      'The Digital Media Mastery programme completely changed how I present myself professionally. The curriculum is world-class and the facilitators are exceptional.',
    rating: 5,
    initials: 'TK',
    color: '#C48A00',
  },
  {
    id: '3',
    author_name: 'Folake Mensah',
    author_title: 'Head of HR, TechCorp Nigeria',
    content:
      "As a corporate sponsor, we've seen measurable ROI in our team members who participated. Lucid Hub is transparent, professional, and genuinely impactful.",
    rating: 5,
    initials: 'FM',
    color: '#0F6E56',
  },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* TRUST BAR */}
      <div className="bg-[#0E1F3D] border-y border-white/[0.08] py-6 px-[5%]">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: '🛡️', text: 'Recognized by RCCG' },
            { icon: '✅', text: 'SSL & PCI Compliant' },
            { icon: '👥', text: '340+ Verified Mentors' },
            { icon: '🌍', text: '19 States · 4 Countries' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-white/40 text-sm font-medium tracking-wide">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* EVENTS */}
      <section id="events" className="py-24 px-[5%] bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <p className="flex items-center gap-2 text-[#1A1AFF] text-xs font-bold tracking-[0.12em] uppercase mb-3">
                <span className="block w-7 h-0.5 bg-[#1A1AFF] rounded" />
                Events Engine
              </p>
              <h2 className="font-serif text-4xl font-bold text-[#0A1628] leading-tight mb-3">
                Your Next <em className="italic text-[#1A1AFF]">Breakthrough</em><br />Starts Here
              </h2>
              <p className="text-[#5A6272] text-lg max-w-lg leading-relaxed">
                From intimate masterclasses to flagship conferences — curated, high-impact learning experiences.
              </p>
            </div>
            <Link
              href="/events"
              className="whitespace-nowrap bg-[#1A1AFF] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#3B3BFF] transition-colors"
            >
              View All Events →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-10 bg-[#1A1AFF] rounded-2xl p-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-red-300 text-xs font-bold uppercase tracking-widest">Virtual Access Available</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-white mb-2">Lucid Summit 2025 — Virtual Pass</h3>
              <p className="text-white/60 text-sm">Stream all keynotes, panels, and workshops live. Interactive Q&A included.</p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 text-right">
              <p className="font-serif text-3xl font-bold text-white">
                ₦5,000 <span className="text-base font-normal text-white/40">/ virtual</span>
              </p>
              <a
                href="mailto:lucidhub.info@gmail.com?subject=Virtual Pass - Lucid Summit 2025"
                className="bg-[#F5AB00] text-[#0A1628] px-6 py-3 rounded text-sm font-bold hover:bg-[#FFD54F] transition-colors"
              >
                Get Virtual Pass →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT BAND */}
      <div className="bg-[#F5AB00] py-20 px-[5%] text-center">
        <h2 className="font-serif text-3xl font-bold text-[#0A1628] mb-3">Transforming Lives Across Nigeria</h2>
        <p className="text-[#0A1628]/60 mb-12 max-w-md mx-auto">Real impact, measurable outcomes.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { num: '12,000+', label: 'Leaders Trained' },
            { num: '94%',     label: 'Employment Rate' },
            { num: '₦48M+',  label: 'Funds Raised' },
            { num: '340+',    label: 'Active Mentors' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl font-bold text-[#0A1628]">{s.num}</div>
              <div className="text-xs text-[#0A1628]/55 uppercase tracking-widest mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MENTORSHIP PREVIEW */}
      <section id="mentorship" className="py-24 px-[5%] bg-[#0A1628]">
        <div className="max-w-6xl mx-auto">
          <p className="flex items-center gap-2 text-[#F5AB00] text-xs font-bold tracking-[0.12em] uppercase mb-3">
            <span className="block w-7 h-0.5 bg-[#F5AB00] rounded" />
            Mentorship Portal
          </p>
          <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-3">
            The Right Guide Changes<br /><em className="italic text-[#F5AB00]">Everything</em>
          </h2>
          <p className="text-white/50 text-lg max-w-lg leading-relaxed mb-12">
            Intelligent matchmaking pairs ambitious leaders with seasoned mentors based on goals, industry, and growth stage.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: '🎓', title: "I'm a Mentee", subject: 'Mentee Application',
                cta: 'Apply as Mentee →',
                features: ['Goal-based intelligent matching','Structured 6–12 month programme','Progress tracking dashboard','Access to curated resources'],
              },
              {
                icon: '🌟', title: "I'm a Mentor", subject: 'Mentor Application',
                cta: 'Join as Mentor →',
                features: ['Flexible time commitment','Vetted mentee matching only','Mentor credentialing & recognition','Co-facilitation opportunities'],
              },
            ].map((card) => (
              <div key={card.title} className="border border-white/10 rounded-2xl p-8 bg-white/[0.03] hover:border-[#1A1AFF] hover:bg-[#1A1AFF]/[0.08] transition-all">
                <div className="text-3xl mb-5">{card.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{card.title}</h3>
                <ul className="space-y-2 mb-6">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                      <span className="text-[#F5AB00] mt-0.5">✦</span>{f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:lucidhub.info@gmail.com?subject=${card.subject}`}
                  className="inline-flex items-center gap-2 bg-[#1A1AFF] text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-[#3B3BFF] transition-colors"
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>

          <Link href="/mentorship" className="text-[#F5AB00] text-sm font-semibold hover:underline">
            Learn more about the programme →
          </Link>
        </div>
      </section>

      {/* DONATIONS */}
      <section id="give" className="py-24 px-[5%] bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto">
          <p className="flex items-center gap-2 text-[#1A1AFF] text-xs font-bold tracking-[0.12em] uppercase mb-3">
            <span className="block w-7 h-0.5 bg-[#1A1AFF] rounded" />
            Donor Pipeline
          </p>
          <h2 className="font-serif text-4xl font-bold text-[#0A1628] leading-tight mb-3">
            Fund the <em className="italic text-[#1A1AFF]">Future</em> of African Leadership
          </h2>
          <p className="text-[#5A6272] text-lg max-w-lg leading-relaxed mb-12">
            Every contribution directly equips a young leader. Choose your impact level.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {DONATIONS.map((d) => (
              <DonationCard key={d.id} donation={d} />
            ))}
          </div>

          <Link href="/donate" className="text-[#1A1AFF] text-sm font-semibold hover:underline">
            View full transparency report →
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="about" className="py-24 px-[5%] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="flex items-center justify-center gap-2 text-[#1A1AFF] text-xs font-bold tracking-[0.12em] uppercase mb-3">
              <span className="block w-7 h-0.5 bg-[#1A1AFF] rounded" />
              Community Voices
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#0A1628]">
              What Leaders Say About <em className="italic text-[#1A1AFF]">Lucid Hub</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className="bg-[#1A1AFF] py-20 px-[5%] text-center">
        <h2 className="font-serif text-3xl font-bold text-white mb-3">Stay in the Loop</h2>
        <p className="text-white/65 mb-8 max-w-md mx-auto">
          Early access to events, new resources, and leadership insights — monthly.
        </p>
        <form
          action="mailto:lucidhub.info@gmail.com"
          className="flex flex-wrap gap-3 max-w-md mx-auto justify-center"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 min-w-[220px] px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 text-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#F5AB00] text-[#0A1628] rounded text-sm font-bold hover:bg-[#FFD54F] transition-colors"
          >
            Subscribe →
          </button>
        </form>
      </div>
    </>
  )
}
