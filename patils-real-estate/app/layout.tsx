import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import LenisProvider from '@/components/ui/LenisProvider'
import PageTransition from '@/components/ui/PageTransition'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm',
})

export const metadata: Metadata = {
  title: "Shrav Estate | Mumbai's Premier Luxury Properties",
  description: "Discover premium residential and commercial properties in Mumbai, Pune, and Nashik with Shrav Estate.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="overflow-x-hidden">
        <LenisProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
