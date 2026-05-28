import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentorship Portal',
  description: 'Apply as a mentor or mentee on Lucid Hub. Intelligent matching, structured programmes, and progress tracking.',
}

export default function MentorshipPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A1628] pt-32 pb-20 px-[5%]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 bg-[#F5AB00]/10 border border-[#F5AB00]/30 rounded-full px-4 py-1.5 text-[#F5AB00] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5AB00] animate-pulse-dot" />
            Mentorship Portal
          </p>
          <h1 className="font-serif text-5xl font-bold text-white leading-tight mb-6">
            The Right Guide Changes <em className="italic text-[#F5AB00]">Everything</em>
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-2xl mx-auto">
            Our intelligent matchmaking pairs ambitious leaders with seasoned mentors
            based on goals, industry, and growth stage — not guesswork.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-[5%] bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="flex items-center justify-center gap-2 text-[#1A1AFF] text-xs font-bold tracking-[0.12em] uppercase mb-3">
              <span className="block w-7 h-0.5 bg-[#1A1AFF] rounded" />
              How It Works
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#0A1628]">Your Journey in 4 Steps</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Apply', desc: 'Complete our detailed intake form sharing your goals, experience, and what you need from the programme.' },
              { step: '02', title: 'Get Matched', desc: 'Our team reviews your profile and matches you with the most compatible mentor or mentee within 2 weeks.' },
              { step: '03', title: 'Connect', desc: 'Meet your match, set shared goals, and build your meeting cadence for the programme duration.' },
              { step: '04', title: 'Grow', desc: 'Track milestones, access curated resources, and complete your journey with a verified programme certificate.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-7 border border-[#EDE9E1]">
                <div className="font-serif text-5xl font-bold text-[#E6E6FF] mb-4">{s.step}</div>
                <h3 className="font-serif text-xl font-semibold text-[#0A1628] mb-3">{s.title}</h3>
                <p className="text-[#5A6272] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY CARDS */}
      <section className="py-24 px-[5%] bg-[#0A1628]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Mentee */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-10">
            <div className="text-4xl mb-5">🎓</div>
            <h2 className="font-serif text-2xl font-bold text-white mb-3">Apply as a Mentee</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Ready to accelerate your growth? Tell us your goals and be matched with a mentor who has walked your path.
            </p>
            <ul className="space-y-3 mb-8">
              {['Goal-based intelligent matching','Structured 6–12 month programme','Progress tracking dashboard','Access to curated resources','Post-programme career support'].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                  <span className="text-[#F5AB00] mt-0.5 shrink-0">✦</span>{f}
                </li>
              ))}
            </ul>
            <a
              href="mailto:lucidhub.info@gmail.com?subject=Mentee Application — Lucid Hub"
              className="block w-full text-center bg-[#1A1AFF] text-white py-3 rounded text-sm font-semibold hover:bg-[#3B3BFF] transition-colors"
            >
              Apply as Mentee →
            </a>
          </div>

          {/* Mentor */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-10">
            <div className="text-4xl mb-5">🌟</div>
            <h2 className="font-serif text-2xl font-bold text-white mb-3">Join as a Mentor</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Share your expertise, shape the next generation, and earn verified mentor credentials recognised across Africa.
            </p>
            <ul className="space-y-3 mb-8">
              {['Flexible time commitment','Vetted mentee matching only','Mentor credentialing & recognition','Co-facilitation opportunities','Private mentor community access'].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                  <span className="text-[#F5AB00] mt-0.5 shrink-0">✦</span>{f}
                </li>
              ))}
            </ul>
            <a
              href="mailto:lucidhub.info@gmail.com?subject=Mentor Application — Lucid Hub"
              className="block w-full text-center border-2 border-white/25 text-white py-3 rounded text-sm font-semibold hover:border-white/60 transition-colors"
            >
              Join as Mentor →
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-[5%] bg-[#F5AB00]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '48', label: 'Active Pairs' },
            { num: '87%', label: 'Goal Completion' },
            { num: '4.8★', label: 'Avg. Rating' },
            { num: '6–12', label: 'Month Programmes' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl font-bold text-[#0A1628]">{s.num}</div>
              <div className="text-xs text-[#0A1628]/55 uppercase tracking-widest mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
