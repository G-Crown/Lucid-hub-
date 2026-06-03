import type { Metadata } from 'next'
import DashboardSidebar from '@/components/DashboardSidebar'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Lucid Hub Admin' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A1628] flex">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
