import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Manage Resources' }
export default function AdminResourcesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white mb-1">Resources</h1>
          <p className="text-white/40 text-sm">Upload and manage Learning Hub content.</p>
        </div>
        <button className="bg-[#F5AB00] text-[#0A1628] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#FFD54F] transition-colors">
          + Upload Resource
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { title:'How to Lead When You Don\'t Have All the Answers', type:'Video', cat:'Leadership', views:'1,240', status:'Published' },
          { title:'Lucid Spark EQ Assessment Tool',                   type:'PDF',   cat:'EQ',         views:'890',  status:'Published' },
          { title:'Building Financial Intelligence',                  type:'Video', cat:'Finance',     views:'654',  status:'Published' },
        ].map(r => (
          <div key={r.title} className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#F5AB00] text-xs font-bold uppercase tracking-wider">{r.type} · {r.cat}</span>
              <span className="bg-teal-400/15 text-teal-400 text-xs font-semibold px-2 py-0.5 rounded-full">{r.status}</span>
            </div>
            <p className="text-white text-sm font-medium leading-snug mb-3">{r.title}</p>
            <p className="text-white/40 text-xs">{r.views} views</p>
            <div className="flex gap-2 mt-4">
              <button className="text-[#F5AB00] text-xs hover:underline">Edit</button>
              <button className="text-red-400 text-xs hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
