import Link from 'next/link'

type EventType = 'webinar' | 'conference' | 'training'

interface Event {
  id: string
  title: string
  event_type: EventType
  event_date: string
  location: string
  price: number
  capacity: number
  registered_count: number
  is_virtual: boolean
}

const TYPE_STYLES: Record<EventType, { label: string; badge: string; banner: string }> = {
  webinar:    { label: 'Webinar',       badge: 'bg-white/20 text-white',             banner: 'bg-[#1A1AFF]' },
  conference: { label: 'Conference',    badge: 'bg-[#F5AB00] text-[#0A1628]',        banner: 'bg-[#0A1628]' },
  training:   { label: 'Skill Training',badge: 'bg-[#0F6E56] text-white',            banner: 'bg-[#162E5C]' },
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return {
    day:   d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en-GB', { month: 'short' }).toUpperCase(),
  }
}

function formatPrice(price: number) {
  if (price === 0) return 'Free'
  return `₦${price.toLocaleString()}`
}

function seatsLeft(capacity: number, registered: number) {
  return capacity - registered
}

export default function EventCard({ event }: { event: Event }) {
  const { label, badge, banner } = TYPE_STYLES[event.event_type]
  const { day, month } = formatDate(event.event_date)
  const remaining = seatsLeft(event.capacity, event.registered_count)
  const almostFull = remaining <= 10
  const soldOut = remaining <= 0

  const subject = encodeURIComponent(`Event Registration — ${event.title}`)
  const mailto = `mailto:lucidhub.info@gmail.com?subject=${subject}`

  return (
    <div className="bg-white rounded-2xl border border-[#EDE9E1] overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">

      {/* Banner */}
      <div className={`relative h-[190px] flex items-end p-5 ${banner}`}>

        {/* Abstract SVG background shape */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 400 190"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="340" cy="30"  r="120" fill="white" />
          <circle cx="60"  cy="170" r="80"  fill="white" />
        </svg>

        {/* Date badge */}
        <div className="absolute top-5 left-5 bg-white/12 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-center">
          <div className="font-serif text-2xl font-bold text-white leading-none">{day}</div>
          <div className="text-white/70 text-[0.65rem] uppercase tracking-wider mt-0.5">{month}</div>
        </div>

        {/* Badges bottom */}
        <div className="relative z-10 flex flex-col gap-2">
          {event.registered_count > 100 && (
            <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 rounded-full px-3 py-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-red-300 text-[0.65rem] font-bold uppercase tracking-widest">
                {soldOut ? 'Sold Out' : 'Registrations Open'}
              </span>
            </div>
          )}
          <span className={`text-[0.68rem] font-bold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full w-fit ${badge}`}>
            {label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-[1.1rem] font-semibold text-[#0A1628] leading-snug mb-3">
          {event.title}
        </h3>

        <div className="flex flex-wrap gap-4 mb-5">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-[#6B7280] text-xs">
            <svg className="w-3.5 h-3.5 opacity-60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {event.is_virtual
                ? <><path d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.893L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></>
                : <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>
              }
            </svg>
            {event.location}
          </div>
          {/* Registered count */}
          <div className="flex items-center gap-1.5 text-[#6B7280] text-xs">
            <svg className="w-3.5 h-3.5 opacity-60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
            {event.registered_count.toLocaleString()} Registered
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-[#F3F4F6]">
          <div>
            <div className="text-[#0A1628] font-bold text-sm">
              {formatPrice(event.price)}
              {event.price > 0 && <span className="text-[#9CA3AF] font-normal text-xs ml-1">/ ticket</span>}
            </div>
            {almostFull && !soldOut && (
              <div className="text-red-500 text-[0.7rem] font-semibold mt-0.5">
                🔴 {remaining} seat{remaining !== 1 ? 's' : ''} left
              </div>
            )}
          </div>
          <a
            href={soldOut ? '#' : mailto}
            className={`px-4 py-2 rounded text-xs font-semibold transition-colors ${
              soldOut
                ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                : 'bg-[#1A1AFF] text-white hover:bg-[#3B3BFF]'
            }`}
          >
            {soldOut ? 'Sold Out' : event.price === 0 ? 'Register Now' : 'Get Tickets'}
          </a>
        </div>
      </div>
    </div>
  )
}
