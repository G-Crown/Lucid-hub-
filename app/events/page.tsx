import type { Metadata } from 'next'
import EventCard from '@/components/EventCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Events & Training',
  description: 'Browse Lucid Hub webinars, conferences, and skill training programmes. Register for your next leadership breakthrough.',
}

const ALL_EVENTS = [
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
  {
    id: '4',
    title: 'Emotional Intelligence for Leaders: A Deep-Dive Workshop',
    event_type: 'webinar' as const,
    event_date: '2025-10-02T11:00:00Z',
    location: 'Zoom · Live',
    price: 5000,
    capacity: 500,
    registered_count: 180,
    is_virtual: true,
  },
  {
    id: '5',
    title: 'Lucid Spark Youth Leadership Conference — Abuja',
    event_type: 'conference' as const,
    event_date: '2025-11-15T08:00:00Z',
    location: 'Abuja · In-Person',
    price: 10000,
    capacity: 400,
    registered_count: 95,
    is_virtual: false,
  },
  {
    id: '6',
    title: 'Project Management Essentials for Emerging Leaders',
    event_type: 'training' as const,
    event_date: '2025-10-20T09:00:00Z',
    location: '6 Weeks · Online',
    price: 30000,
    capacity: 25,
    registered_count: 10,
    is_virtual: true,
  },
]

export default function EventsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A1628] pt-32 pb-20 px-[5%]">
        <div className="max-w-4xl mx-auto">
          <p className="flex items-center gap-2 text-[#F5AB00] text-xs font-bold tracking-[0.12em] uppercase mb-4">
            <span className="block w-7 h-0.5 bg-[#F5AB00] rounded" />
            Events Engine
          </p>
          <h1 className="font-serif text-5xl font-bold text-white leading-tight mb-4">
            Every Event Is a <em className="italic text-[#F5AB00]">Turning Point</em>
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-2xl">
            Webinars, conferences, and skill training programmes designed to accelerate your leadership journey.
            Register in one click.
          </p>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="py-20 px-[5%] bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto">

          {/* Filter tabs — static, visual only (dynamic filtering requires client component) */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['All Events', 'Webinars', 'Conferences', 'Skill Training'].map((tab, i) => (
              <span
                key={tab}
                className={`px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors ${
                  i === 0
                    ? 'bg-[#1A1AFF] text-white'
                    : 'border border-[#EDE9E1] text-[#5A6272] hover:border-[#1A1AFF] hover:text-[#1A1AFF]'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-[#5A6272] mb-4">Don't see what you're looking for?</p>
            <a
              href="mailto:lucidhub.info@gmail.com?subject=Event Enquiry"
              className="inline-flex items-center gap-2 bg-[#1A1AFF] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#3B3BFF] transition-colors"
            >
              Contact Us for Custom Programmes →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
