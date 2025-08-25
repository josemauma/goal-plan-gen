import { useTranslation } from "react-i18next";

const HowItWorksSection = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      number: "01",
      title: t('howItWorks.steps.setGoal.title'),
      description: t('howItWorks.steps.setGoal.description'),
      icon: "🎯"
    },
    {
      number: "02", 
      title: t('howItWorks.steps.getPlan.title'),
      description: t('howItWorks.steps.getPlan.description'),
      icon: "📋"
    },
    {
      number: "03",
      title: t('howItWorks.steps.trackProgress.title'), 
      description: t('howItWorks.steps.trackProgress.description'),
      icon: "📈"
    }
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="heading-lg">{t('howItWorks.title')}</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-accent transform -translate-y-1/2 z-0"></div>
              )}
              
              <div className="relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-smooth group-hover:-translate-y-2">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-4xl font-display font-black text-accent-green mb-2">
                    {step.number}
                  </div>
                  <h3 className="heading-xs">{step.title}</h3>
                  <p className="body-base text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;