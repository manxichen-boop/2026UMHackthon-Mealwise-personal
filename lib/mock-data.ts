// SmartBite Advisor — Mock Data
// All business logic and data lives here per engineering constraints.

export interface Meal {
  id: string
  name: string
  name_en: string
  price: number
  calories: number
  protein: number
  carbs: number
  veggies: boolean
  lowCarb: boolean
  moodTags: string[]
  cuisine: 'Malay' | 'Indian' | 'Thai' | 'Fast Food' | 'Chinese' | 'Fusion' | 'Japanese' | 'Korean'
  location: string
  location_en: string
  mapsUrl: string
  imageUrl: string
}

export interface SpendingDataPoint {
  day: number
  random: number
  aiGuided: number
}

export interface AIDecision {
  meal: Meal
  reasoning: string
  tradeoffAnalysis: {
    moodScore: number
    budgetScore: number
    nutritionScore: number
    overallScore: number
  }
  moodInsight: string
  budgetInsight: string
  projectedSavings: number
  confidence: number
}

// ─── Meal Database ───────────────────────────────────────────────────────────

export const MEALS: Meal[] = [
  {
    id: 'nasi-lemak',
    name: 'Nasi Lemak 鸡肉',
    name_en: 'Nasi Lemak Ayam',
    price: 5.5,
    calories: 620,
    protein: 28,
    carbs: 72,
    veggies: false,
    lowCarb: false,
    moodTags: ['comfort', 'stressed', 'hungry', 'homesick'],
    cuisine: 'Malay',
    location: 'Kolej 12 食堂',
    location_en: 'Kolej 12 Cafeteria',
    mapsUrl: 'https://maps.google.com/?q=3.1207,-101.6558',
    imageUrl: '/meals/nasi-lemak.jpg',
  },
  {
    id: 'economy-rice',
    name: '经济盘饭（3菜）',
    name_en: 'Economy Rice (3 Lauk)',
    price: 4.0,
    calories: 580,
    protein: 22,
    carbs: 65,
    veggies: true,
    lowCarb: false,
    moodTags: ['budget', 'broke', 'practical', 'tired'],
    cuisine: 'Chinese',
    location: '中央食堂',
    location_en: 'UM Cafeteria Central',
    mapsUrl: 'https://maps.google.com/?q=3.1210,-101.6560',
    imageUrl: '/meals/economy-rice.jpg',
  },
  {
    id: 'salad-bowl',
    name: '花园沙拉碗',
    name_en: 'Garden Salad Bowl',
    price: 7.0,
    calories: 320,
    protein: 14,
    carbs: 28,
    veggies: true,
    lowCarb: true,
    moodTags: ['healthy', 'light', 'motivated', 'fresh'],
    cuisine: 'Fusion',
    location: 'The Cafe @ FPM',
    location_en: 'The Cafe @ FPM',
    mapsUrl: 'https://maps.google.com/?q=3.1215,-101.6555',
    imageUrl: '/meals/salad-bowl.jpg',
  },
  {
    id: 'chicken-rice',
    name: '海南鸡饭',
    name_en: 'Hainan Chicken Rice',
    price: 6.0,
    calories: 510,
    protein: 35,
    carbs: 55,
    veggies: false,
    lowCarb: false,
    moodTags: ['comfort', 'mild', 'tired', 'reliable'],
    cuisine: 'Chinese',
    location: 'PV128 美食广场',
    location_en: 'PV128 Food Court',
    mapsUrl: 'https://maps.google.com/?q=3.1220,-101.6545',
    imageUrl: '/meals/chicken-rice.jpg',
  },
  {
    id: 'maggi-goreng',
    name: 'Maggi 炒面特制',
    name_en: 'Maggi Goreng Special',
    price: 3.5,
    calories: 490,
    protein: 12,
    carbs: 68,
    veggies: false,
    lowCarb: false,
    moodTags: ['broke', 'stressed', 'late-night', 'comfort'],
    cuisine: 'Fusion',
    location: 'UM Gate 1 Mamak',
    location_en: 'Mamak @ UM Gate 1',
    mapsUrl: 'https://maps.google.com/?q=3.1190,-101.6580',
    imageUrl: '/meals/maggi-goreng.jpg',
  },
  {
    id: 'grilled-chicken',
    name: '烤鸡 + 糙米',
    name_en: 'Grilled Chicken + Brown Rice',
    price: 8.5,
    calories: 480,
    protein: 42,
    carbs: 40,
    veggies: true,
    lowCarb: true,
    moodTags: ['gym', 'motivated', 'healthy', 'disciplined'],
    cuisine: 'Fast Food',
    location: '运动中心食堂',
    location_en: 'Sports Centre Canteen',
    mapsUrl: 'https://maps.google.com/?q=3.1225,-101.6535',
    imageUrl: '/meals/grilled-chicken.jpg',
  },
  {
    id: 'roti-canai',
    name: 'Roti Canai + 奶茶',
    name_en: 'Roti Canai + Teh Tarik',
    price: 2.5,
    calories: 380,
    protein: 9,
    carbs: 60,
    veggies: false,
    lowCarb: false,
    moodTags: ['broke', 'morning', 'minimal', 'classic'],
    cuisine: 'Malay',
    location: 'UM Gate 1 Mamak',
    location_en: 'Mamak @ UM Gate 1',
    mapsUrl: 'https://maps.google.com/?q=3.1190,-101.6580',
    imageUrl: '/meals/roti-canai.jpg',
  },
  {
    id: 'tofu-bowl',
    name: '豆腐素菜碗',
    name_en: 'Tofu Veggie Bowl',
    price: 5.0,
    calories: 390,
    protein: 18,
    carbs: 42,
    veggies: true,
    lowCarb: true,
    moodTags: ['healthy', 'light', 'mindful', 'fresh'],
    cuisine: 'Chinese',
    location: 'FS 绿色厨房',
    location_en: 'Green Kitchen @ FS',
    mapsUrl: 'https://maps.google.com/?q=3.1230,-101.6550',
    imageUrl: '/meals/tofu-bowl.jpg',
  },
]

