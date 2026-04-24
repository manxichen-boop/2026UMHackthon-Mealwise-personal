'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Brain, UtensilsCrossed, Calendar, Sparkles, ChevronDown, PiggyBank } from 'lucide-react'
import { CUISINE_OPTIONS, MOOD_SUGGESTIONS } from '@/lib/mock-data'
import type { Language } from '@/lib/i18n'
import { t } from '@/lib/i18n'

interface DecisionSidebarProps {
  lang: Language
  psychologicalBudget: number | null
  totalRemainingAllowance: number | null
  mood: string
  cuisinePreference: string[]
  daysUntilAllowance: number | null
  hasRegularAllowance: boolean
  isLoading: boolean
  onPsychologicalBudgetChange: (v: number | null) => void
  onTotalRemainingChange: (v: number | null) => void
  onMoodChange: (v: string) => void
  onCuisineToggle: (v: string) => void
  onDaysChange: (v: number | null) => void
  onHasRegularChange: (v: boolean) => void
  onAnalyze: () => void
}

export function DecisionSidebar({
  lang,
  psychologicalBudget,
  totalRemainingAllowance,
  mood,
  cuisinePreference,
  daysUntilAllowance,
  hasRegularAllowance,
  isLoading,
  onPsychologicalBudgetChange,
  onTotalRemainingChange,
  onMoodChange,
  onCuisineToggle,
  onDaysChange,
  onHasRegularChange,
  onAnalyze,
}: DecisionSidebarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full lg:w-80 xl:w-88 flex-shrink-0 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-1">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: '#D4AF37' }}
        >
          <Brain className="w-5 h-5" style={{ color: '#001f40' }} />
        </div>
        <div>
          <p className="text-xs text-white/50 uppercase tracking-widest">{t('decisionInput', lang)}</p>
          <h2 className="text-white font-semibold text-sm leading-tight">{t('smartBiteAdvisor', lang)}</h2>
        </div>
      </div>

      {/* Psychological Budget */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4" style={{ color: '#D4AF37' }} />
          <span className="text-white/80 text-sm font-medium">{t('psychologicalBudget', lang)}</span>
          <span className="text-xs text-white/40">(可选)</span>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-white/50 text-xs">RM 0</span>
          <div className="text-center">
            <span className="font-mono text-3xl font-bold" style={{ color: '#D4AF37' }}>
              {psychologicalBudget?.toFixed(0) || '—'}
            </span>
            {psychologicalBudget !== null && <span className="font-mono text-sm text-white/60 ml-1">RM</span>}
          </div>
          <span className="text-white/50 text-xs">RM 100</span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={psychologicalBudget || 50}
          onChange={e => onPsychologicalBudgetChange(Number(e.target.value) || null)}
          className="w-full accent-yellow-400 h-2 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: '#D4AF37' }}
        />

        <div className="flex justify-between text-xs text-white/40">
          <span>{lang === 'zh' ? '不固定' : 'Flexible'}</span>
          <span
            className={`font-medium ${
              psychologicalBudget === null ? 'text-white/40' :
              psychologicalBudget < 20 ? 'text-red-400' : psychologicalBudget < 50 ? 'text-yellow-400' : 'text-green-400'
            }`}
          >
            {psychologicalBudget === null ? (lang === 'zh' ? '让 AI 决策' : 'AI decides') :
              psychologicalBudget < 20 ? t('budgetTight', lang) : psychologicalBudget < 50 ? t('controlNeeded', lang) : t('goodStatus', lang)}
          </span>
          <span>{t('comfortable', lang)}</span>
        </div>
      </div>

      {/* Total Remaining Allowance */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <PiggyBank className="w-4 h-4" style={{ color: '#D4AF37' }} />
          <span className="text-white/80 text-sm font-medium">{t('totalRemainingAllowance', lang)}</span>
          <span className="text-xs text-white/40">(可选)</span>
        </div>

        <input
          type="number"
          min={0}
          step={10}
          placeholder={lang === 'zh' ? '输入总生活费' : 'Enter total allowance'}
          value={totalRemainingAllowance || ''}
          onChange={e => onTotalRemainingChange(e.target.value ? Number(e.target.value) : null)}
          className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/30 transition-all"
        />
      </div>

      {/* Mood Input */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4" style={{ color: '#D4AF37' }} />
          <span className="text-white/80 text-sm font-medium">{t('moodCraving', lang)}</span>
        </div>

        <textarea
          value={mood}
          onChange={e => onMoodChange(e.target.value)}
          placeholder={t('moodPlaceholder', lang)}
          rows={3}
          className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 resize-none focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/30 transition-all"
        />

        <button
          onClick={() => setShowSuggestions(v => !v)}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronDown className={`w-3 h-3 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} />
          {t('quickInput', lang)}
        </button>

        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1.5"
          >
            {MOOD_SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => { onMoodChange(s); setShowSuggestions(false) }}
                className="w-full text-left text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 transition-all border border-transparent hover:border-white/20"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Cuisine Preference */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4" style={{ color: '#D4AF37' }} />
          <span className="text-white/80 text-sm font-medium">{t('preferredCuisine', lang)}</span>
          <span className="text-xs text-white/40">(可选)</span>
        </div>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {CUISINE_OPTIONS.map(option => {
            const checked = cuisinePreference.includes(option)
            return (
              <label
                key={option}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer border transition-all ${
                  checked
                    ? 'border-yellow-400/50 bg-yellow-400/10'
                    : 'border-white/10 bg-white/5 hover:border-white/25'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                    checked ? 'border-yellow-400 bg-yellow-400' : 'border-white/30'
                  }`}
                  onClick={() => onCuisineToggle(option)}
                >
                  {checked && (
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#001f40" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${checked ? 'text-yellow-300' : 'text-white/70'}`}
                  onClick={() => onCuisineToggle(option)}
                >
                  {option}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Days Until Allowance */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" style={{ color: '#D4AF37' }} />
          <label className="flex items-center gap-2 cursor-pointer flex-1">
            <input
              type="checkbox"
              checked={hasRegularAllowance}
              onChange={e => onHasRegularChange(e.target.checked)}
              className="w-4 h-4 rounded border-2 border-white/30 accent-yellow-400"
            />
            <span className="text-white/80 text-sm font-medium">{t('hasRegularAllowance', lang)}</span>
          </label>
        </div>

        {hasRegularAllowance && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3"
          >
            <input
              type="number"
              min={1}
              max={30}
              value={daysUntilAllowance || ''}
              onChange={e => onDaysChange(e.target.value ? Number(e.target.value) : null)}
              placeholder="输入天数"
              className="w-20 bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 font-mono text-white text-center text-lg font-bold focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/30 transition-all"
            />
            <div>
              <p className="text-white text-sm font-medium">{t('daysAmount', lang)}</p>
              <p
                className={`text-xs mt-0.5 ${
                  !daysUntilAllowance
                    ? 'text-white/40'
                    : daysUntilAllowance > 15
                      ? 'text-red-400'
                      : daysUntilAllowance > 7
                        ? 'text-yellow-400'
                        : 'text-green-400'
                }`}
              >
                {!daysUntilAllowance
                  ? '—'
                  : daysUntilAllowance > 15
                    ? t('strictControl', lang)
                    : daysUntilAllowance > 7
                      ? t('stayCautious', lang)
                      : t('soonRefill', lang)}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Analyze Button */}
      <motion.button
        onClick={onAnalyze}
        disabled={isLoading || !mood.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        style={{ backgroundColor: '#D4AF37', color: '#001f40' }}
      >
        {isLoading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-navy-deep/40 border-t-navy-deep rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ borderTopColor: '#001f40', borderColor: '#001f4040' }}
            />
            {t('analyzing', lang)}
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {t('generateDecision', lang)}
          </>
        )}
      </motion.button>
    </motion.aside>
  )
}
