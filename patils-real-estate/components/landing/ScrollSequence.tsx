'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Link from 'next/link'
import MagneticButton from '@/components/shared/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const TOTAL = 471
const TRIGGER = 0.88

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const frames = useRef<HTMLImageElement[]>([])
  const progress = useRef(0)
  const rafId = useRef(0)
  const needsDraw = useRef(false)
  const [loadPct, setLoadPct] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const imgs: HTMLImageElement[] = []
    let done = 0
    for (let i = 1; i <= TOTAL; i++) {
      const img = new Image()
      img.src = `/frames/frame_${String(i).padStart(3, '0')}.jpg`
      imgs.push(img)
    }
    Promise.all(
      imgs.map(
        (img) =>
          new Promise<void>((res) => {
            if (img.complete) {
              done++
              setLoadPct(Math.round((done / TOTAL) * 100))
              res()
            } else {
              img.onload = () => {
                done++
                setLoadPct(Math.round((done / TOTAL) * 100))
                res()
              }
              img.onerror = () => {
                done++
                setLoadPct(Math.round((done / TOTAL) * 100))
                res()
              }
            }
          })
      )
    ).then(() => {
      frames.current = imgs
      setLoaded(true)
    })
  }, [])

  const resizeCanvas = () => {
    const c = canvasRef.current
    if (!c) return
    c.width = window.innerWidth
    c.height = window.innerHeight
    needsDraw.current = true
  }

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const drawFrame = (idx: number) => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const img = frames.current[idx]
    if (img && img.complete && img.naturalWidth > 0) {
      const sc = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight)
      const x = (c.width - img.naturalWidth * sc) / 2
      const y = (c.height - img.naturalHeight * sc) / 2
      ctx.drawImage(img, x, y, img.naturalWidth * sc, img.naturalHeight * sc)
    } else {
      const p = idx / TOTAL
      const r = Math.round(24 + (180 - 24) * p)
      const g = Math.round(16 + (140 - 16) * p)
      const b = Math.round(10 + (90 - 10) * p)
      const grd = ctx.createLinearGradient(0, 0, 0, c.height)
      grd.addColorStop(0, `rgb(${r},${g},${b})`)
      grd.addColorStop(0.6, `rgb(${Math.round(r * 0.7)},${Math.round(g * 0.7)},${Math.round(b * 0.7)})`)
      grd.addColorStop(1, `rgb(${Math.round(r * 0.5)},${Math.round(g * 0.5)},${Math.round(b * 0.5)})`)
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, c.width, c.height)

      const vig = ctx.createRadialGradient(c.width / 2, c.height / 2, 0, c.width / 2, c.height / 2, c.width * 0.7)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.5)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, c.width, c.height)
    }
  }

  useEffect(() => {
    const loop = () => {
      if (needsDraw.current) {
        const idx = Math.min(Math.floor(progress.current * (TOTAL - 1)), TOTAL - 1)
        drawFrame(idx)
        needsDraw.current = false
      }
      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          progress.current = self.progress
          needsDraw.current = true
          setShowText(self.progress >= TRIGGER)
        },
      })
    })
    needsDraw.current = true
    return () => ctx.revert()
  }, [loaded])

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[800] bg-[var(--ink)] flex flex-col items-center justify-center"
          >
            <p className="font-display italic text-[var(--terra-lt)] text-sm tracking-[0.3em] mb-3">Patil&apos;s Real Estate</p>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-[var(--linen)] font-light tracking-wide mb-14 text-center px-8">
              Preparing Your Experience
            </h1>
            <div className="w-56 h-px bg-white/10 overflow-hidden relative">
              <div
                className="absolute inset-y-0 left-0 terra-progress"
                style={{ width: `${loadPct}%`, transition: 'width 0.2s ease' }}
              />
            </div>
            <p className="font-display text-[var(--terra-lt)] text-2xl mt-4">
              {loadPct}
              <span className="text-sm">%</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={wrapRef} style={{ height: '600vh' }} className="relative">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <AnimatePresence>
            {showText && (
              <>
                <motion.div
                  key="scrim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-[var(--ink)]/50"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    className="text-[var(--terra-lt)] text-[10px] tracking-[0.5em] uppercase mb-5"
                  >
                    Welcome To
                  </motion.p>

                  <div className="overflow-hidden">
                    <motion.h1
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display text-[clamp(2.8rem,7vw,6.5rem)] text-[var(--linen)] font-normal leading-[1.05] tracking-tight"
                    >
                      Patil&apos;s Real Estate
                    </motion.h1>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-[var(--sand)] text-sm md:text-base tracking-[0.2em] mt-5 mb-10 font-light"
                  >
                    Mumbai&apos;s Most Trusted Luxury Properties
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95, duration: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                  >
                    <MagneticButton>
                      <Link
                        href="/properties"
                        className="inline-block px-10 py-3.5 bg-[var(--terra)] text-white text-[11px] tracking-[0.25em] uppercase hover:bg-[var(--terra-dk)] transition-colors duration-300"
                      >
                        Explore Properties
                      </Link>
                    </MagneticButton>
                    <MagneticButton>
                      <Link
                        href="/contact"
                        className="inline-block px-10 py-3.5 border border-white/40 text-white text-[11px] tracking-[0.25em] uppercase hover:border-white transition-colors duration-300"
                      >
                        Contact Us
                      </Link>
                    </MagneticButton>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>

          {!showText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
              <p className="text-[9px] tracking-[0.4em] uppercase text-white/60">Scroll to Explore</p>
              <div className="w-px h-12 bg-white/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/2 bg-[var(--terra-lt)]"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
