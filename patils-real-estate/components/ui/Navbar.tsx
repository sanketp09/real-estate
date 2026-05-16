'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(245,239,235,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(86,124,141,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-cormorant text-[var(--navy)] text-2xl tracking-widest font-semibold">SHRAV</span>
            <span className="font-dm text-[var(--teal)] text-[10px] tracking-[0.25em] uppercase">Real Estate</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative font-dm text-sm tracking-widest uppercase group"
                style={{ color: pathname === l.href ? 'var(--teal)' : 'var(--navy)' }}
              >
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-[var(--teal)] transition-all duration-300"
                  style={{ width: pathname === l.href ? '100%' : '0%' }}
                />
                <span className="absolute -bottom-1 left-0 h-px bg-[var(--teal)] w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center bg-[var(--teal)] text-[var(--white)] px-5 py-2 font-dm text-xs tracking-widest uppercase hover:bg-[var(--sky-blue)] hover:text-[var(--navy)] transition-all"
          >
            Schedule Visit
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[var(--navy)] p-1"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[var(--beige)] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-[var(--navy)]"
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-cormorant text-4xl text-[var(--navy)] hover:text-[var(--teal)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
