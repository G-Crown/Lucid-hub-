import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Manage Events' }
export default function AdminEventsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white mb-1">Events</h1>
          <p className="text-white/40 text-sm">Create, edit, and publish Lucid Hub events.</p>
        </div>
        <button className="bg-[#1A1AFF] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3B3BFF] transition-colors">
          + Create Event
        </button>
      </div>
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {['Event Title','Type','Date','Registered','Status','Actions'].map(h => (
                <th key={h} className="text-left px-6 py-4 text-white/40 text-xs uppercase tracking-wider font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { title:'Leadership in the AI Era', type:'Webinar',    date:'Jul 14, 2025', reg:'2,400', status:'Published' },
              { title:'Lucid Summit 2025',         type:'Conference', date:'Aug 22, 2025', reg:'540',   status:'Published' },
              { title:'Digital Media Mastery',     type:'Training',   date:'Sep 05, 2025', reg:'22',    status:'Published' },
            ].map((e) => (
              <tr key={e.title} className="border-b border-white/[0.06] hover:bg-white/[0.03]">
                <td className="px-6 py-4 text-white font-medium">{e.title}</td>
                <td className="px-6 py-4 text-white/50">{e.type}</td>
                <td className="px-6 py-4 text-white/50">{e.date}</td>
                <td className="px-6 py-4 text-white/50">{e.reg}</td>
                <td className="px-6 py-4">
                  <span className="bg-teal-400/15 text-teal-400 text-xs font-semibold px-2 py-0.5 rounded-full">{e.status}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-[#F5AB00] text-xs hover:underline mr-3">Edit</button>
                  <button className="text-red-400 text-xs hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
