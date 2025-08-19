import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How does the app know what plan to create?",
      answer: "We use your goal (lose, gain, or maintain weight), timeline, current fitness level, dietary preferences, and available equipment to generate a personalized plan. Our algorithm is based on proven nutritional science and exercise physiology."
    },
    {
      question: "Do I need gym access?",
      answer: "Not at all! We create plans for any situation — home workouts with no equipment, basic equipment like dumbbells, or full gym access. Just tell us what you have available."
    },
    {
      question: "Is this suitable for vegetarians/vegans?",
      answer: "Absolutely! We accommodate all dietary preferences including vegetarian, vegan, keto, paleo, and more. Our nutrition guidance adapts to ensure you get complete nutrition regardless of your dietary choices."
    },
    {
      question: "How accurate is the weight projection?",
      answer: "Our projections are based on scientific metabolic calculations and real user data. While individual results vary, most users reach their goals within 5-10% of our projected timeline when following the plan consistently."
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="heading-lg">Common Questions</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about getting started with your personalized plan.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-2xl shadow-soft overflow-hidden">
              <button
                className="w-full px-8 py-6 text-left hover:bg-muted/20 transition-smooth"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="heading-xs pr-4">{faq.question}</h3>
                  <svg 
                    className={`w-6 h-6 text-muted-foreground transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="body-base text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;