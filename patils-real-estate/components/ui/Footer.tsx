import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--white)] border-t border-[var(--rule)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.5] diag-tex pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex flex-col leading-none mb-6">
              <span className="font-cormorant text-[var(--navy)] text-3xl tracking-widest font-semibold">PATIL</span>
              <span className="font-dm text-[var(--teal)] text-xs tracking-[0.25em] uppercase">Real Estate</span>
            </Link>
            <p className="font-dm text-[var(--navy)]/70 text-sm leading-relaxed">
              Mumbai&apos;s most trusted luxury property advisors. Building trust since 2009.
            </p>
          </div>
          
          <div>
            <h4 className="font-dm text-[var(--navy)] text-sm tracking-widest uppercase mb-6 font-semibold">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">About Us</Link></li>
              <li><Link href="/properties" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">Properties</Link></li>
              <li><Link href="/blog" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">Insights</Link></li>
              <li><Link href="/calculator" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">EMI Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-dm text-[var(--navy)] text-sm tracking-widest uppercase mb-6 font-semibold">Properties</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/properties?type=Apartment" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">Luxury Apartments</Link></li>
              <li><Link href="/properties?type=Villa" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">Premium Villas</Link></li>
              <li><Link href="/properties?type=Commercial" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">Commercial Spaces</Link></li>
              <li><Link href="/properties?type=Plot" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">Plots & Lands</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-dm text-[var(--navy)] text-sm tracking-widest uppercase mb-6 font-semibold">Contact</h4>
            <ul className="flex flex-col gap-3 relative z-10">
              <li className="font-dm text-[var(--navy)]/70 text-sm">Level 4, Patil Tower, BKC, Mumbai 400051</li>
              <li><a href="tel:+919876543210" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">+91 98765 43210</a></li>
              <li><a href="mailto:info@patilestate.com" className="font-dm text-[var(--navy)]/70 hover:text-[var(--teal)] text-sm transition-colors">info@patilestate.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--rule)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-dm text-[var(--navy)]/70 text-xs">© {new Date().getFullYear()} Patil Estate. All rights reserved.</p>
          <p className="font-dm text-[var(--navy)]/70 text-xs">Designed with ❤️ in Mumbai</p>
        </div>
      </div>
    </footer>
  )
}
