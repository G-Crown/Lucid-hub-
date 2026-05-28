import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Hub',
  description: 'Free articles, deep-dive videos, and downloadable frameworks from Africa\'s most impactful leadership voices.',
}

const RESOURCES = [
  { id:'1', type:'Video', category:'Leadership', title:'How to Lead When You Don\'t Have All the Answers', author:'G.Crown · Lucid Hub', duration:'34:12', color:'bg-[#1A1AFF]' },
  { id:'2', type:'PDF',   category:'EQ',         title:'The Lucid Spark Emotional Intelligence Assessment Tool', author:'Lucid Hub Team', duration:'PDF', color:'bg-[#162E5C]' },
  { id:'3', type:'Video', category:'Finance',    title:'Building Financial Intelligence as a Young African Professional', author:'Lucid Spark Series', duration:'18:45', color:'bg-[#0A1628]' },
  { id:'4', type:'Article', category:'Leadership', title:'7 Habits of Africa\'s Most Effective Young Leaders', author:'G.Crown · Lucid Hub', duration:'8 min read', color:'bg-[#162E5C]' },
  { id:'5', type:'Video', category:'Community',  title:'Character & Community: Leading Beyond Yourself', author:'Lucid Spark Series', duration:'22:30', color:'bg-[#1A1AFF]' },
  { id:'6', type:'PDF',   category:'Health',     title:'The Thriving Leader: Wellbeing Framework for Professionals', author:'Lucid Hub Team', duration:'PDF', color:'bg-[#0F6E56]' },
]

export default function LearningPage() {
  return (
    <>
      <section className="bg-[#0E1F3D] pt-32 pb-20 px-[5%]">
        <div className="max-w-4xl mx-auto">
          <p className="flex items-center gap-2 text-[#F5AB00] text-xs font-bold tracking-[0.12em] uppercase mb-4">
            <span className="block w-7 h-0.5 bg-[#F5AB00] rounded" />
            Learning Hub
          </p>
          <h1 className="font-serif text-5xl font-bold text-white leading-tight mb-4">
            Insights That <em className="italic text-[#F5AB00]">Transform</em>
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-2xl">
            Free articles, deep-dive videos, and downloadable frameworks from Africa's most impactful leadership voices.
          </p>
        </div>
      </section>

      <section className="py-20 px-[5%] bg-[#0E1F3D]">
        <div className="max-w-6xl mx-auto">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['All', 'Leadership', 'EQ', 'Finance', 'Health', 'Spiritual', 'Community'].map((cat, i) => (
              <span key={cat} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors ${
                i === 0 ? 'bg-[#F5AB00] text-[#0A1628]' : 'border border-white/15 text-white/50 hover:border-white/40 hover:text-white'
              }`}>
                {cat}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map((r) => (
              <div key={r.id} className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:border-[#1A1AFF] hover:bg-white/[0.07] transition-all cursor-pointer group">
                <div className={`h-40 ${r.color} flex items-center justify-center relative`}>
                  {r.type === 'Video' ? (
                    <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center group-hover:bg-[#1A1AFF] group-hover:border-[#1A1AFF] transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
                    </div>
                  ) : (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(245,171,0,0.6)" strokeWidth="1.5">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  )}
                  <span className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                    {r.duration}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[#F5AB00] text-xs font-bold tracking-widest uppercase mb-2">{r.type} · {r.category}</p>
                  <h3 className="font-serif text-base font-semibold text-white mb-3 leading-snug">{r.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{r.author}</span>
                    <span className="text-xs bg-[#F5AB00]/10 text-[#F5AB00] px-2 py-0.5 rounded-full font-semibold">{r.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href="mailto:lucidhub.info@gmail.com?subject=Learning Hub Resource Request"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded text-sm font-semibold hover:border-white/50 transition-colors"
            >
              Request a Resource or Topic →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
