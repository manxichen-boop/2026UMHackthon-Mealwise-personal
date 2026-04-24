'use client'

import { motion } from 'framer-motion'

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <motion.div
      className={`bg-white/10 rounded-xl ${className}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Hero card skeleton */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">
        <SkeletonBlock className="h-5 w-32 mb-4" />
        <div className="flex gap-4">
          <SkeletonBlock className="h-32 w-32 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <SkeletonBlock className="h-7 w-3/4" />
            <SkeletonBlock className="h-9 w-24" />
            <SkeletonBlock className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      {/* AI reasoning skeleton */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">
        <SkeletonBlock className="h-5 w-48 mb-4" />
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-5/6" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>
        <div className="mt-4 space-y-3">
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-full" />
        </div>
      </div>

      {/* Chart skeleton */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">
        <SkeletonBlock className="h-5 w-40 mb-4" />
        <SkeletonBlock className="h-48 w-full" />
      </div>
    </div>
  )
}
