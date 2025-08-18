import { Button } from "@/components/ui/button";

const SamplePlanSection = () => {
  const weeklyPlan = [
    {
      day: "Monday",
      workout: "Upper Body Strength",
      duration: "45 min",
      meals: ["Greek yogurt with berries", "Grilled chicken salad", "Salmon with quinoa"]
    },
    {
      day: "Tuesday", 
      workout: "Cardio & Core",
      duration: "30 min",
      meals: ["Oatmeal with nuts", "Turkey wrap", "Lean beef stir-fry"]
    },
    {
      day: "Wednesday",
      workout: "Lower Body Strength", 
      duration: "45 min",
      meals: ["Smoothie bowl", "Quinoa Buddha bowl", "Grilled fish with veggies"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="heading-lg">See Your Plan in Action</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Here's a preview of what your weekly plan could look like — complete with workouts, 
            meals, and progress tracking.
          </p>
        </div>
        
        <div className="bg-card rounded-3xl p-8 shadow-medium max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="heading-sm">Week 1 Overview</h3>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-green">-2.3</div>
                  <div className="body-sm text-muted-foreground">lbs this week</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {weeklyPlan.map((plan, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-xl">
                  <div className="space-y-2">
                    <div className="font-semibold text-primary">{plan.day}</div>
                    <div className="space-y-1">
                      <div className="body-sm font-medium text-accent-blue">{plan.workout}</div>
                      <div className="body-sm text-muted-foreground">{plan.duration}</div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="body-sm text-muted-foreground mb-2">Today's Meals</div>
                    <div className="space-y-1">
                      {plan.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="body-sm text-foreground">
                          {meal}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 text-center">
              <Button variant="accent" size="lg">
                Get My Custom Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SamplePlanSection;