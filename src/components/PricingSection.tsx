import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  selectedPlan: string;
  onPlanSelect: (planId: string) => void;
}

const pricingPlans = [
  {
    id: "plan_1m",
    label: "1 month",
    price_total: 3.99,
    period: "1m",
    most_popular: false,
    is_default: true,
    cta: "Selected",
    features: [
      "Personalized nutrition plans",
      "Custom workout routines",
      "Progress tracking",
      "PDF export",
      "Standard & Vegetarian diets",
      "Weekly goal reminders",
      "Basic grocery list",
      "Recipe suggestions (limited)",
      "Auto-adjust plan every 2 weeks",
      "Email support (48h)"
    ],
    diet_access: {
      included: ["standard", "vegetarian"],
      restricted: [
        { value: "vegan", tooltip: "Only for Subscription Plan" },
        { value: "keto", tooltip: "Only for Subscription Plan" },
        { value: "paleo", tooltip: "Only for Subscription Plan" },
        { value: "mediterranean", tooltip: "Only for Subscription Plan" }
      ]
    }
  },
  {
    id: "plan_3m",
    label: "3 months",
    price_total: 4.99,
    period: "3m",
    most_popular: true,
    cta: "Select Plan",
    stats: {
      effective_price_per_month: 1.66,
      save_vs_monthly_percent: 58.3,
      baseline_monthly_price: 3.99
    },
    features: [
      "Everything in 1 month",
      "All diet types (Vegan, Keto, etc.)",
      "Smart macro targets (weekly adjust)",
      "Full grocery list + swap options",
      "Recipe swaps by allergies",
      "Workout progression planner",
      "Habit & water reminders",
      "Sync with Apple Health / Google Fit",
      "Priority support (24h)",
      "Pause plan once per cycle"
    ],
    diet_access: {
      included: ["standard", "vegetarian", "vegan", "keto", "paleo", "mediterranean"]
    }
  },
  {
    id: "plan_12m",
    label: "12 months",
    price_total: 14.99,
    period: "12m",
    most_popular: false,
    cta: "Select Plan",
    stats: {
      effective_price_per_month: 1.25,
      save_vs_monthly_percent: 68.7,
      baseline_monthly_price: 3.99
    },
    features: [
      "Everything in 3 months",
      "AI Coach chat (message limits)",
      "Advanced analytics & trends",
      "Periodized training blocks",
      "Meal-prep mode (batch cooking)",
      "Monthly expert tips PDF pack",
      "Seasonal challenges & badges",
      "Export plan to CSV & calendar (ICS)",
      "1 extra seat for a friend/family",
      "Early access to new features",
      "Plan pause up to 2 months / year",
      "Dedicated support lane"
    ],
    diet_access: {
      included: ["standard", "vegetarian", "vegan", "keto", "paleo", "mediterranean"]
    }
  }
];

export const PricingSection: React.FC<PricingSectionProps> = ({ 
  selectedPlan, 
  onPlanSelect 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Choose Your Plan</CardTitle>
        <p className="text-center text-muted-foreground">
          Some diet types and premium features are only available with a Subscription Plan.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-6 border rounded-lg cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              }`}
              onClick={() => onPlanSelect(plan.id)}
            >
              {plan.most_popular && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center space-y-4">
                <h3 className="font-semibold text-lg">{plan.label}</h3>
                <div className="space-y-1">
                  <div>
                    <span className="text-3xl font-bold">€{plan.price_total}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.stats && (
                    <div className="text-sm">
                      <div className="text-primary font-medium">
                        €{plan.stats.effective_price_per_month}/month
                      </div>
                      <div className="text-green-600">
                        Save {plan.stats.save_vs_monthly_percent}% vs monthly
                      </div>
                    </div>
                  )}
                </div>
                
                <ul className="space-y-2 text-sm text-left max-h-48 overflow-y-auto">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlanSelect(plan.id);
                  }}
                >
                  {selectedPlan === plan.id ? 'Selected' : plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
          <p>Prices include VAT where applicable.</p>
          <div className="flex justify-center gap-6">
            <span>Pause or cancel anytime.</span>
            <span>Secure payments & VAT invoices.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};