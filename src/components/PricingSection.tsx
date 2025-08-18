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
    label: "1 month", 
    price: 3.99, 
    period: "1m", 
    id: "plan_1m",
    popular: false 
  },
  { 
    label: "3 months", 
    price: 4.99, 
    period: "3m", 
    id: "plan_3m",
    popular: true 
  },
  { 
    label: "12 months", 
    price: 14.99, 
    period: "12m", 
    id: "plan_12m",
    popular: false 
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
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center space-y-4">
                <h3 className="font-semibold text-lg">{plan.label}</h3>
                <div>
                  <span className="text-3xl font-bold">€{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Personalized nutrition plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Custom workout routines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>PDF export</span>
                  </li>
                  {plan.id !== 'plan_1m' && (
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>All diet types (Vegan, Keto, etc.)</span>
                    </li>
                  )}
                </ul>

                <Button
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlanSelect(plan.id);
                  }}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>All prices in EUR. Cancel anytime. No hidden fees.</p>
        </div>
      </CardContent>
    </Card>
  );
};