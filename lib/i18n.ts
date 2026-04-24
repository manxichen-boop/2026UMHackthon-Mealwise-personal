export type Language = 'zh' | 'en'

export const translations = {
  zh: {
    // Navigation
    navTitle: 'SmartBite',
    navSubtitle: '顾问',
    poweredBy: '由',
    zAIGLM: 'Z.AI GLM',
    hackathon: 'UMHackathon 2026',

    // Sidebar Header
    decisionInput: '决策输入',
    smartBiteAdvisor: 'SmartBite 顾问',

    // Psychological Budget
    psychologicalBudget: '心理价位',
    budgetEstimate: '预计每餐预算',
    rmCurrency: 'RM',
    critical: '危急',
    budgetTight: '预算紧张',
    controlNeeded: '注意控制',
    goodStatus: '状态良好',
    comfortable: '充裕',

    // Total Remaining Allowance
    totalRemainingAllowance: '总剩余生活费',
    enterTotalAllowance: '输入您本月总剩余的生活费',

    // Mood
    moodCraving: '心情/食欲',
    moodPlaceholder: '例: 我压力大想吃安慰食物但预算紧张...',
    quickInput: '快速输入建议',
    letAIDecide: 'AI 根据我的财务状况决策',

    // Cuisine Preference
    preferredCuisine: '偏好菜系',
    malayCuisine: '马来菜',
    indianCuisine: '印度菜',
    thaiCuisine: '泰国菜',
    fastFood: '快餐',
    chineseCuisine: '中餐',
    fusionCuisine: '融合菜',
    japaneseFood: '日料',
    koreanFood: '韩餐',

    // Days Until Allowance
    daysUntilAllowance: '距下次发款',
    hasRegularAllowance: '定期发放生活费',
    daysAmount: '天',
    strictControl: '需严格控制',
    stayCautious: '保持谨慎',
    soonRefill: '即将补充',

    // Analyze Button
    analyzing: 'Z.AI 分析中...',
    generateDecision: '生成 AI 餐饮决策',

    // Hero Card
    recommendedMeal: '推荐餐品',
    confidence: '置信度',
    location: '位置',
    openInMaps: '在 Google Maps 中打开',

    // Reasoning Card
    zAIDecisionIntelligence: 'Z.AI 决策智能',
    reasoning: '推理过程',
    moodScore: '心情匹配',
    budgetScore: '预算效率',
    nutritionScore: '营养价值',
    moodInsight: '心情洞察',
    budgetInsight: '财务洞察',

    // Forecast Card
    spendingForecast: '30 天支出预测',
    randomSpending: '随机消费',
    aiGuided: 'AI 建议',
    projectedSavings: '预计节省',

    // Empty State
    smartMealAdvisor: '智能餐饮决策助手',
    inputInfoDescription: '输入您的预算、心情和菜系偏好，让 Z.AI 为您生成最优餐饮方案，量化您的月度节省。',
    feature1: '心情 × 财务权衡分析',
    feature2: '月度支出预测',
    feature3: '营养优化推荐',
    fillLeftSide: '← 在左侧填写信息后点击生成',

    // Footer
    footer: 'SmartBite 顾问 · UMHackathon 2026 · Domain 2: AI 赋能经济决策',
  },
  en: {
    // Navigation
    navTitle: 'SmartBite',
    navSubtitle: 'Advisor',
    poweredBy: 'Powered by',
    zAIGLM: 'Z.AI GLM',
    hackathon: 'UMHackathon 2026',

    // Sidebar Header
    decisionInput: 'Decision Input',
    smartBiteAdvisor: 'SmartBite Advisor',

    // Psychological Budget
    psychologicalBudget: 'Psychological Budget',
    budgetEstimate: 'Estimated per-meal budget',
    rmCurrency: 'RM',
    critical: 'Critical',
    budgetTight: 'Budget Tight',
    controlNeeded: 'Monitor Spending',
    goodStatus: 'Good Status',
    comfortable: 'Comfortable',

    // Total Remaining Allowance
    totalRemainingAllowance: 'Total Remaining Allowance',
    enterTotalAllowance: 'Enter total remaining allowance for this month',

    // Mood
    moodCraving: 'Mood / Craving',
    moodPlaceholder: 'E.g., I\'m stressed and want comfort food but I\'m broke...',
    quickInput: 'Quick Input Suggestions',
    letAIDecide: 'Let AI decide based on my financial health',

    // Cuisine Preference
    preferredCuisine: 'Preferred Cuisine Type',
    malayCuisine: 'Malay',
    indianCuisine: 'Indian',
    thaiCuisine: 'Thai',
    fastFood: 'Fast Food',
    chineseCuisine: 'Chinese',
    fusionCuisine: 'Fusion',
    japaneseFood: 'Japanese',
    koreanFood: 'Korean',

    // Days Until Allowance
    daysUntilAllowance: 'Days Until Next Allowance',
    hasRegularAllowance: 'I receive regular allowance',
    daysAmount: 'days',
    strictControl: 'Strict control needed',
    stayCautious: 'Stay cautious',
    soonRefill: 'Soon refill coming',

    // Analyze Button
    analyzing: 'Z.AI analyzing...',
    generateDecision: 'Generate AI Decision',

    // Hero Card
    recommendedMeal: 'Recommended Meal',
    confidence: 'Confidence',
    location: 'Location',
    openInMaps: 'Open in Google Maps',

    // Reasoning Card
    zAIDecisionIntelligence: 'Z.AI Decision Intelligence',
    reasoning: 'Reasoning',
    moodScore: 'Mood Match',
    budgetScore: 'Budget Efficiency',
    nutritionScore: 'Nutrition Value',
    moodInsight: 'Mood Insight',
    budgetInsight: 'Financial Insight',

    // Forecast Card
    spendingForecast: '30-Day Spending Forecast',
    randomSpending: 'Random Spending',
    aiGuided: 'AI Guided',
    projectedSavings: 'Projected Savings',

    // Empty State
    smartMealAdvisor: 'Smart Meal Decision Advisor',
    inputInfoDescription: 'Input your budget, mood, and cuisine preferences, let Z.AI generate the optimal meal plan for you and quantify your monthly savings.',
    feature1: 'Mood × Financial Trade-off Analysis',
    feature2: '30-Day Spending Forecast',
    feature3: 'Nutrition Optimized',
    fillLeftSide: '← Fill information on the left and click generate',

    // Footer
    footer: 'SmartBite Advisor · UMHackathon 2026 · Domain 2: AI Empowering Economic Decisions',
  },
}

export function t(key: keyof typeof translations.zh, lang: Language): string {
  return translations[lang][key] || translations.zh[key]
}
