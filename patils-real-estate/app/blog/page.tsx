'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { blogPosts } from '@/data/blog'

export default function BlogPage() {
  const featured = blogPosts[0]
  const posts = blogPosts.slice(1)

  return (
    <main className="pt-24 min-h-screen bg-[var(--beige)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="font-cormorant font-semibold text-5xl md:text-6xl text-[var(--navy)] mb-4">Market Insights & News</h1>
          <p className="font-dm text-[var(--navy)]/70 font-medium">Stay updated with the latest trends in luxury real estate</p>
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-8 mb-20 group cursor-pointer bg-[var(--white)] border border-[var(--rule)] shadow-sm"
        >
          <div className="w-full lg:w-2/3 h-[500px] relative overflow-hidden">
            <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-6 left-6 bg-[var(--white)] text-[var(--navy)] px-4 py-2 font-dm font-bold text-xs tracking-widest uppercase shadow-md">
              {featured.category}
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col justify-center p-8 lg:p-10 lg:pl-4">
            <div className="flex items-center gap-4 text-[var(--navy)]/60 font-dm font-semibold text-sm mb-4 uppercase tracking-widest">
              <span>{featured.date}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--teal)]" />
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featured.readTime}</span>
            </div>
            <h2 className="font-cormorant font-semibold text-4xl text-[var(--navy)] mb-6 group-hover:text-[var(--teal)] transition-colors leading-tight">{featured.title}</h2>
            <p className="font-dm text-[var(--navy)]/80 font-medium leading-relaxed mb-8">{featured.excerpt}</p>
            <div className="flex items-center gap-2 text-[var(--teal)] font-dm font-bold uppercase tracking-widest text-sm">
              Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col bg-[var(--white)] border border-[var(--rule)] shadow-sm"
            >
              <div className="relative h-64 overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[var(--navy)]/80 to-transparent">
                  <span className="bg-[var(--white)] text-[var(--navy)] px-3 py-1 font-dm font-bold text-[10px] tracking-widest uppercase">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-[var(--navy)]/60 font-dm font-bold text-xs mb-3 uppercase tracking-widest">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--teal)]" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-cormorant font-semibold text-2xl text-[var(--navy)] mb-3 group-hover:text-[var(--teal)] transition-colors leading-snug">{post.title}</h3>
                <p className="font-dm text-[var(--navy)]/70 font-medium text-sm mb-6 flex-grow">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-[var(--teal)] font-dm font-bold uppercase tracking-widest text-xs mt-auto">
                  Read More →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
