'use client'

import { motion } from 'framer-motion'
import { Brain, TrendingUp, Heart, ShieldCheck } from 'lucide-react'
import { GlassCard } from './glass-card'
import { ScoreBar } from './score-bar'
import type { Language } from '@/lib/i18n'
import { t } from '@/lib/i18n'

interface ReasoningCardProps {
  lang: Language
  decision: {
    reasoning: string
    financial_impact_prediction: string
    tradeoffAnalysis?: {
      moodScore: number
      budgetScore: number
      nutritionScore: number
      overallScore: number
    }
    moodInsight?: string
    budgetInsight?: string
  }
}

export function ReasoningCard({ lang, decision }: ReasoningCardProps) {
  const { reasoning, financial_impact_prediction, tradeoffAnalysis, moodInsight, budgetInsight } = decision

  const scores = tradeoffAnalysis || {
    moodScore: 75,
    budgetScore: 80,
    nutritionScore: 70,
    overallScore: 75,
  }

  return (
    <GlassCard delay={0.2} className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
        >
          <Brain className="w-4 h-4" style={{ color: '#D4AF37' }} />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">{t('zAIDecisionIntelligence', lang)}</h3>
          <p className="text-white/40 text-xs">{lang === 'zh' ? '权衡分析引擎' : 'Trade-off Analysis'}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs font-mono" style={{ color: '#D4AF37' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {lang === 'zh' ? '实时运算' : 'Live'}
        </div>
      </div>

      {/* Reasoning text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/5 rounded-xl p-4 border border-white/10 text-sm text-white/80 leading-relaxed"
      >
        {reasoning}
      </motion.div>

      {/* Trade-off scores */}
      <div className="space-y-3">
        <p className="text-xs text-white/40 uppercase tracking-widest font-medium">{lang === 'zh' ? 'Trade-off 权衡分析' : 'Trade-off Analysis'}</p>
        <ScoreBar label={t('moodScore', lang)} score={scores.moodScore} color="#D4AF37" delay={0.5} />
        <ScoreBar label={t('budgetScore', lang)} score={scores.budgetScore} color="#60a5fa" delay={0.6} />
        <ScoreBar label={t('nutritionScore', lang)} score={scores.nutritionScore} color="#4ade80" delay={0.7} />
        <div className="pt-1 border-t border-white/10">
          <ScoreBar label={lang === 'zh' ? '综合决策分 (Overall)' : 'Overall Score'} score={scores.overallScore} color="#f59e0b" delay={0.8} />
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="bg-pink-500/5 border border-pink-500/20 rounded-xl p-3.5 space-y-1.5"
        >
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs text-pink-300 font-medium">{t('moodInsight', lang)}</span>
          </div>
          <p className="text-xs text-white/65 leading-relaxed">{moodInsight || '根据您的心情描述，系统为您匹配了最合适的餐品。'}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3.5 space-y-1.5"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs text-blue-300 font-medium">{t('budgetInsight', lang)}</span>
          </div>
          <p className="text-xs text-white/65 leading-relaxed">{budgetInsight || financial_impact_prediction}</p>
        </motion.div>
      </div>

      {/* Overall score badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.1 }}
        className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/10"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: '#D4AF37' }} />
          <span className="text-sm text-white/70">{lang === 'zh' ? '综合决策评分' : 'Overall Score'}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-black" style={{ color: '#D4AF37' }}>
            {scores.overallScore}
          </span>
          <span className="text-white/40 text-sm font-mono">/100</span>
        </div>
      </motion.div>
    </GlassCard>
  )
}

