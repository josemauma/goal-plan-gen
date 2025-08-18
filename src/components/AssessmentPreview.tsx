import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FormData } from '@/types/form'
import { Calculator, Utensils, Dumbbell } from 'lucide-react'

interface AssessmentPreviewProps {
  formData: Partial<FormData>
}

export function AssessmentPreview({ formData }: AssessmentPreviewProps) {
  const calculateCalories = () => {
    const { age, gender, weight, height, activity_level, goal } = formData
    
    if (!age || !gender || !weight || !height || !activity_level) {
      return '—'
    }

    // Harris-Benedict Equation (simplified)
    let bmr: number
    const weightInKg = weight.unit === 'kg' ? weight.value : weight.value * 0.453592
    const heightInCm = height.unit === 'cm' ? height.value : height.value * 30.48
    
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age)
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      athlete: 1.9,
    }

    let totalCalories = bmr * activityMultipliers[activity_level]

    // Goal adjustment
    if (goal === 'lose') {
      totalCalories -= 500 // 500 calorie deficit
    } else if (goal === 'gain') {
      totalCalories += 300 // 300 calorie surplus
    }

    return Math.round(totalCalories).toLocaleString()
  }

  const calculateMacros = () => {
    const calories = calculateCalories()
    if (calories === '—') {
      return { protein: '—g', carbs: '—g', fat: '—g' }
    }

    const totalCals = parseInt(calories.replace(',', ''))
    const { diet_type, goal } = formData

    // Macro distributions based on diet type and goal
    let proteinPercent = 0.25
    let fatPercent = 0.25
    let carbPercent = 0.5

    if (diet_type === 'keto') {
      proteinPercent = 0.25
      fatPercent = 0.70
      carbPercent = 0.05
    } else if (goal === 'gain') {
      proteinPercent = 0.30
      fatPercent = 0.25
      carbPercent = 0.45
    }

    const protein = Math.round((totalCals * proteinPercent) / 4)
    const fat = Math.round((totalCals * fatPercent) / 9)
    const carbs = Math.round((totalCals * carbPercent) / 4)

    return {
      protein: `${protein}g`,
      carbs: `${carbs}g`,
      fat: `${fat}g`,
    }
  }

  const getSampleMeal = () => {
    const { diet_type, allergies, goal } = formData
    
    if (!diet_type) return 'Sample breakfast appears here'

    const mealOptions = {
      standard: 'Scrambled eggs with avocado toast and berries',
      vegetarian: 'Greek yogurt with granola and mixed berries',
      vegan: 'Overnight oats with almond milk and banana',
      keto: 'Avocado and bacon omelet with spinach',
      paleo: 'Sweet potato hash with eggs and vegetables',
      mediterranean: 'Greek yogurt with nuts and honey',
    }

    let meal = mealOptions[diet_type] || mealOptions.standard

    // Adjust for allergies
    if (allergies?.includes('eggs') && meal.includes('eggs')) {
      meal = 'Protein smoothie with banana and spinach'
    }
    if (allergies?.includes('nuts') && meal.includes('nuts')) {
      meal = meal.replace('nuts', 'seeds')
    }

    return meal
  }

  const getSampleWorkout = () => {
    const { goal } = formData
    
    if (!goal) return 'Sample workout appears here'

    const workoutOptions = {
      lose: 'HIIT circuit: Burpees, mountain climbers, jump squats (20 min)',
      gain: 'Strength training: Squats, deadlifts, bench press (45 min)', 
      maintain: 'Full body: Push-ups, lunges, planks, cardio (30 min)',
    }

    return workoutOptions[goal]
  }

  const macros = calculateMacros()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Plan Preview</h3>
        <p className="text-sm text-muted-foreground">Preview updates as you answer</p>
      </div>

      {/* Calorie Target */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Calculator className="h-4 w-4" />
            Daily Targets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{calculateCalories()}</div>
            <div className="text-sm text-muted-foreground">calories/day</div>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="font-medium text-accent-green">{macros.protein}</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div>
              <div className="font-medium text-accent-blue">{macros.carbs}</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div>
              <div className="font-medium text-orange-500">{macros.fat}</div>
              <div className="text-xs text-muted-foreground">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Meal */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Utensils className="h-4 w-4" />
            Sample Breakfast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{getSampleMeal()}</p>
        </CardContent>
      </Card>

      {/* Sample Workout */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Dumbbell className="h-4 w-4" />
            Sample Workout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{getSampleWorkout()}</p>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">Science-based</Badge>
          <Badge variant="outline" className="text-xs">Privacy-first</Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Preview updates as you answer.
        </p>
      </div>
    </div>
  )
}