// ─── AI Decision Engine (Mock GLM Logic) ────────────────────────────────────

export function generateAIDecision(
  psychologicalBudget: number | null,
  totalRemainingAllowance: number | null,
  daysUntilAllowance: number | null,
  mood: string,
  cuisinePreference: string[],
): AIDecision {
  // If psychological budget not provided, calculate from remaining allowance
  let effectiveBudget = psychologicalBudget
  
  if (effectiveBudget === null && totalRemainingAllowance !== null && daysUntilAllowance !== null && daysUntilAllowance > 0) {
    // Conservative estimate: spread remaining allowance across remaining days, average ~2 meals per day
    effectiveBudget = Math.round((totalRemainingAllowance / daysUntilAllowance / 2) * 10) / 10
  }
  
  if (effectiveBudget === null) {
    effectiveBudget = 20 // fallback default
  }

  const moodLower = mood.toLowerCase()
  const moodKeywords = moodLower.split(/[\s,]+/)
  const isLowBudget = effectiveBudget < 25 || (daysUntilAllowance !== null && daysUntilAllowance > 10)
  const isBroke = effectiveBudget < 15 || moodKeywords.some(w => ['broke', 'poor', 'no money', 'tight'].includes(w))
  const wantsComfort = moodKeywords.some(w => ['stress', 'stressed', 'sad', 'lonely', 'comfort', 'tired', 'exhausted'].includes(w))
  const wantsHealthy = moodKeywords.some(w => ['healthy', 'fit', 'gym', 'diet'].includes(w))
  const wantsProtein = moodKeywords.some(w => ['gym', 'workout', 'protein', 'muscle'].includes(w))

  // Score each meal
  const scored = MEALS.map(meal => {
    let score = 0

    // Budget constraint (hard gate)
    if (meal.price > effectiveBudget) { score -= 100 }

    // Daily budget pressure
    if (isLowBudget && meal.price <= 5) score += 30
    if (isBroke && meal.price <= 4) score += 50

    // Cuisine preference matching
    if (cuisinePreference.length > 0 && cuisinePreference.includes(meal.cuisine)) score += 35

    // Mood matching
    const moodMatches = meal.moodTags.filter(tag => moodKeywords.some(w => w.includes(tag) || tag.includes(w))).length
    score += moodMatches * 20

    // Comfort food
    if (wantsComfort && meal.moodTags.includes('comfort')) score += 25
    if (wantsComfort && meal.price <= 6) score += 15

    // Nutritional priorities
    if (wantsHealthy && meal.veggies) score += 25
    if (wantsHealthy && meal.lowCarb) score += 20
    if (wantsProtein && meal.protein >= 30) score += 30
    if (wantsProtein && meal.protein >= 20) score += 15

    return { meal, score }
  })

  scored.sort((a, b) => b.score - a.score)
  const best = scored[0].meal

  // Compute trade-off scores (0–100)
  const budgetScore = Math.max(0, Math.min(100, Math.round(((effectiveBudget - best.price) / effectiveBudget) * 100)))
  const moodScore = Math.min(100, scored[0].score > 0 ? 60 + scored[0].score : 40)
  const nutritionScore = Math.min(100,
    (best.veggies ? 30 : 0) +
    (best.lowCarb ? 25 : 0) +
    (best.protein >= 30 ? 35 : best.protein >= 20 ? 25 : 10) +
    10
  )
  const overallScore = Math.round((budgetScore * 0.4 + moodScore * 0.35 + nutritionScore * 0.25))

  // Projected savings (vs random spending)
  const avgRandomDailySpend = 10.5
  const aiDailySpend = best.price * 2 + 2 // 2 meals + snack
  const daysLeft = daysUntilAllowance || 15
  const projectedSavings = Math.max(0, Math.round((avgRandomDailySpend - aiDailySpend) * 30))

  // Dynamic reasoning
  let reasoning = ''
  let moodInsight = ''
  let budgetInsight = ''

  if (isBroke && wantsComfort) {
    reasoning = `Z.AI 检测到情绪压力信号与严峻的财务状态之间存在核心矛盾。系统优先保证财务可持续性，同时通过选择 ${best.name} 来满足安慰性进食需求。${cuisinePreference.length > 0 ? `并尊重您对${cuisinePreference.join('、')}的偏好。` : ''}`
    moodInsight = '情绪状态表明需要熟悉感和满足感，但极低的预算需要约束。Z.AI 选择了兼具性价比和情感满足的方案。'
    budgetInsight = `以 RM${best.price} 的餐价维持每日双餐，预计本月可节省 RM${projectedSavings}，避免在月底陷入断粮困境。`
  } else if (isLowBudget && !wantsComfort) {
    reasoning = `财务数据显示预算压力较高。Z.AI 在维持营养均衡的前提下，推荐最低成本方案以保证学期末的财务弹性。${cuisinePreference.length > 0 ? `结合您对${cuisinePreference.join('、')}的喜好。` : ''}`
    moodInsight = '情绪状态稳定，系统专注于最大化营养性价比，为后续的学习和活动提供能量保障。'
    budgetInsight = `选择 RM${best.price} 的套餐方案，与无计划消费相比，预计月节省 RM${projectedSavings}。`
  } else if (wantsHealthy) {
    reasoning = `Z.AI 识别到明确的健康导向偏好，并结合当前预算，选择了营养密度最高的可负担方案。在"健康目标"与"预算管理"之间实现最优平衡。${cuisinePreference.length > 0 ? `同时满足您对${cuisinePreference.join('、')}的需求。` : ''}`
    moodInsight = '健康意识驱动的选择能提升长期学业表现和精神状态。Z.AI 为您匹配了符合营养目标的餐品。'
    budgetInsight = `RM${best.price} 的高营养餐品相比随机消费，可减少因能量不足导致的零食冲动购买，月节省约 RM${projectedSavings}。`
  } else {
    reasoning = `基于当前预算、心情描述和菜系偏好，Z.AI 综合评估了 ${MEALS.length} 种餐品的多维指标，推荐 ${best.name} 作为最优决策。${cuisinePreference.length > 0 ? `该菜系选择(${cuisinePreference.join('、')})符合您的偏好，` : ''}该餐品在财务可控性、营养均衡性和情绪适配性三个维度均表现优异。`
    moodInsight = `您的心情描述被解析为${wantsComfort ? '需要情感慰藉' : '相对平稳'}的状态，系统据此调整了推荐权重。`
    budgetInsight = `合理规划每餐开销为 RM${best.price}，预计比随机消费月节省 RM${projectedSavings}。`
  }

  return {
    meal: best,
    reasoning,
    tradeoffAnalysis: {
      moodScore: Math.min(100, moodScore),
      budgetScore,
      nutritionScore,
      overallScore,
    },
    moodInsight,
    budgetInsight,
    projectedSavings,
    confidence: Math.min(97, overallScore + 10),
  }
}

