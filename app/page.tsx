'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Cpu } from 'lucide-react'

import { DecisionSidebar } from '@/components/decision-sidebar'
import { HeroCard } from '@/components/hero-card'
import { ReasoningCard } from '@/components/reasoning-card'
import { ForecastCard } from '@/components/forecast-card'
import { LoadingSkeleton } from '@/components/loading-skeleton'

import {
  generateAIDecision,
  generateSpendingForecast,
  type AIDecision,
  type SpendingDataPoint,
} from '@/lib/mock-data'

export default function HomePage() {
  // Input state
  const [budget, setBudget] = useState(45)
  const [mood, setMood] = useState('')
  const [priorities, setPriorities] = useState<string[]>([])
  const [daysUntilAllowance, setDaysUntilAllowance] = useState(12)

  // Output state
  const [decision, setDecision] = useState<AIDecision | null>(null)
  const [forecastData, setForecastData] = useState<SpendingDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  const handlePriorityToggle = useCallback((option: string) => {
    setPriorities(prev =>
      prev.includes(option) ? prev.filter(p => p !== option) : [...prev, option]
    )
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!mood.trim()) return
    setIsLoading(true)
    setHasAnalyzed(false)

    // Simulate Z.AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1400))

    const result = generateAIDecision(budget, mood, priorities, daysUntilAllowance)
    const aiDailySpend = result.meal.price * 2 + 1.5
    const forecast = generateSpendingForecast(budget, aiDailySpend)

    setDecision(result)
    setForecastData(forecast)
    setIsLoading(false)
    setHasAnalyzed(true)
  }, [budget, mood, priorities, daysUntilAllowance])

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#D4AF37' }}
            >
              <GraduationCap className="w-4.5 h-4.5" style={{ color: '#001f40' }} />
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight">SmartBite</span>
              <span className="text-white/40 text-sm"> Advisor</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-white/40">
            <Cpu className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
            <span>Powered by</span>
            <span className="font-mono font-semibold" style={{ color: '#D4AF37' }}>Z.AI GLM</span>
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs border border-white/15 bg-white/5">
              UMHackathon 2026
            </span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Sidebar */}
          <DecisionSidebar
            budget={budget}
            mood={mood}
            priorities={priorities}
            daysUntilAllowance={daysUntilAllowance}
            isLoading={isLoading}
            onBudgetChange={setBudget}
            onMoodChange={setMood}
            onPriorityToggle={handlePriorityToggle}
            onDaysChange={setDaysUntilAllowance}
            onAnalyze={handleAnalyze}
          />

          {/* Dashboard */}
          <div className="flex-1 min-w-0 space-y-4">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoadingSkeleton />
                </motion.div>
              )}

              {!isLoading && hasAnalyzed && decision && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <HeroCard decision={decision} />
                  <ReasoningCard decision={decision} />
                  <ForecastCard data={forecastData} projectedSavings={decision.projectedSavings} />
                </motion.div>
              )}

              {!isLoading && !hasAnalyzed && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center min-h-80 gap-6 text-center px-4"
                >
                  {/* Animated UM logo area */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <div
                      className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #003366 0%, #001f40 100%)',
                        border: '2px solid rgba(212,175,55,0.4)',
                        boxShadow: '0 0 40px rgba(212,175,55,0.15)',
                      }}
                    >
                      <GraduationCap className="w-12 h-12" style={{ color: '#D4AF37' }} />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#D4AF37' }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Cpu className="w-2.5 h-2.5" style={{ color: '#001f40' }} />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">智能餐饮决策助手</h2>
                    <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                      输入您的预算、心情和营养偏好，让 Z.AI 为您生成最优餐饮方案，量化您的月度节省。
                    </p>
                  </div>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      '心情 × 财务权衡分析',
                      '月度支出预测',
                      '营养优化推荐',
                    ].map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/50 bg-white/5"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-white/25 text-sm"
                  >
                    ← 在左侧填写信息后点击生成
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 px-6 text-center">
        <p className="text-white/20 text-xs font-mono">
          SmartBite Advisor · UMHackathon 2026 · Domain 2: AI 赋能经济决策
        </p>
      </footer>
    </div>
  )
}
