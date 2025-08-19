const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Finally a plan that fits my schedule!",
      author: "Anna R.",
      details: "Lost 15 lbs in 12 weeks",
      avatar: "A"
    },
    {
      quote: "I gained weight consistently without overthinking meals.",
      author: "David L.", 
      details: "Gained 8 lbs of muscle in 10 weeks",
      avatar: "D"
    },
    {
      quote: "The workouts actually work with my busy life as a parent.",
      author: "Sarah M.",
      details: "Maintained weight through postpartum",
      avatar: "S"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="heading-lg">Real People, Real Results</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            See how others have transformed their health with personalized plans.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-smooth">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="body-sm text-muted-foreground">{testimonial.details}</div>
                  </div>
                </div>
                
                <blockquote className="body-lg text-foreground">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent-green fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;