// ─── Financial Forecast Data ─────────────────────────────────────────────────

export function generateSpendingForecast(
  budget: number,
  aiDailySpend: number
): SpendingDataPoint[] {
  const days = 30
  const data: SpendingDataPoint[] = []
  let randomCumulative = 0
  let aiCumulative = 0

  for (let day = 1; day <= days; day++) {
    // Random spending: varies ±40% around average
    const randomVariance = 1 + (Math.sin(day * 1.7) * 0.4)
    const randomDaily = 10.5 * randomVariance
    randomCumulative += randomDaily

    // AI-guided spending: consistent with minor variation
    const aiVariance = 1 + (Math.sin(day * 0.9) * 0.08)
    const aiDaily = aiDailySpend * aiVariance
    aiCumulative += aiDaily

    data.push({
      day,
      random: Math.round(randomCumulative * 10) / 10,
      aiGuided: Math.round(aiCumulative * 10) / 10,
    })
  }

  return data
}

// ─── Cuisine Options ────────────────────────────────────────────────────────

export const CUISINE_OPTIONS = [
  'Malay',
  'Indian',
  'Thai',
  'Fast Food',
  'Chinese',
  'Fusion',
  'Japanese',
  'Korean',
] as const

// ─── Mood Suggestions ────────────────────────────────────────────────────────

export const MOOD_SUGGESTIONS = [
  "I'm stressed and want comfort food but I'm broke",
  "I just had gym and need high protein",
  "I feel healthy today, want something light",
  "Totally exhausted, just need something filling",
  "On a tight budget, 5 days till allowance",
]
