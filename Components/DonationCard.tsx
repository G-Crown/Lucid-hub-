'use client'

import { useState } from 'react'

interface Donation {
  id: string
  tier: string
  amount: number | null
  period: string
  description: string
  impact: string
  featured: boolean
}

const TIER_ACCENT: Record<string, string> = {
  spark:     'from-[#EDE9E1] to-[#EDE9E1]',
  growth:    'from-[#1A1AFF] to-[#3B3BFF]',
  community: 'from-[#F5AB00] to-[#FFD54F]',
  partner:   'from-[#0A1628] to-[#162E5C]',
}

export default function DonationCard({ donation }: { donation: Donation }) {
  const [selected, setSelected] = useState(false)

  const subject = encodeURIComponent(
    donation.amount
      ? `Donation — ${donation.tier} ₦${donation.amount.toLocaleString()}`
      : `Corporate Partnership Inquiry`
  )
  const mailto = `mailto:lucidhub.info@gmail.com?subject=${subject}`

  const accent = TIER_ACCENT[donation.id] ?? TIER_ACCENT.spark

  return (
    <div
      onClick={() => setSelected((s) => !s)}
      className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer flex flex-col ${
        selected
          ? 'border-[#1A1AFF] shadow-[0_12px_40px_rgba(26,26,255,0.12)] -translate-y-1'
          : donation.featured
          ? 'border-[#1A1AFF]/30 shadow-md'
          : 'border-[#EDE9E1] hover:-translate-y-0.5 hover:border-[#1A1AFF]/40'
      }`}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />

      {/* Featured badge */}
      {donation.featured && !selected && (
        <div className="absolute top-3.5 right-3.5 bg-[#1A1AFF]/08 text-[#1A1AFF] text-[0.62rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Amount */}
        <div className="font-serif text-[2.3rem] font-bold text-[#0A1628] leading-none mb-1">
          {donation.amount ? `₦${donation.amount.toLocaleString()}` : 'Custom'}
        </div>
        <div className="text-[#9CA3AF] text-xs mb-4">{donation.period}</div>

        {/* Title & desc */}
        <div className="text-[#0A1628] font-semibold text-sm mb-2">{donation.tier}</div>
        <p className="text-[#6B7280] text-xs leading-relaxed mb-5">{donation.description}</p>

        {/* Impact pill */}
        <div className="bg-[#F7F5F0] rounded-lg px-3 py-2.5 text-xs text-[#0A1628] font-medium flex items-center gap-2 mb-5">
          {donation.impact}
        </div>

        {/* CTA button */}
        <a
          href={mailto}
          onClick={(e) => e.stopPropagation()}
          className={`mt-auto block text-center py-2.5 rounded text-xs font-semibold transition-all ${
            selected
              ? 'bg-[#1A1AFF] text-white'
              : 'border border-[#EDE9E1] text-[#0A1628] hover:bg-[#1A1AFF] hover:border-[#1A1AFF] hover:text-white'
          }`}
        >
          {donation.amount ? `Give ₦${donation.amount.toLocaleString()}` : 'Contact Us'}
        </a>
      </div>
    </div>
  )
}
