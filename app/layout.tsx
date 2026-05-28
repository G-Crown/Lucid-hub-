import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Lucid Hub — Inspire. Empower. Transform.',
    template: '%s | Lucid Hub',
  },
  description:
    "Africa's premier leadership development platform. World-class mentorship, live training, conferences, and a transformative learning community.",
  keywords: ['leadership', 'mentorship', 'Nigeria', 'Africa', 'training', 'Lucid Hub'],
  authors: [{ name: 'Lucid Hub', url: 'https://lucidhub.org' }],
  openGraph: {
    title: 'Lucid Hub — Inspire. Empower. Transform.',
    description:
      'Equipping the next generation of African leaders through world-class mentorship, live training, and community.',
    images: ['/images/logo-blue-bg.jpg'],
    type: 'website',
  },
  icons: {
    icon: '/images/logo-mark.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
