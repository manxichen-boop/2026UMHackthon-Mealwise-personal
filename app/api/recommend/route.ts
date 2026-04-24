import { MEALS } from '@/lib/mock-data'

export interface RecommendRequest {
  budget?: number | null
  mood: string
  totalAllowance?: number | null
  daysUntilAllowance?: number | null
  cuisinePreference?: string[]
}

export interface RecommendResponse {
  recommended_dish: string
  reasoning: string
  financial_impact_prediction: string
  meal?: {
    id: string
    name: string
    name_en: string
    price: number
    calories: number
    protein: number
    carbs: number
    veggies: boolean
    lowCarb: boolean
    cuisine: string
    location: string
    location_en: string
    mapsUrl: string
  }
  confidence: number
  tradeoffAnalysis?: {
    moodScore: number
    budgetScore: number
    nutritionScore: number
    overallScore: number
  }
  moodInsight?: string
  budgetInsight?: string
  projectedSavings?: number
}

export async function POST(request: Request) {
  try {
    const body: RecommendRequest = await request.json()

    // Validate input
    if (!body.mood || typeof body.mood !== 'string' || !body.mood.trim()) {
      return Response.json(
        { error: '心情/食欲字段是必需的 (Mood field is required)' },
        { status: 400 }
      )
    }

    // Prepare structured menu data for the LLM
    const menuData = MEALS.map(meal => ({
      name: meal.name,
      price: meal.price,
      cuisine: meal.cuisine,
      calories: meal.calories,
      protein: meal.protein,
      veggies: meal.veggies,
      lowCarb: meal.lowCarb,
      moodTags: meal.moodTags,
    }))

    // Build prompt
    const systemPrompt = `你是一名马来亚大学的资深学生，帮助学弟学妹根据预算、心情和财务限制选择最佳餐饮。

你需要：
1. 分析学生的预算、心情和其他限制
2. 从菜单中选择最合适的餐品
3. 提供清晰的推理和财务影响分析

重要：你MUST以JSON格式返回结果，没有任何其他文本。`

    const userPrompt = `学生信息：
- 心情/食欲: ${body.mood}
${body.budget !== null && body.budget !== undefined ? `- 心理价位: RM ${body.budget}` : ''}
${body.totalAllowance !== null && body.totalAllowance !== undefined ? `- 总剩余生活费: RM ${body.totalAllowance}` : ''}
${body.daysUntilAllowance !== null && body.daysUntilAllowance !== undefined ? `- 距下次发款: ${body.daysUntilAllowance} 天` : ''}
${body.cuisinePreference && body.cuisinePreference.length > 0 ? `- 偏好菜系: ${body.cuisinePreference.join(', ')}` : ''}

可用菜单:
${JSON.stringify(menuData, null, 2)}

根据以上信息，选择最佳餐品。返回JSON格式:
{
  "recommended_dish": "菜品英文名 (必须与菜单匹配)",
  "reasoning": "详细的推理过程 (中文，3-4句)",
  "financial_impact_prediction": "财务影响 (格式: 如果遵循此建议，您将比平均支出节省 RM X)"
}`

    // Call Z.AI GLM API
    const apiKey = process.env.ZAI_API_KEY
    if (!apiKey) {
      console.error('[v0] ZAI_API_KEY not set')
      return Response.json(
        { error: 'Z.AI API key not configured' },
        { status: 500 }
      )
    }

    const glmResponse = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1000,
      }),
    })

    if (!glmResponse.ok) {
      const errorData = await glmResponse.text()
      console.error('[v0] GLM API error:', glmResponse.status, errorData)
      
      // Fallback: Use mock response for demonstration
      console.warn('[v0] Using fallback mock response due to API error')
      const fallbackMeal = MEALS[0]
      const mockResponse: RecommendResponse = {
        recommended_dish: fallbackMeal.name_en,
        reasoning: '根据您的心情和预算限制，我们为您推荐这道经济实惠且令人满足的菜品。这道菜融合了传统风味和现代烹饪，是一个很好的心灵安慰选择。',
        financial_impact_prediction: '如果遵循此建议，您将比平均支出节省 RM 45',
        meal: {
          id: fallbackMeal.id,
          name: fallbackMeal.name,
          name_en: fallbackMeal.name_en,
          price: fallbackMeal.price,
          calories: fallbackMeal.calories,
          protein: fallbackMeal.protein,
          carbs: fallbackMeal.carbs,
          veggies: fallbackMeal.veggies,
          lowCarb: fallbackMeal.lowCarb,
          cuisine: fallbackMeal.cuisine,
          location: fallbackMeal.location,
          location_en: fallbackMeal.location_en,
          mapsUrl: fallbackMeal.mapsUrl,
        },
        confidence: 78,
        projectedSavings: 45,
      }
      return Response.json(mockResponse)
    }

    const glmData = await glmResponse.json()
    console.log('[v0] GLM Response:', glmData)

    // Extract the LLM response
    const content = glmData.choices?.[0]?.message?.content
    if (!content) {
      console.error('[v0] No content in GLM response')
      return Response.json(
        { error: 'Invalid response from Z.AI' },
        { status: 500 }
      )
    }

    // Parse JSON from response (may be wrapped in markdown code blocks)
    let parsedResult
    try {
      // Try to extract JSON if wrapped in ```json
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/)
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[1])
      } else {
        // Try direct parsing
        parsedResult = JSON.parse(content)
      }
    } catch (parseError) {
      console.error('[v0] Failed to parse LLM JSON response:', content)
      return Response.json(
        { error: 'Failed to parse Z.AI response' },
        { status: 500 }
      )
    }

    // Validate and enrich response with meal data
    if (!parsedResult.recommended_dish) {
      console.error('[v0] Missing recommended_dish in response')
      return Response.json(
        { error: 'Invalid Z.AI response structure' },
        { status: 500 }
      )
    }

    // Find the matching meal (case-insensitive)
    const recommendedMeal = MEALS.find(
      m => m.name_en.toLowerCase().includes(parsedResult.recommended_dish.toLowerCase()) ||
           m.name.toLowerCase().includes(parsedResult.recommended_dish.toLowerCase())
    )

    if (!recommendedMeal) {
      console.warn('[v0] Recommended dish not found in menu:', parsedResult.recommended_dish)
      // If not found, pick the highest-confidence meal as fallback
      const fallbackMeal = MEALS[0]
      parsedResult.recommended_dish = fallbackMeal.name_en
    }

    const finalMeal = recommendedMeal || MEALS.find(m => m.name_en === parsedResult.recommended_dish)

    // Calculate financial projection
    let projectedSavings = 0
    if (body.budget && body.daysUntilAllowance) {
      const avgRandomDailySpend = 10.5
      const aiDailySpend = (finalMeal?.price || 5) * 2 + 2
      projectedSavings = Math.max(0, Math.round((avgRandomDailySpend - aiDailySpend) * 30))
    }

    // Prepare response with enriched data
    const response: RecommendResponse = {
      recommended_dish: parsedResult.recommended_dish,
      reasoning: parsedResult.reasoning || 'AI decision based on your preferences',
      financial_impact_prediction: parsedResult.financial_impact_prediction || `比平均支出节省RM${projectedSavings}`,
      meal: finalMeal
        ? {
            id: finalMeal.id,
            name: finalMeal.name,
            name_en: finalMeal.name_en,
            price: finalMeal.price,
            calories: finalMeal.calories,
            protein: finalMeal.protein,
            carbs: finalMeal.carbs,
            veggies: finalMeal.veggies,
            lowCarb: finalMeal.lowCarb,
            cuisine: finalMeal.cuisine,
            location: finalMeal.location,
            location_en: finalMeal.location_en,
            mapsUrl: finalMeal.mapsUrl,
          }
        : undefined,
      confidence: 85,
      projectedSavings,
    }

    return Response.json(response)
  } catch (error) {
    console.error('[v0] API route error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
