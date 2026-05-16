'use client'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'

const stats = [
  { val: 500, suffix: '+', label: 'Properties Sold', pre: '' },
  { val: 15, suffix: '+', label: 'Years of Trust', pre: '' },
  { val: 98, suffix: '%', label: 'Client Satisfaction', pre: '' },
  { val: 2000, suffix: 'Cr+', label: 'Worth Transacted', pre: '₹' },
]

function Stat({ s, i }: { s: typeof stats[0]; i: number }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { once: true })
  const fired = useRef(false)

  useEffect(() => {
    if (!inView || fired.current) return
    fired.current = true
    const obj = { v: 0 }
    gsap.to(obj, {
      v: s.val,
      duration: 2.4,
      ease: 'power2.out',
      delay: i * 0.12,
      onUpdate() {
        if (numRef.current) {
          numRef.current.textContent = s.pre + Math.round(obj.v).toLocaleString('en-IN') + s.suffix
        }
      },
    })
  }, [inView, s.val, s.pre, s.suffix, i])

  return (
    <div ref={wrapRef} className="flex flex-col items-center text-center px-4">
      <span ref={numRef} className="stat-num">
        {s.pre}0{s.suffix}
      </span>
      <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--dust)] mt-3 font-light">{s.label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-[var(--panel)] border-y border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-white/8">
          {stats.map((s, i) => (
            <Stat key={s.label} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
