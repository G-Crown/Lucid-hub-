import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Admin Login' }

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="/logo-blue-bg.jpg"
            alt="Lucid Hub"
            width={160}
            height={60}
            className="mx-auto rounded-lg mb-4 object-contain"
          />
          <p className="text-white/40 text-sm">Admin Dashboard</p>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
          <h1 className="font-serif text-2xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-white/45 text-sm mb-8">Access is restricted to authorised Lucid Hub administrators.</p>

          <form className="space-y-5" action="/admin/dashboard">
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                required
                defaultValue="lucidhub.info@gmail.com"
                className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#1A1AFF] transition-colors placeholder-white/25"
                placeholder="admin@lucidhub.org"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#1A1AFF] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1A1AFF] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#3B3BFF] transition-colors"
            >
              Sign In →
            </button>
          </form>

          <p className="text-center text-white/30 text-xs mt-6">
            Forgot your password?{' '}
            <a href="mailto:lucidhub.info@gmail.com?subject=Admin Password Reset" className="text-[#F5AB00] hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
