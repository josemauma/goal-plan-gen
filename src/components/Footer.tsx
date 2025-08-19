import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blog" },
    { name: "Privacy Policy", href: "#privacy" }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#twitter" },
    { name: "Instagram", icon: Instagram, href: "#instagram" },
    { name: "LinkedIn", icon: Linkedin, href: "#linkedin" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="heading-xs text-white">NutriPlan</h3>
            <p className="body-base text-white/80">
              Personalized nutrition and fitness plans made simple.
            </p>
          </div>
          
          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="body-base text-white/80 hover:text-white transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Stay Updated</h4>
            <p className="body-sm text-white/80">
              Get nutrition tips and workout updates.
            </p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-accent-green"
              />
              <Button variant="accent" size="sm">
                Join
              </Button>
            </div>
          </div>
          
          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-smooth"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="body-sm text-white/60">
              © 2024 NutriPlan. All rights reserved.
            </p>
            <p className="body-sm text-white/60">
              Progress without pressure.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;