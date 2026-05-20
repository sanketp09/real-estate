'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Phone, MessageSquare, Download, Calendar, BedDouble, Ruler, Layers, Navigation } from 'lucide-react'
import MagneticButton from '@/components/shared/MagneticButton'

export default function PropertyDetail() {
  const [activeImage, setActiveImage] = useState(0)
  const images = [
    "https://picsum.photos/seed/h1/1200/800",
    "https://picsum.photos/seed/h2/1200/800",
    "https://picsum.photos/seed/h3/1200/800",
    "https://picsum.photos/seed/h4/1200/800",
  ]

  const amenities = [
    { icon: BedDouble, label: "Swimming Pool" },
    { icon: Navigation, label: "Gymnasium" },
    { icon: Layers, label: "Covered Parking" },
    { icon: Ruler, label: "24/7 Security" },
    { icon: Calendar, label: "High-speed Lift" },
    { icon: BedDouble, label: "Landscaped Garden" },
    { icon: Layers, label: "Clubhouse" },
    { icon: Ruler, label: "Power Backup" },
  ]

  return (
    <main className="bg-[var(--beige)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-[70vh] w-full"
      >
        <Image src={images[0]} alt="Property" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/90 via-[var(--navy)]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-10 max-w-7xl mx-auto">
          <div className="bg-[var(--sky-blue)] text-[var(--navy)] font-bold px-3 py-1 font-dm text-[10px] tracking-widest uppercase inline-block mb-4">
            Ready to Move
          </div>
          <h1 className="font-cormorant text-5xl md:text-7xl text-[var(--white)] mb-4 font-semibold">Patil Heights</h1>
          <p className="font-dm text-lg text-[var(--white)]/90 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--sky-blue)]" /> Bandra West, Mumbai
          </p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
        {/* Main Content (65%) */}
        <div className="w-full lg:w-[65%] space-y-16">
          
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative h-[50vh] w-full overflow-hidden border border-[var(--rule)] bg-[var(--white)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image src={images[activeImage]} alt="Gallery" fill className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-24 border transition-all ${activeImage === idx ? 'border-[var(--teal)] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Highlights Bar */}
          <div className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar border-y border-[var(--rule)] py-8">
            {[
              { icon: BedDouble, label: "BHK", value: "3 BHK" },
              { icon: Ruler, label: "Total Area", value: "1,850 Sq.Ft" },
              { icon: Layers, label: "Floor", value: "12th of 40" },
              { icon: Navigation, label: "Facing", value: "East" },
              { icon: Calendar, label: "Possession", value: "Immediate" },
            ].map((h, i) => (
              <div key={i} className="flex-shrink-0 flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--sky-blue)] flex items-center justify-center text-[var(--navy)] rounded-sm">
                  <h.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-dm text-xs text-[var(--navy)]/60 font-bold uppercase tracking-widest">{h.label}</p>
                  <p className="font-cormorant font-semibold text-2xl text-[var(--navy)]">{h.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="font-cormorant text-3xl font-semibold text-[var(--navy)] mb-6">About the Property</h2>
            <div className="font-dm text-[var(--navy)]/80 leading-relaxed space-y-4">
              <p>Experience the pinnacle of luxury living at Patil Heights, nestled in the heart of Bandra West. This meticulously crafted 3 BHK residence offers panoramic views of the Arabian Sea and the bustling city skyline.</p>
              <p>Designed with a perfect blend of modern aesthetics and functional spaces, the apartment features Italian marble flooring, a state-of-the-art modular kitchen, and expansive balconies that invite natural light and sea breeze.</p>
              <button className="text-[var(--teal)] uppercase tracking-widest text-xs font-bold mt-4 hover:underline">Read More</button>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-cormorant text-3xl font-semibold text-[var(--navy)] mb-6">Premium Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {amenities.map((a, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-[var(--white)] p-6 border border-[var(--rule)] flex flex-col items-center justify-center gap-4 hover:border-[var(--teal)] transition-colors text-center shadow-sm"
                >
                  <a.icon className="w-8 h-8 text-[var(--teal)]" />
                  <span className="font-dm text-sm font-medium text-[var(--navy)]">{a.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Neighbourhood */}
          <div>
            <h2 className="font-cormorant text-3xl font-semibold text-[var(--navy)] mb-6">Neighbourhood</h2>
            <div className="flex flex-wrap gap-4">
              {["2 min to Metro", "5 min to International School", "10 min to Hospital", "15 min to Airport"].map((n, i) => (
                <span key={i} className="px-5 py-2 border border-[var(--rule-heavy)] bg-[var(--white)] text-[var(--navy)] font-medium font-dm text-sm rounded-full">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Sidebar (35%) */}
        <div className="w-full lg:w-[35%]">
          <div className="sticky top-28 bg-[var(--white)] border border-[var(--rule)] shadow-sm p-8 space-y-8">
            <div>
              <p className="font-dm text-sm text-[var(--navy)]/60 font-bold uppercase tracking-widest mb-2">Price</p>
              <h3 className="font-cormorant text-5xl font-semibold text-[var(--teal)]">₹4.2 Cr</h3>
              <p className="font-dm text-sm text-[var(--navy)]/60 mt-2 font-medium">EMI from ₹1.8L/month</p>
            </div>

            <div className="space-y-4">
              <MagneticButton className="w-full flex">
                <button className="w-full bg-[var(--navy)] text-[var(--white)] py-4 font-dm font-bold uppercase tracking-widest text-sm hover:bg-[var(--teal)] transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" /> Schedule a Visit
                </button>
              </MagneticButton>
              <button className="w-full border border-[var(--navy)] text-[var(--navy)] py-4 font-dm font-bold uppercase tracking-widest text-sm hover:bg-[var(--navy)] hover:text-[var(--white)] transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download Brochure
              </button>
              <a href="tel:+919876543210" className="w-full flex items-center justify-center gap-2 text-[var(--navy)] py-4 font-dm hover:text-[var(--teal)] transition-colors font-medium">
                <Phone className="w-4 h-4" /> Call Now: +91 98765 43210
              </a>
            </div>

            <div className="border-t border-[var(--rule)] pt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden relative border border-[var(--rule)]">
                  <Image src="https://picsum.photos/seed/agent/100/100" alt="Agent" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-cormorant font-semibold text-xl text-[var(--navy)]">Vikram Patil</p>
                  <p className="font-dm text-xs font-medium text-[var(--navy)]/60">Senior Property Advisor • 10 yrs exp</p>
                </div>
              </div>
              <button className="w-full bg-[var(--sky-blue)] text-[var(--navy)] py-3 font-dm font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#a6bfd4] transition-colors">
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </button>
            </div>

            <div className="border-t border-[var(--rule)] pt-8">
              <h4 className="font-cormorant font-semibold text-2xl text-[var(--navy)] mb-6">Request Callback</h4>
              <form className="space-y-4">
                <div className="fl">
                  <input type="text" placeholder=" " required />
                  <label>Full Name</label>
                </div>
                <div className="fl">
                  <input type="tel" placeholder=" " required />
                  <label>Phone Number</label>
                </div>
                <div className="fl">
                  <textarea placeholder=" " rows={3} required></textarea>
                  <label>Message</label>
                </div>
                <button type="submit" className="w-full bg-[var(--teal)] text-[var(--white)] font-bold py-3 mt-4 font-dm text-sm tracking-widest uppercase hover:bg-[var(--navy)] transition-colors">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
