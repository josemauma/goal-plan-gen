import { OnboardingForm } from "@/components/OnboardingForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MakeYourPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="p-0 h-auto font-normal hover:text-foreground"
            >
              Home
            </Button>
            <span>/</span>
            <span className="text-foreground">Make your plan</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tell us about you
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Answer a few questions so we can tailor your nutrition and workouts.
          </p>
        </div>

        <OnboardingForm />
      </main>
    </div>
  );
};

export default MakeYourPlan;