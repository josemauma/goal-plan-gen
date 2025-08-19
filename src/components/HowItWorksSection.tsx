const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Set Your Goal",
      description: "Tell us your goal — choose weight loss, gain, or maintenance + time frame.",
      icon: "🎯"
    },
    {
      number: "02", 
      title: "Get Your Plan",
      description: "We generate your plan — balanced nutrition + weekly workout schedule.",
      icon: "📋"
    },
    {
      number: "03",
      title: "Track Progress", 
      description: "Track your progress — follow, adapt, and stay consistent.",
      icon: "📈"
    }
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="heading-lg">How It Works</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Progress without pressure. Three simple steps to your personalized plan.
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