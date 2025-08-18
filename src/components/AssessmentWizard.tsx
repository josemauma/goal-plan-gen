import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Form } from '@/components/ui/form'
import { BasicInfoStep } from '@/components/form-steps/BasicInfoStep'
import { LifestyleStep } from '@/components/form-steps/LifestyleStep'
import { GoalTimeframeStep } from '@/components/form-steps/GoalTimeframeStep'
import { AssessmentPreview } from '@/components/AssessmentPreview'
import { AssessmentResult } from '@/components/AssessmentResult'
import { FormData } from '@/types/form'
import { useToast } from '@/hooks/use-toast'
import { webhookSubmit } from '@/utils/webhookSubmit'

const schema = z.object({
  name: z.string().optional(),
  age: z.number().min(14).max(80),
  gender: z.enum(['male', 'female', 'other', 'na']),
  weight: z.object({
    value: z.number().min(30),
    unit: z.enum(['kg', 'lb']),
  }),
  height: z.object({
    value: z.number().min(120),
    unit: z.enum(['cm', 'ftin']),
  }),
  activity_level: z.enum(['sedentary', 'light', 'moderate', 'very', 'athlete']),
  diet_type: z.enum(['standard', 'vegetarian', 'vegan', 'keto', 'paleo', 'mediterranean']),
  allergies: z.array(z.string()),
  exercise_preference: z.enum(['gym', 'home', 'outdoor', 'mix']).optional(),
  equipment: z.enum(['none', 'basic', 'full_gym']).optional(),
  goal: z.enum(['lose', 'gain', 'maintain']),
  timeframe: z.enum(['4w', '8w', '12w']),
  consent: z.boolean().refine(val => val, 'You must accept the consent'),
})

interface AssessmentWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const steps = [
  {
    id: 'step_basics',
    title: 'Basics',
    fields: ['age', 'gender', 'weight', 'height'],
    help: 'These help estimate your energy needs accurately.',
  },
  {
    id: 'step_lifestyle', 
    title: 'Lifestyle',
    fields: ['activity_level', 'diet_type', 'allergies'],
    help: 'We tailor meals and training to your routine.',
  },
  {
    id: 'step_goals',
    title: 'Goal & Timeline',
    fields: ['goal', 'timeframe', 'consent'],
    help: 'Clear goals keep you consistent.',
  },
]

export function AssessmentWizard({ open, onOpenChange }: AssessmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      allergies: [],
      weight: { value: 70, unit: 'kg' },
      height: { value: 175, unit: 'cm' },
    },
  })

  const watchedValues = form.watch()
  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = async () => {
    const stepFields = currentStepData.fields
    const isValid = await form.trigger(stepFields as any)
    
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const formData = form.getValues()
      await webhookSubmit(formData)
      setShowResult(true)
      toast({
        title: "Plan generated!",
        description: "Your personalized nutrition and fitness plan is ready.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Couldn't generate your plan. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    setShowResult(false)
    form.reset()
    onOpenChange(false)
  }

  if (showResult) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <AssessmentResult 
            formData={form.getValues()}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold">
            Let's build your plan
          </DialogTitle>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
          {/* Form Panel */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">{currentStepData.title}</h3>
              <p className="text-sm text-muted-foreground">{currentStepData.help}</p>
            </div>

            <Form {...form}>
              <div className="space-y-4">
                {currentStep === 0 && <BasicInfoStep form={form} />}
                {currentStep === 1 && <LifestyleStep form={form} />}
                {currentStep === 2 && <GoalTimeframeStep form={form} />}
              </div>
            </Form>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={submitting}
              >
                {submitting ? 'Generating...' : 
                 currentStep === steps.length - 1 ? 'Generate my plan' : 'Continue'}
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="border-l border-border pl-6">
            <AssessmentPreview formData={watchedValues} />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <Badge variant="secondary">Science-based</Badge>
          <Badge variant="secondary">Privacy-first</Badge>
          <Badge variant="secondary">Trainer-approved</Badge>
        </div>
      </DialogContent>
    </Dialog>
  )
}