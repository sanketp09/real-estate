'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const premiumProperties = [
  { id: 'p1', name: 'Oceanfront Penthouse', location: 'Worli Sea Face', category: 'Ultra Luxury', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80', price: '₹2.5 Cr', desc: 'Experience architectural living crafted for modern luxury lifestyles with uninterrupted sea views.' },
  { id: 'p2', name: 'Skyline Residences', location: 'Lower Parel', category: 'Premium Suite', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80', price: '₹1.8 Cr', desc: 'Elevate your daily life with unparalleled city views and bespoke world-class amenities.' },
  { id: 'p3', name: 'Glass Villa Estate', location: 'Alibaug', category: 'Signature Villa', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80', price: '₹2.9 Cr', desc: 'A masterclass in modern architecture blending seamlessly with surrounding nature.' },
  { id: 'p4', name: 'Hillside Mansion', location: 'Lonavala', category: 'Estate', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=80', price: '₹1.5 Cr', desc: 'Your private sanctuary away from the city, crafted to absolute perfection.' },
]

export default function PremiumShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const length = premiumProperties.length
  
  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--beige)]">
        
        {/* Cinematic Backgrounds */}
        {premiumProperties.map((p, i) => {
          const opacity = useTransform(scrollYProgress, (val) => {
            if (length <= 1) return 1;
            const target = i / (length - 1);
            const distance = Math.abs(val - target);
            const step = 1 / (length - 1);
            return Math.max(0, 1 - (distance / step));
          });
          
          const scale = useTransform(scrollYProgress, (val) => {
            if (length <= 1) return 1;
            const target = i / (length - 1);
            const step = 1 / (length - 1);
            const diff = target - val;
            if (diff > 0) return 1 + (diff / step) * 0.1;
            return 1;
          });

          return (
            <motion.div
              key={p.id}
              style={{ opacity, scale }}
              className="absolute inset-0 z-0"
            >
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </motion.div>
          )
        })}

        {/* Elegant Frost Overlays */}
        <div className="absolute inset-0 z-10 bg-[var(--beige)]/70 backdrop-blur-md mix-blend-overlay" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--beige)] via-[var(--beige)]/90 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--beige)]/50 to-transparent" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between h-full">
          
          {/* Left Typography Area */}
          <div className="w-full md:w-5/12 pt-32 md:pt-0">
            <h2 className="font-dm text-[var(--teal)] font-bold text-xs tracking-[0.3em] uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[var(--teal)]" />
              Premium Showcase
            </h2>
            
            <div className="relative h-[220px] md:h-[280px] w-full">
              {premiumProperties.map((p, i) => {
                const y = useTransform(scrollYProgress, (val) => {
                  if (length <= 1) return 0;
                  const target = i / (length - 1);
                  const step = 1 / (length - 1);
                  const diff = val - target;
                  return (diff / step) * -60;
                });
                
                const opacity = useTransform(scrollYProgress, (val) => {
                  if (length <= 1) return 1;
                  const target = i / (length - 1);
                  const distance = Math.abs(val - target);
                  const step = 0.5 / (length - 1);
                  return Math.max(0, 1 - (distance / step));
                });
                
                return (
                  <motion.div
                    key={p.id}
                    style={{ y, opacity }}
                    className="absolute inset-0 pointer-events-none flex flex-col justify-center"
                  >
                    <h3 className="font-cormorant text-5xl md:text-7xl lg:text-[5.5rem] text-[var(--navy)] font-semibold leading-[1.05] mb-6 drop-shadow-sm">
                      {p.name}
                    </h3>
                    <p className="font-dm text-[var(--navy)]/80 text-lg md:text-xl max-w-md leading-relaxed font-medium">
                      {p.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-3 bg-[var(--navy)] text-[var(--white)] px-8 py-4 rounded-full font-dm font-bold text-sm tracking-widest uppercase hover:bg-[var(--teal)] hover:scale-105 transition-all duration-300 shadow-xl group"
            >
              Explore Property
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right 3D Sliding Cards */}
          <div className="w-full md:w-6/12 h-[60vh] md:h-[80vh] relative perspective-[2000px] mt-12 md:mt-0 flex items-center justify-center md:justify-end md:pr-12 pointer-events-none">
            {premiumProperties.map((p, i) => {
              const currentIndex = useTransform(scrollYProgress, [0, 1], [0, length - 1])
              
              const x = useTransform(currentIndex, (val) => {
                const offset = i - val
                if (offset < 0) return offset * 800 // Fly off swiftly to the left
                return offset * 120 // Stack neatly to the right
              })

              const z = useTransform(currentIndex, (val) => {
                const offset = i - val
                if (offset < 0) return 0
                return -offset * 200 // Push back deeply
              })

              const scale = useTransform(currentIndex, (val) => {
                const offset = i - val
                if (offset < 0) return 1 + Math.abs(offset) * 0.1
                return 1 - offset * 0.05
              })

              const rotateY = useTransform(currentIndex, (val) => {
                const offset = i - val
                if (offset < 0) return offset * 10
                return offset * -15 // Rotate to enhance perspective
              })

              const opacity = useTransform(currentIndex, (val) => {
                const offset = i - val
                if (offset < -0.5) return 0 // Fade out when leaving
                if (offset > 2.5) return 0 // Hide far cards
                return 1 - offset * 0.2
              })

              return (
                <motion.div
                  key={p.id}
                  style={{ x, z, scale, rotateY, opacity, zIndex: 100 - i }}
                  className="absolute w-[300px] md:w-[400px] aspect-[3/4.2] bg-[var(--white)] rounded-[2.5rem] shadow-2xl border border-[var(--rule-heavy)] overflow-hidden transform-gpu pointer-events-auto cursor-pointer group"
                >
                  <div className="relative w-full h-[55%] overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/40 to-transparent" />
                    <div className="absolute top-6 left-6 bg-[var(--white)]/90 backdrop-blur-sm px-4 py-1.5 rounded-full font-dm text-[10px] tracking-widest text-[var(--navy)] font-bold uppercase shadow-sm">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col h-[45%] bg-[var(--white)]">
                    <h4 className="font-dm font-bold text-2xl text-[var(--navy)] mb-2">{p.name}</h4>
                    <p className="font-dm text-xs text-[var(--navy)]/60 uppercase tracking-widest mb-auto">{p.location}</p>
                    
                    <div className="flex items-end justify-between border-t border-[var(--rule)] pt-6 mt-6">
                      <span className="font-cormorant font-bold text-3xl text-[var(--navy)]">{p.price}</span>
                      <span className="w-12 h-12 rounded-full bg-[var(--sky-blue)]/30 group-hover:bg-[var(--teal)] flex items-center justify-center text-[var(--navy)] group-hover:text-[var(--white)] transition-colors duration-300">
                        <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
