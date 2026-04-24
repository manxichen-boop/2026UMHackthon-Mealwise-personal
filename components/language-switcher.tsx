'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import type { Language } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLanguage: Language
  onChange: (lang: Language) => void
}

export function LanguageSwitcher({ currentLanguage, onChange }: LanguageSwitcherProps) {
  return (
    <motion.button
      onClick={() => onChange(currentLanguage === 'zh' ? 'en' : 'zh')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
    >
      <Globe className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
      <span className="text-sm font-medium text-white">
        {currentLanguage === 'zh' ? '中文' : 'EN'}
      </span>
    </motion.button>
  )
}
