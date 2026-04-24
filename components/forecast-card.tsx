'use client'

import { motion } from 'framer-motion'
import { TrendingDown, PiggyBank, BarChart3 } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { GlassCard } from './glass-card'
import type { Language } from '@/lib/i18n'
import { t } from '@/lib/i18n'
import type { SpendingDataPoint } from '@/lib/mock-data'

interface ForecastCardProps {
  lang: Language
  data: SpendingDataPoint[]
  projectedSavings: number
}

// Custom Tooltip component
function CustomTooltip({ active, payload, label, lang = 'zh' }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: number
  lang?: Language
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="backdrop-blur-md bg-[#001f40]/90 border border-white/20 rounded-xl p-3 shadow-xl text-xs">
      <p className="text-white/60 mb-2 font-medium">{lang === 'zh' ? '第' : 'Day'} {label} {lang === 'zh' ? '天' : ''}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-white/70">{p.name}：</span>
          <span className="font-mono font-bold" style={{ color: p.color }}>
            RM {p.value.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function ForecastCard({ lang, data, projectedSavings }: ForecastCardProps) {
  const finalRandom = data[data.length - 1]?.random ?? 0
  const finalAI = data[data.length - 1]?.aiGuided ?? 0
  const actualSavings = Math.max(0, finalRandom - finalAI)

  return (
    <GlassCard delay={0.3} className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            <BarChart3 className="w-4 h-4" style={{ color: '#D4AF37' }} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{t('spendingForecast', lang)}</h3>
            <p className="text-white/40 text-xs">{lang === 'zh' ? '财务预测与对比分析' : 'Financial Forecast Comparison'}</p>
          </div>
        </div>

        {/* Savings badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-shrink-0 text-right"
        >
          <div className="flex items-center gap-1.5 justify-end">
            <PiggyBank className="w-4 h-4 text-green-400" />
            <span className="text-xs text-white/50">{t('projectedSavings', lang)}</span>
          </div>
          <div className="font-mono font-black text-green-400 text-xl">
            RM {projectedSavings}
            <span className="text-sm font-medium text-green-400/60">/mo</span>
          </div>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="h-52 lg:h-60"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="day"
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'Geist Mono' }}
              tickLine={false}
              axisLine={false}
              label={{ value: lang === 'zh' ? '天' : 'day', position: 'insideRight', offset: 5, fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'Geist Mono' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={v => `RM${v}`}
            />
            <Tooltip content={<CustomTooltip lang={lang} />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', paddingTop: '8px' }}
            />
            <Line
              type="monotone"
              dataKey="random"
              name={t('randomSpending', lang)}
              stroke="rgba(248,113,113,0.8)"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 3"
              activeDot={{ r: 4, fill: 'rgb(248,113,113)' }}
            />
            <Line
              type="monotone"
              dataKey="aiGuided"
              name={t('aiGuided', lang)}
              stroke="#D4AF37"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#D4AF37', stroke: '#001f40', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: lang === 'zh' ? '随机消费 (月)' : 'Random (month)',
            value: `RM ${finalRandom.toFixed(0)}`,
            color: 'text-red-400',
            icon: '↑',
          },
          {
            label: lang === 'zh' ? 'AI 建议 (月)' : 'AI Guided (month)',
            value: `RM ${finalAI.toFixed(0)}`,
            color: 'text-yellow-400',
            icon: '→',
          },
          {
            label: lang === 'zh' ? '节省金额' : 'Savings',
            value: `RM ${actualSavings.toFixed(0)}`,
            color: 'text-green-400',
            icon: <TrendingDown className="w-3 h-3 inline" />,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
            className="bg-white/5 rounded-xl p-3 border border-white/10 text-center"
          >
            <p className="text-white/40 text-xs mb-1">{stat.label}</p>
            <p className={`font-mono font-bold text-sm ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}
