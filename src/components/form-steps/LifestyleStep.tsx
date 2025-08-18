import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FormData } from '@/types/form';

interface LifestyleStepProps {
  form: UseFormReturn<FormData>;
}

export const LifestyleStep: React.FC<LifestyleStepProps> = ({ form }) => {
  const allergies = form.watch('allergies') || [];

  const handleAllergyChange = (allergyValue: string, checked: boolean) => {
    const currentAllergies = allergies;
    if (checked) {
      const newAllergies = [...currentAllergies, allergyValue];
      form.setValue('allergies', newAllergies);
    } else {
      const newAllergies = currentAllergies.filter(a => a !== allergyValue);
      form.setValue('allergies', newAllergies);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="activity_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Daily Activity Level *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your typical activity level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly active</SelectItem>
                <SelectItem value="moderate">Moderately active</SelectItem>
                <SelectItem value="very">Very active</SelectItem>
                <SelectItem value="athlete">Athlete</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="diet_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Diet Type *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="vegan" disabled>
                        Vegan
                      </SelectItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Only for Subscription Plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="keto" disabled>
                        Keto
                      </SelectItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Only for Subscription Plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="paleo" disabled>
                        Paleo
                      </SelectItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Only for Subscription Plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="mediterranean" disabled>
                        Mediterranean
                      </SelectItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Only for Subscription Plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>Food Allergies / Intolerances</FormLabel>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: 'gluten', label: 'Gluten' },
            { value: 'lactose', label: 'Lactose' },
            { value: 'nuts', label: 'Nuts' },
            { value: 'seafood', label: 'Seafood' },
            { value: 'eggs', label: 'Eggs' },
            { value: 'none', label: 'None' }
          ].map((allergy) => (
            <div key={allergy.value} className="flex items-center space-x-2">
              <Checkbox
                id={allergy.value}
                checked={allergies.includes(allergy.value)}
                onCheckedChange={(checked) => 
                  handleAllergyChange(allergy.value, checked as boolean)
                }
              />
              <label htmlFor={allergy.value} className="text-sm font-medium">
                {allergy.label}
              </label>
            </div>
          ))}
        </div>
      </FormItem>

      <FormField
        control={form.control}
        name="exercise_preference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Exercise Preference</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="gym">Gym</SelectItem>
                <SelectItem value="home">Home workouts</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="mix">Mix</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="equipment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Available Equipment</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="basic">Basic (dumbbells, bands)</SelectItem>
                <SelectItem value="full_gym">Full gym</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};