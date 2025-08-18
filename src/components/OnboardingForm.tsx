import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { FormData } from '@/types/form';
import { BasicInfoStep } from './form-steps/BasicInfoStep';
import { LifestyleStep } from './form-steps/LifestyleStep';
import { GoalTimeframeStep } from './form-steps/GoalTimeframeStep';
import { PlanPreview } from './PlanPreview';
import { PricingSection } from './PricingSection';
import { exportToPDF } from '@/utils/pdfExport';
import { submitToWebhook } from '@/utils/webhookSubmit';

const formSchema = z.object({
  name: z.string().max(60).optional(),
  age: z.number().min(14).max(80),
  gender: z.enum(['male', 'female', 'other', 'na']),
  weight: z.object({
    value: z.number().min(30).max(661),
    unit: z.enum(['kg', 'lb'])
  }),
  height: z.object({
    value: z.number().min(47).max(230),
    unit: z.enum(['cm', 'ftin'])
  }),
  activity_level: z.enum(['sedentary', 'light', 'moderate', 'very', 'athlete']),
  diet_type: z.enum(['standard', 'vegetarian', 'vegan', 'keto', 'paleo', 'mediterranean']),
  allergies: z.array(z.string()),
  exercise_preference: z.enum(['gym', 'home', 'outdoor', 'mix']).optional(),
  equipment: z.enum(['none', 'basic', 'full_gym']).optional(),
  goal: z.enum(['lose', 'gain', 'maintain']),
  timeframe: z.enum(['4w', '8w', '12w']),
  consent: z.boolean().refine(val => val === true, 'You must accept the guidance notice')
});

const steps = [
  { id: 1, title: 'Basics', fields: ['name', 'age', 'gender', 'weight', 'height'] },
  { id: 2, title: 'Lifestyle & Preferences', fields: ['activity_level', 'diet_type', 'allergies', 'exercise_preference', 'equipment'] },
  { id: 3, title: 'Goal & Timeframe', fields: ['goal', 'timeframe', 'consent'] }
];

export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('plan_1m');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: { value: 70, unit: 'kg' },
      height: { value: 170, unit: 'cm' },
      diet_type: 'standard',
      allergies: [],
      consent: false
    }
  });

  const nextStep = async () => {
    const currentStepFields = steps[currentStep - 1].fields;
    const isValid = await form.trigger(currentStepFields as any);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitToWebhook(data, selectedPlan);
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Plan generated!",
          description: "Check your personalized recommendations below.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "We couldn't submit your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePDFExport = () => {
    const formData = form.getValues();
    exportToPDF(formData);
    toast({
      title: "PDF exported",
      description: "Your plan has been downloaded as a PDF.",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep form={form} />;
      case 2:
        return <LifestyleStep form={form} />;
      case 3:
        return <GoalTimeframeStep form={form} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-primary">Your Personalized Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-4">
              <Button onClick={handlePDFExport} variant="outline">
                Download Plan as PDF
              </Button>
              <Button onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                form.reset();
              }}>
                Create Another Plan
              </Button>
            </div>
          </CardContent>
        </Card>
        <PlanPreview formData={form.getValues()} />
        <PricingSection selectedPlan={selectedPlan} onPlanSelect={setSelectedPlan} />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="w-full" />
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStep()}
            
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep === steps.length ? (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Generating...' : 'Generate My Plan'}
                </Button>
              ) : (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};