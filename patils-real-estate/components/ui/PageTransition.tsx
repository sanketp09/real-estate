'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={pathname}
        initial={{ opacity: 0, rotateX: -15, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
        exit={{ opacity: 0, rotateX: 15, scale: 0.95, y: -40 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: "1000px", transformOrigin: "top center" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
