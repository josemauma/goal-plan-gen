const TrustSection = () => {
  const trustPoints = [
    {
      title: "Evidence-based nutrition",
      description: "All recommendations backed by peer-reviewed research and nutritional science.",
      icon: "🔬"
    },
    {
      title: "Structured but flexible workout guidance",
      description: "Progressive training plans that adapt to your schedule and equipment.",
      icon: "🏋️"
    },
    {
      title: "Clear deadlines to stay motivated",
      description: "Realistic timelines with milestone tracking to keep you on course.",
      icon: "📅"
    }
  ];

  const stats = [
    { number: "50k+", label: "Plans Created" },
    { number: "92%", label: "Success Rate" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="heading-lg">Science Meets Simplicity</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Your plan is built on proven methods, not fads. Real results from real science.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-display font-black text-gradient mb-2">
                {stat.number}
              </div>
              <div className="body-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Points */}
        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="heading-xs">{point.title}</h3>
              <p className="body-base text-muted-foreground">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;