const FeaturesSection = () => {
  const features = [
    {
      title: "Personalized workout routines",
      description: "Custom exercise plans that adapt to your fitness level and available equipment.",
      icon: "💪"
    },
    {
      title: "Smart nutrition guidance", 
      description: "Evidence-based meal planning that fits your lifestyle and dietary preferences.",
      icon: "🥗"
    },
    {
      title: "Flexible for your lifestyle",
      description: "Plans that work around your schedule, not the other way around.",
      icon: "⏰"
    },
    {
      title: "Clear timelines and milestones",
      description: "Stay motivated with structured deadlines and achievable progress markers.",
      icon: "🏆"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="heading-lg">Built for Real Life</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Science-driven features designed to fit seamlessly into your daily routine.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-smooth group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="heading-xs">{feature.title}</h3>
                <p className="body-base text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;