import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Manage Users' }
export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold text-white mb-1">Users</h1>
      <p className="text-white/40 text-sm mb-8">View and manage all registered members.</p>
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex gap-3">
          <input placeholder="Search users..." className="flex-1 bg-white/[0.06] border border-white/15 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-[#1A1AFF] placeholder-white/25"/>
          <select className="bg-white/[0.06] border border-white/15 rounded-lg px-3 py-2 text-white/60 text-sm outline-none">
            <option>All Roles</option><option>Admin</option><option>Mentor</option><option>Mentee</option><option>Member</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {['Name','Email','Role','Joined','Actions'].map(h => (
                <th key={h} className="text-left px-6 py-4 text-white/40 text-xs uppercase tracking-wider font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name:'G.Crown (Olugbenga Oke)', email:'lucidhub.info@gmail.com', role:'Admin',  joined:'Jan 2024' },
              { name:'Adaeze Okonkwo',           email:'adaeze@email.com',       role:'Mentee', joined:'Mar 2025' },
              { name:'Dr. Kemi Folake',          email:'kemi@email.com',         role:'Mentor', joined:'Feb 2025' },
            ].map(u => (
              <tr key={u.email} className="border-b border-white/[0.06] hover:bg-white/[0.03]">
                <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                <td className="px-6 py-4 text-white/50">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.role==='Admin'?'bg-[#F5AB00]/15 text-[#F5AB00]':u.role==='Mentor'?'bg-[#1A1AFF]/20 text-[#8888FF]':'bg-white/10 text-white/50'}`}>{u.role}</span>
                </td>
                <td className="px-6 py-4 text-white/50">{u.joined}</td>
                <td className="px-6 py-4"><button className="text-[#F5AB00] text-xs hover:underline">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
