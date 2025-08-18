import { PlanPreview } from "@/components/PlanPreview";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Download, Home } from "lucide-react";
import { exportToPDF } from "@/utils/pdfExport";
import { useToast } from "@/hooks/use-toast";

const PlanReady = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get form data from navigation state
  const formData = location.state?.formData;

  const handleDownloadPDF = async () => {
    try {
      if (formData) {
        await exportToPDF(formData);
        toast({
          title: "PDF Downloaded",
          description: "Your personalized plan has been saved to your downloads.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Could not generate PDF. Please try again.",
      });
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your personalized plan is ready
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your goals and preferences, we've created a custom nutrition and fitness plan
          </p>
        </div>

        {/* Plan Preview */}
        <div className="mb-12">
          <PlanPreview formData={formData} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2"
            size="lg"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button 
            variant="outline"
            onClick={handleBackToHome}
            className="flex items-center gap-2"
            size="lg"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PlanReady;