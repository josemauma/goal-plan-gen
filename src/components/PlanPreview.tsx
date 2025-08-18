import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FormData } from '@/types/form';

interface PlanPreviewProps {
  formData: FormData;
}

export const PlanPreview: React.FC<PlanPreviewProps> = ({ formData }) => {
  const getSampleNutrition = () => {
    switch (formData.goal) {
      case 'lose':
        return {
          breakfast: 'Greek yogurt with berries and almonds',
          lunch: 'Grilled chicken salad with olive oil dressing',
          dinner: 'Baked salmon with steamed vegetables',
          snack: 'Apple with almond butter'
        };
      case 'gain':
        return {
          breakfast: 'Oatmeal with banana, nuts, and protein powder',
          lunch: 'Quinoa bowl with chicken and avocado',
          dinner: 'Lean beef with sweet potato and broccoli',
          snack: 'Trail mix and protein shake'
        };
      default:
        return {
          breakfast: 'Whole grain toast with eggs and avocado',
          lunch: 'Mediterranean bowl with hummus',
          dinner: 'Grilled fish with quinoa and vegetables',
          snack: 'Greek yogurt with nuts'
        };
    }
  };

  const getSampleWorkouts = () => {
    const preference = formData.exercise_preference || 'mix';
    switch (preference) {
      case 'gym':
        return [
          'Monday: Upper body strength training',
          'Tuesday: Cardio (30 min)',
          'Wednesday: Lower body strength training',
          'Thursday: Rest or light yoga',
          'Friday: Full body circuit',
          'Weekend: Active recovery'
        ];
      case 'home':
        return [
          'Monday: Bodyweight upper body workout',
          'Tuesday: HIIT cardio (20 min)',
          'Wednesday: Lower body bodyweight workout',
          'Thursday: Yoga or stretching',
          'Friday: Full body circuit',
          'Weekend: Walk or light activity'
        ];
      default:
        return [
          'Monday: Strength training',
          'Tuesday: Cardio activity',
          'Wednesday: Strength training',
          'Thursday: Active recovery',
          'Friday: Mixed workout',
          'Weekend: Outdoor activity'
        ];
    }
  };

  const nutrition = getSampleNutrition();
  const workouts = getSampleWorkouts();
  const timeframeWeeks = parseInt(formData.timeframe.replace('w', ''));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-primary">
            Sample Weekly Plan (Preview)
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Plans adapt to user inputs — these are examples based on your selections.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Nutrition Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Daily Nutrition</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">Breakfast</h4>
                  <p className="text-sm text-muted-foreground">{nutrition.breakfast}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">Lunch</h4>
                  <p className="text-sm text-muted-foreground">{nutrition.lunch}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">Dinner</h4>
                  <p className="text-sm text-muted-foreground">{nutrition.dinner}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">Snack</h4>
                  <p className="text-sm text-muted-foreground">{nutrition.snack}</p>
                </div>
              </div>
            </div>

            {/* Workout Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Weekly Workouts</h3>
              <div className="space-y-2">
                {workouts.map((workout, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{workout}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Progress Tracking</h3>
            <div className="space-y-3">
              {Array.from({ length: timeframeWeeks }, (_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-16">Week {i + 1}</span>
                  <Progress value={i === 0 ? 100 : 0} className="flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {i === 0 ? 'Current' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-accent/10 rounded-lg">
              <h4 className="font-medium text-accent-foreground">
                Goal: {formData.goal} weight in {timeframeWeeks} weeks
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Stay consistent with your nutrition and workout plan to reach your goal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};