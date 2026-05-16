'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const testimonials = [
  {
    quote:
      "Patil's understood our vision before we articulated it. They found a home that exceeded every expectation — not just a property, but the right beginning for our family.",
    name: 'Arjun & Priya Mehta',
    city: 'Bandra West, Mumbai',
    initials: 'AM',
  },
  {
    quote:
      'In 15 years of real estate transactions I have never encountered a team that combines deep market knowledge with such genuine care for the people they serve. Exceptional.',
    name: 'Rajesh Sharma',
    city: 'Worli, Mumbai',
    initials: 'RS',
  },
  {
    quote:
      "From the first conversation to key handover, Patil's was present at every step. They negotiated brilliantly on our behalf. I recommend them without the slightest reservation.",
    name: 'Kavitha & Mohan Rao',
    city: 'Juhu, Mumbai',
    initials: 'KR',
  },
]

export default function TestimonialsSection() {
  const [cur, setCur] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    const id = setInterval(() => setCur((c) => (c + 1) % testimonials.length), 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <section ref={ref} className="py-28 px-8 md:px-12 bg-[var(--cream)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--terra)] mb-3">Testimonials</p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(2rem,4vw,3.5rem)] font-normal text-[var(--ink)]"
              >
                What Our Clients Say
              </motion.h2>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === cur ? 'w-8 h-1.5 bg-[var(--terra)]' : 'w-1.5 h-1.5 bg-[var(--sand)]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden" style={{ minHeight: '220px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={cur}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-[1fr_auto] gap-12 items-center"
            >
              <div>
                <p className="font-display text-[5rem] text-[var(--terra)] leading-none mb-0 select-none" aria-hidden>
                  &#8220;
                </p>
                <p className="font-display text-[clamp(1.1rem,2.2vw,1.6rem)] italic font-normal text-[var(--ink-soft)] leading-relaxed -mt-4">
                  {testimonials[cur].quote}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3">
                <div className="w-14 h-14 bg-[var(--terra)] flex items-center justify-center text-white font-display text-lg">
                  {testimonials[cur].initials}
                </div>
                <p className="text-sm font-medium text-[var(--ink)] text-center md:text-right">{testimonials[cur].name}</p>
                <p className="text-[11px] text-[var(--dust)] tracking-wider text-center md:text-right">{testimonials[cur].city}</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[var(--terra)] text-sm">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
