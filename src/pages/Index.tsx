import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import SamplePlanSection from "@/components/SamplePlanSection";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Toaster } from "@/components/ui/toaster";
import WaveDivider from "@/components/WaveDivider";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="section-transition section-primary">
        <HeroSection />
      </div>
      
      <WaveDivider color="hsl(195 42% 94%)" />
      <div className="section-transition section-secondary">
        <HowItWorksSection />
      </div>
      
      <WaveDivider color="hsl(185 38% 92%)" />
      <div className="section-transition section-alternate">
        <FeaturesSection />
      </div>
      
      <WaveDivider color="hsl(175 33% 90%)" />
      <div className="section-transition section-primary">
        <SamplePlanSection />
      </div>
      
      <WaveDivider color="hsl(195 42% 94%)" />
      <div className="section-transition section-secondary">
        <TrustSection />
      </div>
      
      <WaveDivider color="hsl(185 38% 92%)" />
      <div className="section-transition section-alternate">
        <TestimonialsSection />
      </div>
      
      {/* Form Section */}
      <WaveDivider color="hsl(175 33% 90%)" />
      <section id="onboarding-form" className="py-20 section-transition section-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Get Your Personalized Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Answer a few questions and receive your custom nutrition and fitness plan
            </p>
          </div>
          <OnboardingForm />
        </div>
      </section>
      
      <WaveDivider color="hsl(195 42% 94%)" />
      <div className="section-transition section-secondary">
        <CTASection />
      </div>
      
      <WaveDivider color="hsl(185 38% 92%)" />
      <div className="section-transition section-alternate">
        <FAQSection />
      </div>
      
      <Footer />
      <Toaster />
    </main>
  );
};

export default Index;