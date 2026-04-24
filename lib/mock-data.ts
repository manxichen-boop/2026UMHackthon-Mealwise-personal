// SmartBite Advisor — Mock Data
// All business logic and data lives here per engineering constraints.

export interface Meal {
  id: string
  name: string
  price: number
  calories: number
  protein: number
  carbs: number
  veggies: boolean
  lowCarb: boolean
  moodTags: string[]
  location: string
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
    name: 'Nasi Lemak Ayam',
    price: 5.5,
    calories: 620,
    protein: 28,
    carbs: 72,
    veggies: false,
    lowCarb: false,
    moodTags: ['comfort', 'stressed', 'hungry', 'homesick'],
    location: 'Kolej 12 Cafeteria',
    imageUrl: '/meals/nasi-lemak.jpg',
  },
  {
    id: 'economy-rice',
    name: 'Economy Rice (3 Lauk)',
    price: 4.0,
    calories: 580,
    protein: 22,
    carbs: 65,
    veggies: true,
    lowCarb: false,
    moodTags: ['budget', 'broke', 'practical', 'tired'],
    location: 'UM Cafeteria Central',
    imageUrl: '/meals/economy-rice.jpg',
  },
  {
    id: 'salad-bowl',
    name: 'Garden Salad Bowl',
    price: 7.0,
    calories: 320,
    protein: 14,
    carbs: 28,
    veggies: true,
    lowCarb: true,
    moodTags: ['healthy', 'light', 'motivated', 'fresh'],
    location: 'The Cafe @ FPM',
    imageUrl: '/meals/salad-bowl.jpg',
  },
  {
    id: 'chicken-rice',
    name: 'Hainan Chicken Rice',
    price: 6.0,
    calories: 510,
    protein: 35,
    carbs: 55,
    veggies: false,
    lowCarb: false,
    moodTags: ['comfort', 'mild', 'tired', 'reliable'],
    location: 'PV128 Food Court',
    imageUrl: '/meals/chicken-rice.jpg',
  },
  {
    id: 'maggi-goreng',
    name: 'Maggi Goreng Special',
    price: 3.5,
    calories: 490,
    protein: 12,
    carbs: 68,
    veggies: false,
    lowCarb: false,
    moodTags: ['broke', 'stressed', 'late-night', 'comfort'],
    location: 'Mamak @ UM Gate 1',
    imageUrl: '/meals/maggi-goreng.jpg',
  },
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken + Brown Rice',
    price: 8.5,
    calories: 480,
    protein: 42,
    carbs: 40,
    veggies: true,
    lowCarb: true,
    moodTags: ['gym', 'motivated', 'healthy', 'disciplined'],
    location: 'Sports Centre Canteen',
    imageUrl: '/meals/grilled-chicken.jpg',
  },
  {
    id: 'roti-canai',
    name: 'Roti Canai + Teh Tarik',
    price: 2.5,
    calories: 380,
    protein: 9,
    carbs: 60,
    veggies: false,
    lowCarb: false,
    moodTags: ['broke', 'morning', 'minimal', 'classic'],
    location: 'Mamak @ UM Gate 1',
    imageUrl: '/meals/roti-canai.jpg',
  },
  {
    id: 'tofu-bowl',
    name: 'Tofu Veggie Bowl',
    price: 5.0,
    calories: 390,
    protein: 18,
    carbs: 42,
    veggies: true,
    lowCarb: true,
    moodTags: ['healthy', 'light', 'mindful', 'fresh'],
    location: 'Green Kitchen @ FS',
    imageUrl: '/meals/tofu-bowl.jpg',
  },
]

// ─── AI Decision Engine (Mock GLM Logic) ────────────────────────────────────

