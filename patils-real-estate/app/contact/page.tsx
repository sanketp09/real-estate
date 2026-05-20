'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen bg-[var(--beige)]">
      {/* Hero Section */}
      <section className="relative h-[45vh] w-full flex items-center justify-start overflow-hidden">
        <Image src="https://picsum.photos/seed/contacthero/1920/1080" alt="Contact Us" fill className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-[var(--navy)]/60 mix-blend-multiply" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cormorant font-bold text-5xl md:text-7xl text-[var(--white)] mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-dm text-[var(--white)] font-medium text-sm tracking-widest uppercase"
          >
            Home <span className="text-[var(--teal)] mx-2">/</span> Contact Us
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[var(--white)] shadow-xl p-10 rounded-2xl">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full border border-[var(--teal)] flex items-center justify-center text-[var(--teal)] flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-dm font-bold text-[var(--navy)] text-lg mb-1">Phone Number</h3>
              <p className="font-dm text-[var(--navy)]/60 text-sm">(+91) 98765 43210</p>
              <p className="font-dm text-[var(--navy)]/60 text-sm">(+91) 98765 43211</p>
            </div>
          </div>

          <div className="flex items-center gap-6 md:border-l md:border-r border-[var(--rule)] md:px-8">
            <div className="w-14 h-14 rounded-full border border-[var(--teal)] flex items-center justify-center text-[var(--teal)] flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-dm font-bold text-[var(--navy)] text-lg mb-1">Location</h3>
              <p className="font-dm text-[var(--navy)]/60 text-sm">Vani Vidyalaya,</p>
              <p className="font-dm text-[var(--navy)]/60 text-sm">Mulund West, Mumbai 400080</p>
            </div>
          </div>

          <div className="flex items-center gap-6 md:pl-8">
            <div className="w-14 h-14 rounded-full border border-[var(--teal)] flex items-center justify-center text-[var(--teal)] flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-dm font-bold text-[var(--navy)] text-lg mb-1">Email Address</h3>
              <p className="font-dm text-[var(--navy)]/60 text-sm">info@patilestate.com</p>
              <p className="font-dm text-[var(--navy)]/60 text-sm">support@patilestate.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/3">
          <p className="font-dm text-[var(--teal)] font-bold text-xs tracking-widest uppercase mb-4 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-[var(--teal)]">
            CONTACT US
          </p>
          <h2 className="font-cormorant font-bold text-4xl md:text-5xl text-[var(--navy)] mb-6 leading-tight">
            Write Us Any Message
          </h2>
          <p className="font-dm text-[var(--navy)]/60 leading-relaxed mb-8">
            We are always here to help you find your dream property. Whether you are looking to buy, sell, or simply want to inquire about the real estate market, feel free to reach out to us.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 bg-[var(--navy)] text-[var(--white)] font-dm text-xs font-bold uppercase flex items-center justify-center hover:bg-[var(--teal)] transition-colors rounded-sm">FB</a>
            <a href="#" className="w-10 h-10 bg-[var(--navy)] text-[var(--white)] font-dm text-xs font-bold uppercase flex items-center justify-center hover:bg-[var(--teal)] transition-colors rounded-sm">TW</a>
            <a href="#" className="w-10 h-10 bg-[var(--navy)] text-[var(--white)] font-dm text-xs font-bold uppercase flex items-center justify-center hover:bg-[var(--teal)] transition-colors rounded-sm">IG</a>
            <a href="#" className="w-10 h-10 bg-[var(--navy)] text-[var(--white)] font-dm text-xs font-bold uppercase flex items-center justify-center hover:bg-[var(--teal)] transition-colors rounded-sm">IN</a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--white)] p-12 flex flex-col items-center justify-center text-center shadow-lg rounded-2xl h-full border border-[var(--teal)]/30"
              >
                <CheckCircle className="w-16 h-16 text-[var(--teal)] mb-4" />
                <h3 className="font-cormorant font-bold text-3xl text-[var(--navy)] mb-2">Message Sent!</h3>
                <p className="font-dm text-[var(--navy)]/70">Thank you for reaching out. Our team will get back to you shortly.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-dm text-[var(--navy)]/60 text-sm mb-2 block">Your Name *</label>
                    <input type="text" placeholder="Your name here" required className="w-full bg-[var(--white)] border border-[var(--rule)] px-4 py-3 font-dm text-[var(--navy)] text-sm focus:border-[var(--teal)] outline-none rounded-sm transition-colors" />
                  </div>
                  <div>
                    <label className="font-dm text-[var(--navy)]/60 text-sm mb-2 block">Your Email *</label>
                    <input type="email" placeholder="Your email here" required className="w-full bg-[var(--white)] border border-[var(--rule)] px-4 py-3 font-dm text-[var(--navy)] text-sm focus:border-[var(--teal)] outline-none rounded-sm transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-dm text-[var(--navy)]/60 text-sm mb-2 block">Your Subject *</label>
                    <input type="text" placeholder="Your subject here" required className="w-full bg-[var(--white)] border border-[var(--rule)] px-4 py-3 font-dm text-[var(--navy)] text-sm focus:border-[var(--teal)] outline-none rounded-sm transition-colors" />
                  </div>
                  <div>
                    <label className="font-dm text-[var(--navy)]/60 text-sm mb-2 block">Contact Number</label>
                    <input type="tel" placeholder="Your phone number here" className="w-full bg-[var(--white)] border border-[var(--rule)] px-4 py-3 font-dm text-[var(--navy)] text-sm focus:border-[var(--teal)] outline-none rounded-sm transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="font-dm text-[var(--navy)]/60 text-sm mb-2 block">Message *</label>
                  <textarea rows={6} placeholder="Tell us a few words" required className="w-full bg-[var(--white)] border border-[var(--rule)] px-4 py-3 font-dm text-[var(--navy)] text-sm focus:border-[var(--teal)] outline-none rounded-sm transition-colors resize-none"></textarea>
                </div>

                <button type="submit" className="bg-[#E6485F] text-[var(--white)] font-dm font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-[var(--navy)] transition-colors rounded-sm shadow-md">
                  SEND MESSAGE
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </section>

      {/* Map Footer */}
      <div className="w-full h-[500px] mt-12 relative grayscale-[0.3] hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://maps.google.com/maps?q=Vani%20Vidyalaya,%20Mulund%20West,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
      </div>
    </main>
  )
}
