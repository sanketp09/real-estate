'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react'
import { properties } from '@/data/properties'

const featured = properties.slice(0, 3)

function Card({ prop, index }: { prop: typeof properties[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6%' })
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientY - r.top) / r.height - 0.5) * 7
    const y = -((e.clientX - r.left) / r.width - 0.5) * 7
    el.style.transform = `perspective(1400px) rotateX(${x}deg) rotateY(${y}deg) translateZ(4px)`
    el.style.transition = 'transform 0.12s ease'
  }

  const onLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1400px) rotateX(0) rotateY(0) translateZ(0)'
      cardRef.current.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)'
    }
    setHovered(false)
  }

  const statusColors: Record<string, string> = {
    'Ready to Move': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'New Launch': 'bg-[var(--terra)]/10 text-[var(--terra)] border-[var(--terra)]/30',
    'Under Construction': 'bg-sky-50 text-sky-700 border-sky-200',
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="bg-[var(--white)] border border-[var(--rule)] hover:border-[var(--rule-heavy)] transition-[border-color,box-shadow] duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        <div className="relative h-[260px] overflow-hidden">
          <Image
            src={prop.image}
            alt={prop.name}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${hovered ? 'scale-[1.06]' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <span
            className={`absolute top-4 left-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border font-medium ${
              statusColors[prop.status] ?? ''
            }`}
          >
            {prop.status}
          </span>

          <span className="absolute top-4 right-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 bg-[var(--ink)]/70 text-[var(--linen)] backdrop-blur-sm">
            {prop.type}
          </span>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 inset-x-4"
          >
            <Link
              href={`/properties/${prop.id}`}
              className="flex items-center justify-center gap-2 bg-[var(--terra)] text-white text-[10px] tracking-[0.2em] uppercase py-3 w-full hover:bg-[var(--terra-dk)] transition-colors duration-200"
            >
              View Property <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-[1.15rem] font-medium text-[var(--ink)] leading-snug">{prop.name}</h3>
            <ArrowUpRight size={13} className="text-[var(--dust)] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <p className="flex items-center gap-1.5 text-[var(--dust)] text-[12px] tracking-wide mb-5">
            <MapPin size={11} className="text-[var(--terra)]" />
            {prop.location}
          </p>

          <div className="flex items-end justify-between">
            <p className="font-display text-xl text-[var(--terra)] font-medium">{prop.price}</p>
            <div className="flex gap-2">
              {prop.bhk > 0 && (
                <span className="text-[10px] text-[var(--dust)] border border-[var(--rule-heavy)] px-2.5 py-1 tracking-wider">
                  {prop.bhk} BHK
                </span>
              )}
              <span className="text-[10px] text-[var(--dust)] border border-[var(--rule-heavy)] px-2.5 py-1 tracking-wider">
                {prop.sqft.toLocaleString()} ft²
              </span>
            </div>
          </div>
        </div>

        <div className={`h-px bg-[var(--terra)] transition-all duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </motion.article>
  )
}

export default function FeaturedProperties() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section className="py-28 px-8 md:px-12 max-w-[1440px] mx-auto">
      <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[10px] tracking-[0.4em] uppercase text-[var(--terra)] mb-3"
          >
            Handpicked for You
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-normal text-[var(--ink)] leading-tight"
            >
              Featured Properties
            </motion.h2>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase text-[var(--terra)] hover:text-[var(--terra-dk)] transition-colors"
          >
            View All Properties
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((p, i) => (
          <Card key={p.id} prop={p} index={i} />
        ))}
      </div>
    </section>
  )
}