export function generateAIDecision(
  budget: number,
  mood: string,
  priorities: string[],
  daysUntilAllowance: number
): AIDecision {
  const moodLower = mood.toLowerCase()

  // Keyword scoring
  const moodKeywords = moodLower.split(/[\s,]+/)
  const isLowBudget = budget < 25 || daysUntilAllowance > 10
  const isBroke = budget < 15 || moodKeywords.some(w => ['broke', 'poor', 'no money', 'tight'].includes(w))
  const wantsComfort = moodKeywords.some(w => ['stress', 'stressed', 'sad', 'lonely', 'comfort', 'tired', 'exhausted'].includes(w))
  const wantsHealthy = priorities.includes('Veggies') || priorities.includes('Low Carb') || moodKeywords.some(w => ['healthy', 'fit', 'gym', 'diet'].includes(w))
  const wantsProtein = priorities.includes('Protein') || moodKeywords.some(w => ['gym', 'workout', 'protein', 'muscle'].includes(w))

  // Score each meal
  const scored = MEALS.map(meal => {
    let score = 0

    // Budget constraint (hard gate)
    if (meal.price > budget) { score -= 100 }

    // Daily budget pressure
    if (isLowBudget && meal.price <= 5) score += 30
    if (isBroke && meal.price <= 4) score += 50

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
  const budgetScore = Math.max(0, Math.min(100, Math.round(((budget - best.price) / budget) * 100)))
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
  const daysLeft = daysUntilAllowance
  const projectedSavings = Math.max(0, Math.round((avgRandomDailySpend - aiDailySpend) * 30))

  // Dynamic reasoning
  let reasoning = ''
  let moodInsight = ''
  let budgetInsight = ''

  if (isBroke && wantsComfort) {
    reasoning = `Z.AI 检测到情绪压力信号（"${mood.substring(0, 40)}..."）与严峻的财务状态（余额 RM${budget}，距发放助学金还有 ${daysUntilAllowance} 天）之间存在核心矛盾。系统优先保证财务可持续性，同时通过选择 ${best.name} 来满足安慰性进食需求。`
    moodInsight = '情绪状态表明需要熟悉感和满足感，但极低的预算需要约束。Z.AI 选择了兼具性价比和情感满足的方案。'
    budgetInsight = `以 RM${best.price} 的餐价维持每日双餐，预计本月可节省 RM${projectedSavings}，避免在月底陷入断粮困境。`
  } else if (isLowBudget && !wantsComfort) {
    reasoning = `财务数据显示预算压力较高（RM${budget} 余额，${daysUntilAllowance} 天后补充）。Z.AI 在维持营养均衡的前提下，推荐最低成本方案以保证学期末的财务弹性。`
    moodInsight = '情绪状态稳定，系统专注于最大化营养性价比，为后续的学习和活动提供能量保障。'
    budgetInsight = `选择 RM${best.price} 的套餐方案，与无计划消费相比，预计月节省 RM${projectedSavings}。`
  } else if (wantsHealthy) {
    reasoning = `Z.AI 识别到明确的健康导向偏好（优先级：${priorities.join('、')}），并结合当前预算 RM${budget}，选择了营养密度最高的可负担方案。在"健康目标"与"预算管理"之间实现最优平衡。`
    moodInsight = '健康意识驱动的选择能提升长期学业表现和精神状态。Z.AI 为您匹配了符合营养目标的餐品。'
    budgetInsight = `RM${best.price} 的高营养餐品相比随机消费，可减少因能量不足导致的零食冲动购买，月节省约 RM${projectedSavings}。`
  } else {
    reasoning = `基于当前预算 RM${budget}、心情描述和营养偏好，Z.AI 综合评估了 ${MEALS.length} 种餐品的多维指标，推荐 ${best.name} 作为最优决策。该餐品在财务可控性、营养均衡性和情绪适配性三个维度均表现优异。`
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

// ─── Nutritional Priority Options ────────────────────────────────────────────

export const NUTRITION_OPTIONS = ['Protein', 'Veggies', 'Low Carb'] as const

// ─── Mood Suggestions ────────────────────────────────────────────────────────

export const MOOD_SUGGESTIONS = [
  "I'm stressed and want comfort food but I'm broke",
  "I just had gym and need high protein",
  "I feel healthy today, want something light",
  "Totally exhausted, just need something filling",
  "On a tight budget, 5 days till allowance",
]
