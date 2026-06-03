import type { Metadata } from 'next'
import DonationCard from '@/components/DonationCard'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support Lucid Hub. Every contribution funds leadership training, mentorship, and youth conferences across Nigeria.',
}

const DONATIONS = [
  { id:'spark',     tier:'Spark Giver',       amount:5000,   period:'One-time · or ₦2,000/month',  description:'Cover learning materials and digital tools for one participant in our skill development programmes.', impact:'📚 Covers materials for 1 student', featured:false },
  { id:'growth',    tier:'Growth Champion',   amount:25000,  period:'One-time · or ₦8,000/month',  description:'Sponsor a full seat in our Digital Media Mastery or Lucid Spark programme — training, mentorship, and certification.', impact:'🎓 Sponsors 1 full training seat', featured:true },
  { id:'community', tier:'Community Builder', amount:100000, period:'One-time · or ₦20,000/month', description:'Fund an entire cohort module including facilitation, community access, and 3 months of post-programme mentoring.', impact:'🏆 Funds a full cohort module', featured:false },
  { id:'partner',   tier:'Strategic Partner', amount:null,   period:'Corporate · Partnership',      description:'Co-brand a flagship event, sponsor a regional youth conference, or establish a named scholarship fund at Lucid Hub.', impact:'🌍 Regional conference sponsorship', featured:false },
]

export default function DonatePage() {
  return (
    <>
      <section className="bg-[#0A1628] pt-32 pb-20 px-[5%]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 bg-[#F5AB00]/10 border border-[#F5AB00]/30 rounded-full px-4 py-1.5 text-[#F5AB00] text-xs font-bold tracking-widest uppercase mb-6">
            Donor Pipeline
          </p>
          <h1 className="font-serif text-5xl font-bold text-white leading-tight mb-6">
            Invest in Africa's Next <em className="italic text-[#F5AB00]">Generation</em>
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-2xl mx-auto">
            Every contribution, regardless of size, directly equips a young leader.
            Your gift funds training, mentorship, and life-changing conferences.
          </p>
        </div>
      </section>

      <section className="py-24 px-[5%] bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {DONATIONS.map((d) => <DonationCard key={d.id} donation={d} />)}
          </div>

          {/* Transparency */}
          <div className="bg-[#0A1628] rounded-2xl p-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-9 h-0.5 bg-[#F5AB00] rounded mb-4" />
              <h2 className="font-serif text-2xl font-bold text-white mb-3">Where Your Money Goes</h2>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                We believe in complete financial transparency. Every naira is tracked and reported quarterly.
              </p>
              <div className="space-y-4">
                {[
                  { label:'Programmes', pct:70, color:'bg-[#1A1AFF]' },
                  { label:'Materials',  pct:20, color:'bg-[#F5AB00]' },
                  { label:'Operations', pct:10, color:'bg-teal-400' },
                ].map((a) => (
                  <div key={a.label} className="flex items-center gap-3">
                    <span className="text-white/65 text-sm w-24 shrink-0">{a.label}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${a.color} rounded-full`} style={{ width:`${a.pct}%` }} />
                    </div>
                    <span className="text-white text-sm font-semibold w-8 text-right">{a.pct}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-[#F5AB00]/10 border border-[#F5AB00]/20 rounded-lg">
                <p className="text-[#F5AB00] text-xs font-bold uppercase tracking-wider mb-1">Last Report: Q2 2025</p>
                <p className="text-white/55 text-sm">₦48.2M raised · 12,000+ beneficiaries</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon:'📊', title:'Quarterly Reports', desc:'Full financial statements published every quarter.' },
                { icon:'🔍', title:'Impact Tracking',   desc:'Every programme outcome is measured and reported.' },
                { icon:'🏛️', title:'Board Oversight',   desc:'Governed by an independent advisory board.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 bg-white/[0.04] border border-white/10 rounded-xl p-5">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
