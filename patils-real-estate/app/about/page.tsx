'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Shield, Eye, Award } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  
  const teamRef = useRef<HTMLElement>(null)
  const { scrollYProgress: teamScroll } = useScroll({
    target: teamRef,
    offset: ["start start", "end end"]
  })
  const teamX = useTransform(teamScroll, [0, 1], ["0%", "-55%"])

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      })
    })
    return () => ctx.revert()
  }, [])

  const team = [
    { name: "Rahul Patil", title: "Founder & CEO", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" },
    { name: "Sneha Desai", title: "Head of Sales", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" },
    { name: "Amit Kulkarni", title: "Lead Architect", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=800&q=80" },
    { name: "Priya Sharma", title: "Legal Advisor", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  ]

  const values = [
    { title: "Trust", icon: Shield, desc: "Built on a foundation of reliability and honesty in every transaction." },
    { title: "Transparency", icon: Eye, desc: "Clear communication with no hidden costs or surprises." },
    { title: "Excellence", icon: Award, desc: "Delivering premium properties that exceed expectations." },
  ]

  const timeline = [
    { year: "2009", title: "The Beginning", desc: "Started with a small office in Dadar, focusing on residential rentals." },
    { year: "2014", title: "Commercial Expansion", desc: "Entered the commercial real estate market with projects in BKC." },
    { year: "2018", title: "Luxury Segment", desc: "Launched our first ultra-luxury residential project in Worli." },
    { year: "2024", title: "Going Global", desc: "Serving NRI clients and expanding footprint across Maharashtra." },
  ]

  return (
    <main className="bg-[var(--beige)]">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image src="https://picsum.photos/seed/about/1920/1080" alt="About Hero" fill className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--beige)] to-transparent" />
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative font-cormorant text-6xl md:text-8xl text-[var(--navy)] z-10 font-bold"
        >
          Our Story
        </motion.h1>
      </section>

      {/* Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <blockquote className="font-cormorant italic font-semibold text-4xl md:text-5xl text-[var(--teal)] leading-snug">
              "Building trust since 2009. One family at a time."
            </blockquote>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-dm text-[var(--navy)]/80 font-medium leading-relaxed space-y-6"
          >
            <p>What started as a modest agency has grown into Mumbai's premier real estate consultancy. We understood early on that buying a property isn't just a transaction; it's the realization of a lifelong dream.</p>
            <p>Our deep roots in the city, combined with a forward-looking approach to luxury living, have allowed us to curate the most exclusive portfolio of properties. We navigate the complexities of real estate so you don't have to.</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-[var(--white)] border-y border-[var(--rule)] relative">
        <div className="absolute inset-0 diag-tex opacity-[0.3]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border-l-4 border-[var(--teal)] bg-[var(--beige)] group shadow-sm hover:shadow-md transition-shadow"
            >
              <v.icon className="w-10 h-10 text-[var(--teal)] mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <h3 className="font-cormorant font-semibold text-3xl text-[var(--navy)] mb-4">{v.title}</h3>
              <p className="font-dm text-[var(--navy)]/70 font-medium leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="relative h-[300vh]" ref={teamRef}>
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[var(--beige)] py-20">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16 shrink-0 w-full">
            <h2 className="font-cormorant font-semibold text-5xl text-[var(--navy)] mb-4">Meet The Team</h2>
            <p className="font-dm text-[var(--navy)]/70 font-medium text-lg">The experts behind your seamless experience</p>
          </div>
          
          <div className="relative w-full cursor-grab active:cursor-grabbing pb-10">
            <motion.div 
              className="flex gap-8 px-6 md:px-12 w-max"
              style={{ x: teamX }}
            >
              {[...team, ...team].map((member, i) => (
                <motion.div 
                  key={i}
                  style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom' }}
                  className="relative group overflow-hidden w-[300px] md:w-[380px] h-[450px] border border-[var(--rule)] bg-[var(--white)] shadow-sm shrink-0"
                >
                  <Image src={member.image} alt={member.name} fill className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/90 via-[var(--navy)]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-cormorant font-semibold text-3xl text-[var(--white)]">{member.name}</h3>
                    <p className="font-dm text-[var(--sky-blue)] font-bold text-xs tracking-widest uppercase mt-2">{member.title}</p>
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                      <p className="font-dm text-xs text-[var(--white)]/90 font-medium leading-relaxed">Dedicated professional ensuring the highest standards of luxury and trust in every interaction.</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Ticker */}
      <section className="py-12 bg-[var(--teal)] overflow-hidden">
        <div className="award-track items-center gap-16 font-cormorant text-2xl text-[var(--white)] uppercase tracking-widest font-bold">
          {Array(8).fill(["Best Luxury Broker 2023", "•", "Excellence in Service", "•", "Most Trusted Agency"]).flat().map((t, i) => (
            <span key={i} className="whitespace-nowrap">{t}</span>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 max-w-4xl mx-auto" ref={timelineRef}>
        <h2 className="font-cormorant font-semibold text-5xl text-[var(--navy)] mb-20 text-center">Our Journey</h2>
        <div className="relative">
          {/* Central Line */}
          <div className="tl-draw-line h-full">
            <div ref={lineRef} className="tl-fill" />
          </div>

          <div className="space-y-24">
            {timeline.map((item, i) => (
              <div key={i} className={`flex items-center w-full ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-1/2" />
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--white)] border-2 border-[var(--teal)] z-10" />
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-1/2 ${i % 2 === 0 ? 'pl-12' : 'pr-12 text-right'}`}
                >
                  <span className="font-cormorant font-bold text-5xl text-[var(--teal)] opacity-60">{item.year}</span>
                  <h3 className="font-cormorant font-semibold text-3xl text-[var(--navy)] mt-2 mb-4">{item.title}</h3>
                  <p className="font-dm text-[var(--navy)]/70 font-medium">{item.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
