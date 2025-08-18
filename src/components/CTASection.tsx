import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="heading-lg text-white">
            Start your personalized plan today.
          </h2>
          
          <p className="body-lg text-white/90 max-w-2xl mx-auto">
            Join thousands who've transformed their health with science-backed, 
            personalized nutrition and fitness plans.
          </p>
          
          <div className="space-y-4">
            <Button 
              variant="secondary" 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 shadow-strong hover:shadow-glow"
              onClick={() => {
                const formElement = document.getElementById('onboarding-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get My Plan
              <svg 
                className="ml-2 h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            
            <p className="body-sm text-white/80">
              Takes less than 2 minutes. 100% free.
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-8 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2 min</div>
              <div className="body-sm text-white/80">Setup time</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Free</div>
              <div className="body-sm text-white/80">Always</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="body-sm text-white/80">Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;