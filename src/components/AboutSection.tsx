import { Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import bobobloxLogo from "@/assets/boboblox-logo.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Boboblox</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Roblox, Reimagined for Kids
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Boboblox is a kid-friendly mod of Roblox designed specifically for players 
              ages 7 and up. We take the games and creativity you love and wrap it in 
              a safer, more welcoming experience.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              With Bobobux — our version of Robux styled for Boboblox — kids can 
              customize their avatars, unlock exclusive items, and enjoy all their 
              favorite experiences in a protected environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" asChild>
                <a href="https://github.com/Boboblox-Team" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 w-5 h-5" />
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/Boboblox-Team/Boboblox-website" target="_blank" rel="noopener noreferrer">
                  Source Code
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl scale-110" />
              
              {/* Main visual container */}
              <div className="relative bg-card-gradient border border-border rounded-3xl p-12 backdrop-blur-sm">
                <img 
                  src={bobobloxLogo} 
                  alt="Boboblox Logo" 
                  className="w-48 h-48 mx-auto"
                />
                <div className="mt-8 text-center">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Safe Gaming for Kids
                  </h3>
                  <p className="text-muted-foreground">
                    Ages 7+ • Parental Controls
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
