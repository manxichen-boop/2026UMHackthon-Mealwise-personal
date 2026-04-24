'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function GlassCard({ children, className, delay = 0, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      className={cn(
        'backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
