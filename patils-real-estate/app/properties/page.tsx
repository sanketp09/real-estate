'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Grid, List, ChevronDown } from 'lucide-react'
import { properties } from '@/data/properties'

import PremiumShowcase from '@/components/landing/PremiumShowcase'

export default function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [wishlist, setWishlist] = useState<string[]>([])
  
  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  return (
    <main className="min-h-screen bg-[var(--beige)]">
      <PremiumShowcase />
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 h-fit">
          <div className="bg-[var(--white)] border border-[var(--rule)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-cormorant font-semibold text-2xl text-[var(--navy)]">Filters</h2>
              <button className="font-dm text-xs text-[var(--teal)] hover:text-[var(--sky-blue)] transition-colors uppercase tracking-widest font-semibold">
                Reset
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-dm text-sm tracking-widest text-[var(--navy)]/60 uppercase mb-4 font-semibold">Property Type</h3>
                <div className="flex flex-col gap-3">
                  {['Apartment', 'Villa', 'Plot', 'Commercial'].map(t => (
                    <label key={t} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-[var(--rule-heavy)] group-hover:border-[var(--teal)] transition-colors flex items-center justify-center">
                        <div className="w-2 h-2 bg-transparent group-hover:bg-[var(--teal)] transition-colors" />
                      </div>
                      <span className="font-dm text-sm text-[var(--navy)]">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-dm text-sm tracking-widest text-[var(--navy)]/60 uppercase mb-4 font-semibold">Budget Range</h3>
                <input type="range" min="5000000" max="200000000" step="100000" defaultValue="100000000" className="w-full" />
                <div className="flex justify-between mt-2 font-dm text-xs text-[var(--teal)] font-semibold">
                  <span>₹50 L</span>
                  <span>₹20 Cr</span>
                </div>
              </div>

              <div>
                <h3 className="font-dm text-sm tracking-widest text-[var(--navy)]/60 uppercase mb-4 font-semibold">BHK</h3>
                <div className="flex gap-2 flex-wrap">
                  {['1', '2', '3', '4+'].map(bhk => (
                    <button key={bhk} className="px-4 py-2 border border-[var(--rule-heavy)] text-[var(--navy)] font-dm text-sm hover:border-[var(--teal)] hover:bg-[var(--sky-blue)] transition-all font-medium">
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-dm text-sm tracking-widest text-[var(--navy)]/60 uppercase mb-4 font-semibold">Location</h3>
                <div className="flex flex-col gap-3">
                  {['Mumbai', 'Pune', 'Nashik', 'Thane'].map(l => (
                    <label key={l} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-[var(--rule-heavy)] group-hover:border-[var(--teal)] transition-colors flex items-center justify-center">
                        <div className="w-2 h-2 bg-transparent group-hover:bg-[var(--teal)] transition-colors" />
                      </div>
                      <span className="font-dm text-sm text-[var(--navy)]">{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[var(--navy)] text-[var(--white)] py-3 font-dm tracking-widest text-sm uppercase hover:bg-[var(--teal)] transition-colors font-semibold">
                Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <section className="w-full lg:w-3/4">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4 border-b border-[var(--rule)] pb-4">
            <h1 className="font-cormorant font-semibold text-3xl text-[var(--navy)]">24 Properties Found</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-dm text-sm text-[var(--navy)] cursor-pointer group">
                Sort by: <span className="text-[var(--teal)] font-medium">Price ↑</span>
                <ChevronDown className="w-4 h-4 group-hover:text-[var(--teal)]" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'text-[var(--navy)]' : 'text-[var(--navy)]/40'}`}>
                  <Grid className="w-5 h-5" />
                </button>
                <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'text-[var(--navy)]' : 'text-[var(--navy)]/40'}`}>
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"}>
            {properties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group relative border border-[var(--rule)] bg-[var(--white)] hover:border-[var(--teal)] hover:shadow-xl transition-all duration-300 shadow-sm rounded-[2rem] ${view === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const rx = (y / rect.height - 0.5) * -10;
                  const ry = (x / rect.width - 0.5) * 10;
                  el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                }}
              >
                <div className={`relative overflow-hidden ${view === 'list' ? 'w-full sm:w-2/5 h-52 sm:h-auto rounded-t-[2rem] sm:rounded-l-[2rem] sm:rounded-tr-none' : 'h-52 w-full rounded-t-[2rem]'}`}>
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-[var(--navy)] transition-opacity duration-300 opacity-0 group-hover:opacity-10`} />
                  <div className="absolute top-4 left-4 bg-[var(--white)]/90 backdrop-blur-sm px-3 py-1 font-dm text-[10px] tracking-widest text-[var(--navy)] font-bold uppercase rounded-full">
                    {p.status}
                  </div>
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p.id); }}
                    className="absolute top-4 right-4 z-10 bg-[var(--white)]/50 backdrop-blur-md p-2 rounded-full hover:bg-[var(--white)] transition-colors"
                  >
                    <Heart className={`w-5 h-5 transition-colors ${wishlist.includes(p.id) ? 'fill-[var(--navy)] text-[var(--navy)]' : 'text-[var(--navy)]/50 hover:text-[var(--navy)]'}`} />
                  </button>
                </div>

                <div className={`p-6 flex flex-col flex-grow ${view === 'list' ? 'justify-center' : ''}`}>
                  <h3 className="font-dm font-bold text-2xl text-[var(--navy)] mb-1">{p.name}</h3>
                  <p className="font-dm text-xs text-[var(--navy)]/60 uppercase tracking-widest mb-4">
                    {p.location}
                  </p>
                  <p className="font-dm text-[var(--navy)]/70 text-sm mb-6 line-clamp-2">
                    Premium {p.type.toLowerCase()} offering unparalleled lifestyle and modern design at {p.location}.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.bhk > 0 && <span className="bg-[var(--beige)] text-[var(--navy)] font-bold text-xs px-3 py-1.5 rounded-sm font-dm">{p.bhk} BHK</span>}
                    <span className="bg-[var(--beige)] text-[var(--navy)] font-bold text-xs px-3 py-1.5 rounded-sm font-dm">{p.sqft} sqft</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--rule)]">
                    <span className="font-cormorant font-bold text-3xl text-[var(--navy)]">{p.price}</span>
                    <Link
                      href={`/properties/${p.id}`}
                      className="inline-flex items-center gap-2 bg-[var(--sky-blue)]/40 text-[var(--navy)] px-5 py-2.5 rounded-full font-dm font-bold text-sm hover:bg-[var(--navy)] hover:text-[var(--white)] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      Contact
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
