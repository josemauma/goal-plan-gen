import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FormData } from '@/types/form'
import { useToast } from '@/hooks/use-toast'
import { exportToPDF } from '@/utils/pdfExport'
import { CheckCircle, Download, Save, AlertCircle } from 'lucide-react'

interface AssessmentResultProps {
  formData: FormData
  onClose: () => void
}

export function AssessmentResult({ formData, onClose }: AssessmentResultProps) {
  const { toast } = useToast()

  const handleDownloadPDF = async () => {
    try {
      await exportToPDF(formData)
      toast({
        title: "PDF Downloaded",
        description: "Your personalized plan has been saved to your downloads.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Could not generate PDF. Please try again.",
      })
    }
  }

  const handleSaveToDashboard = () => {
    toast({
      title: "Authentication Required",
      description: "Please sign up or log in to save your plan to the dashboard.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-12 w-12 text-accent-green" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Your personalized plan is ready</h2>
          <p className="text-muted-foreground">
            Based on your goals and preferences, we've created a custom nutrition and fitness plan
          </p>
        </div>
      </div>

      {/* Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent-green" />
            What's included in your plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-green rounded-full" />
              <span>Daily calories & macro targets</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-blue rounded-full" />
              <span>Weekly workout schedule</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>Grocery list basics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Progress tracking guidelines</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid gap-3">
        <Button 
          onClick={handleDownloadPDF}
          className="w-full h-12"
          size="lg"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleSaveToDashboard}
          className="w-full h-12"
          size="lg"
        >
          <Save className="mr-2 h-4 w-4" />
          Save to Dashboard
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Important Disclaimer</p>
            <p className="text-xs text-muted-foreground">
              This is general guidance and does not replace professional medical advice. 
              Consult with healthcare providers before starting any new diet or exercise program.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="secondary">Science-based</Badge>
        <Badge variant="secondary">Trainer-approved</Badge>
        <Badge variant="secondary">Secure & private</Badge>
      </div>

      {/* Methodology Link */}
      <div className="text-center">
        <Button variant="link" className="text-sm text-muted-foreground">
          How we calculate targets
        </Button>
      </div>

      {/* Close Button */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}