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

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SamplePlanSection />
      <TrustSection />
      <TestimonialsSection />
      
      {/* Form Section */}
      <section id="onboarding-form" className="py-20 bg-muted/30">
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
      
      <CTASection />
      <FAQSection />
      <Footer />
      <Toaster />
    </main>
  );
};

export default Index;