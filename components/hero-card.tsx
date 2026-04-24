'use client'

import { motion } from 'framer-motion'
import { MapPin, Flame, Zap, Award, ExternalLink } from 'lucide-react'
import { GlassCard } from './glass-card'
import type { Language } from '@/lib/i18n'
import { t } from '@/lib/i18n'
import type { AIDecision } from '@/lib/mock-data'

interface HeroCardProps {
  lang: Language
  decision: AIDecision
}

export function HeroCard({ lang, decision }: HeroCardProps) {
  const { meal, confidence } = decision

  return (
    <GlassCard delay={0.1} className="p-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-5 rounded-2xl"
        style={{ background: 'radial-gradient(circle at 80% 20%, #D4AF37 0%, transparent 60%)' }}
      />

      {/* Label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#D4AF37' }}
          />
          <span className="text-xs text-white/50 uppercase tracking-widest font-medium">
            {t('recommendedMeal', lang)}
          </span>
        </div>
        <div
          className="text-xs font-mono px-2.5 py-1 rounded-full border flex items-center gap-1.5"
          style={{ borderColor: '#D4AF37', color: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.1)' }}
        >
          <Award className="w-3 h-3" />
          {t('confidence', lang)} {confidence}%
        </div>
      </div>

      <div className="flex gap-5 items-start">
        {/* Meal image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex-shrink-0"
        >
          <div
            className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden border-2"
            style={{ borderColor: 'rgba(212,175,55,0.3)' }}
          >
            {/* Placeholder styled image */}
            <div
              className="w-full h-full flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(0,51,102,0.8) 0%, rgba(0,31,64,0.9) 100%)' }}
            >
              <span className="text-4xl select-none">
                {meal.id === 'nasi-lemak' && '🍛'}
                {meal.id === 'economy-rice' && '🍚'}
                {meal.id === 'salad-bowl' && '🥗'}
                {meal.id === 'chicken-rice' && '🍗'}
                {meal.id === 'maggi-goreng' && '🍜'}
                {meal.id === 'grilled-chicken' && '🥩'}
                {meal.id === 'roti-canai' && '🫓'}
                {meal.id === 'tofu-bowl' && '🥙'}
                {!['nasi-lemak','economy-rice','salad-bowl','chicken-rice','maggi-goreng','grilled-chicken','roti-canai','tofu-bowl'].includes(meal.id) && '🍽️'}
              </span>
              <span className="text-xs text-white/40 mt-1 font-medium text-center px-2 leading-tight">
                {meal.location.split(' ')[0]}
              </span>
            </div>
          </div>
          <div
            className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#D4AF37' }}
          >
            <Zap className="w-3 h-3" style={{ color: '#001f40' }} />
          </div>
        </motion.div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-xl lg:text-2xl font-bold text-white leading-tight"
          >
            {lang === 'zh' ? meal.name : meal.name_en}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-2"
          >
            <span
              className="font-mono text-4xl font-black"
              style={{ color: '#D4AF37' }}
            >
              RM {meal.price.toFixed(2)}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center gap-1.5 mt-2 text-white/50"
          >
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-sm truncate">{lang === 'zh' ? meal.location : meal.location_en}</span>
          </motion.div>

          {/* Nutrition badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex flex-wrap gap-2 mt-3"
          >
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1 border border-white/15">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-white/70 font-mono">{meal.calories} kcal</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1 border border-white/15">
              <span className="text-xs text-white/70 font-mono">{meal.protein}g {lang === 'zh' ? '蛋白质' : 'protein'}</span>
            </div>
            {meal.veggies && (
              <div className="flex items-center gap-1 bg-green-500/10 rounded-full px-2.5 py-1 border border-green-500/25">
                <span className="text-xs text-green-400 font-medium">{lang === 'zh' ? '蔬菜' : 'Veggies'}</span>
              </div>
            )}
            {meal.lowCarb && (
              <div className="flex items-center gap-1 bg-blue-500/10 rounded-full px-2.5 py-1 border border-blue-500/25">
                <span className="text-xs text-blue-400 font-medium">{lang === 'zh' ? '低碳' : 'Low Carb'}</span>
              </div>
            )}
          </motion.div>

          {/* Google Maps Button */}
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            href={meal.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-3.5 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white"
          >
            <MapPin className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
            {t('openInMaps', lang)}
            <ExternalLink className="w-3 h-3 text-white/40" />
          </motion.a>
        </div>
      </div>
    </GlassCard>
  )
}
