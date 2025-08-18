import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="body-base text-muted-foreground font-medium tracking-wide uppercase">
                Nutrition and training made easy.
              </p>
              <h1 className="heading-xl max-w-4xl">
                Your Nutrition & Fitness Plan,{" "}
                <span className="text-gradient">Simplified.</span>
              </h1>
              <p className="body-lg text-muted-foreground max-w-2xl">
                Set your goal — lose, gain, or maintain weight — and get a step-by-step plan 
                tailored to your timeline.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto group"
                onClick={() => navigate('/make-your-plan')}
              >
                Make your plan
                <svg 
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <p className="text-sm text-muted-foreground">
                Evidence-based • Trainer-approved • PDF included
              </p>
              <Button variant="outline" size="lg" onClick={() => {
                const howItWorksElement = document.querySelector('#how-it-works');
                if (howItWorksElement) {
                  howItWorksElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                See how it works
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                <span className="body-sm text-muted-foreground">Takes less than 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                <span className="body-sm text-muted-foreground">100% free</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-3xl opacity-20"></div>
            <img 
              src={heroImage} 
              alt="Smart nutrition and fitness planning illustration"
              className="relative w-full h-auto rounded-3xl shadow-strong"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;