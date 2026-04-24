'use client'

import { motion } from 'framer-motion'

interface ScoreBarProps {
  label: string
  score: number
  color?: string
  delay?: number
}

export function ScoreBar({ label, score, color = '#D4AF37', delay = 0 }: ScoreBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-mono text-white font-semibold">{score}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
