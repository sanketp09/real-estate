'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, ChevronDown } from 'lucide-react'
import MagneticButton from '@/components/shared/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showText, setShowText] = useState(false)
  const currentFrameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const totalFrames = 471
    const frames: HTMLImageElement[] = []
    let loaded = 0

    const drawFrame = (index: number) => {
      const img = framesRef.current[index]
      if (!img || !img.complete) return
      
      const baseScale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
      const scale = baseScale * 1.08 // Zoom slightly to crop edges
      const x = (canvas.width - img.naturalWidth * scale) / 2
      const y = 0 // Align to top, pushing the extra height entirely out of bounds at the bottom
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
    }

    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image()
      img.src = `/frames/frame_${String(i).padStart(3, '0')}.jpg`
      img.onload = () => {
        loaded++
        setProgress(Math.round((loaded / totalFrames) * 100))
        if (loaded === totalFrames) setLoading(false)
      }
      img.onerror = () => {
        loaded++
        setProgress(Math.round((loaded / totalFrames) * 100))
        if (loaded === totalFrames) setLoading(false)
      }
      frames.push(img)
    }
    framesRef.current = frames

    const ctx2 = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(Math.floor(self.progress * (totalFrames - 1)), totalFrames - 1)
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex
            drawFrame(frameIndex)
          }
          setShowText(self.progress > 0.83)
        }
      })
    })

    const checkFirstFrame = setInterval(() => {
      if (framesRef.current[0] && framesRef.current[0].complete) {
        drawFrame(0)
        clearInterval(checkFirstFrame)
      }
    }, 100)

    return () => {
      window.removeEventListener('resize', resize)
      ctx2.revert()
      clearInterval(checkFirstFrame)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-[var(--beige)] flex flex-col items-center justify-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-cormorant text-[var(--navy)] text-2xl tracking-[0.4em] uppercase mb-12"
            >
              Shrav Estate
            </motion.p>
            <div className="w-64 h-px bg-[var(--rule-heavy)] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--teal)]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="font-dm text-[var(--navy)]/70 text-sm mt-4">{progress}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={wrapperRef} style={{ height: '600vh' }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--white)]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          {/* Shadow overlay to hide any remaining watermark at the bottom edge */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

          <AnimatePresence>
            {showText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 40%, transparent 80%)' }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-dm text-[var(--beige)] text-sm tracking-[0.3em] uppercase mb-4 font-semibold"
                >
                  Welcome To
                </motion.p>
                <div className="overflow-hidden mb-4">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-cormorant text-[var(--white)] font-bold uppercase text-[7vw] md:text-[6vw] tracking-wider leading-none text-center"
                  >
                    Shrav Estate
                  </motion.h1>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-dm text-[var(--white)]/90 font-medium uppercase tracking-widest text-sm md:text-base mb-10 text-center"
                >
                  Mumbai&apos;s Most Trusted Luxury Properties
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <MagneticButton>
                    <Link
                      href="/properties"
                      className="group inline-flex items-center gap-3 bg-[var(--white)] text-[var(--navy)] px-8 py-4 font-dm text-sm tracking-widest uppercase hover:bg-[var(--teal)] hover:text-[var(--white)] font-bold transition-all duration-300 shadow-lg"
                    >
                      Explore Properties
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-dm text-[var(--navy)]/40 text-xs tracking-widest uppercase font-semibold">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown className="w-4 h-4 text-[var(--teal)]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

function Marquee() {
  const text = 'LUXURY RESIDENCES  ·  COMMERCIAL SPACES  ·  PREMIUM PLOTS  ·  MUMBAI  ·  PUNE  ·  NASHIK  ·  SHRAV ESTATE  ·  '
  return (
    <div className="bg-[var(--navy)] py-5 overflow-hidden border-y border-[var(--rule)]">
      <div className="flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            animate={{ x: [0, '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="font-cormorant italic text-[var(--beige)] text-xl tracking-widest flex-shrink-0"
          >
            {text}{text}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

import { properties } from '@/data/properties'

const featuredProperties = properties.slice(0, 3)

function PropertyCard3D({ prop, index }: { prop: typeof featuredProperties[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: hovered ? 'none' : 'transform 0.5s ease',
      }}
      className={`group relative overflow-hidden cursor-pointer border ${hovered ? 'border-[var(--teal)] shadow-xl' : 'border-[var(--rule)] shadow-sm'} transition-all duration-300 bg-[var(--white)] rounded-[2rem] flex flex-col h-full`}
    >
      <div className="relative h-52 overflow-hidden rounded-t-[2rem]">
        <Image
          src={prop.image}
          alt={prop.name}
          fill
          className={`object-cover transition-transform duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-[var(--navy)] transition-opacity duration-300 ${hovered ? 'opacity-20' : 'opacity-0'}`} />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-dm text-[var(--navy)] font-bold text-2xl mb-1">{prop.name}</h3>
        <p className="font-dm text-[var(--navy)]/60 text-xs mb-4 uppercase tracking-widest">{prop.location}</p>
        <p className="font-dm text-[var(--navy)]/70 text-sm mb-8 leading-relaxed line-clamp-3">
          Experience premium living at {prop.name}, situated in the heart of {prop.location.split(',')[0]}. Designed to exceed your expectations with world-class amenities.
        </p>
        <div className="mt-auto">
          <Link
            href={`/properties/${prop.id}`}
            className="inline-flex items-center gap-2 bg-[var(--sky-blue)]/40 text-[var(--navy)] px-5 py-2.5 rounded-full font-dm font-bold text-sm hover:bg-[var(--navy)] hover:text-[var(--white)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Contact
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function StatItem({ s, i }: { s: any, i: number }) {
  const numberPart = parseInt(s.value.replace(/[^0-9]/g, ''))
  const textPart = s.value.replace(/[0-9]/g, '')
  
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    const duration = 2000
    
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      setCount(Math.floor(easeOutQuart * numberPart))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(animate)
        observer.disconnect()
      }
    })
    
    const el = document.getElementById(`stat-${i}`)
    if (el) observer.observe(el)
      
    return () => observer.disconnect()
  }, [numberPart, i])

  return (
    <motion.div
      id={`stat-${i}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
    >
      <p className="font-cormorant text-[var(--sky-blue)] text-6xl md:text-7xl mb-3 font-semibold">
        {count}{textPart}
      </p>
      <p className="font-dm text-[var(--beige)] opacity-80 text-sm tracking-widest uppercase">{s.label}</p>
    </motion.div>
  )
}

function StatsSection() {
  const stats = [
    { value: '500+', label: 'Properties Sold' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '₹2000Cr+', label: 'Worth Transacted' },
  ]

  return (
    <section className="bg-[var(--navy)] py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] grain pointer-events-none" />
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
        {stats.map((s, i) => (
          <StatItem key={s.label} s={s} i={i} />
        ))}
      </div>
    </section>
  )
}

const testimonials = [
  { quote: 'Shrav\'s team found us our dream home in Bandra in under two weeks. Their knowledge of Mumbai\'s micro-markets is unparalleled.', name: 'Rohan Mehta', location: 'Bandra, Mumbai' },
  { quote: 'The level of transparency throughout the transaction gave us complete peace of mind. Truly a class apart from other brokers.', name: 'Priya Sharma', location: 'Juhu, Mumbai' },
  { quote: 'From Nashik to Mumbai, they handled everything seamlessly. The property we got exceeded every expectation.', name: 'Amit Kulkarni', location: 'Nashik' },
]

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="bg-[var(--white)] py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cormorant text-[var(--navy)] text-5xl md:text-6xl mb-16"
        >
          What Our Clients Say
        </motion.h2>
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[var(--teal)] fill-[var(--teal)]" />
                ))}
              </div>
              <blockquote className="font-cormorant italic text-[var(--navy)] text-2xl md:text-3xl leading-relaxed mb-8">
                "{testimonials[current].quote}"
              </blockquote>
              <p className="font-dm text-[var(--navy)] font-semibold uppercase tracking-wider text-sm">{testimonials[current].name}</p>
              <p className="font-dm text-[var(--teal)] text-sm mt-1">{testimonials[current].location}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[var(--navy)] w-6' : 'bg-[var(--navy)]/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 cta-grad" />
      <div className="absolute inset-0 opacity-[0.4] diag-tex" />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cormorant text-[var(--navy)] text-5xl md:text-6xl mb-4 font-semibold"
        >
          Find Your Dream Home in Mumbai
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-dm text-[var(--navy)]/70 text-lg mb-10"
        >
          Talk to our experts. No pressure. Just possibilities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton>
            <Link
              href="/properties"
              className="bg-[var(--navy)] text-[var(--white)] px-8 py-3 font-dm text-sm tracking-widest uppercase hover:bg-[var(--teal)] transition-all font-semibold"
            >
              Browse Properties
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href="tel:+919876543210"
              className="border border-[var(--navy)] text-[var(--navy)] px-8 py-3 font-dm text-sm tracking-widest uppercase hover:bg-[var(--navy)] hover:text-[var(--white)] transition-all font-semibold"
            >
              Call Us Now
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <ScrollSequence />
      <Marquee />
      <section className="bg-[var(--beige)] py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-14 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-cormorant text-[var(--navy)] text-5xl md:text-6xl mb-3 font-semibold"
            >
              Featured Properties
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-dm text-[var(--navy)]/60"
            >
              Handpicked luxury living spaces
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProperties.map((p, i) => (
              <PropertyCard3D key={p.id} prop={p} index={i} />
            ))}
          </div>
        </div>
      </section>
      <StatsSection />
      <TestimonialsSection />
      <CTABanner />
    </main>
  )
}
