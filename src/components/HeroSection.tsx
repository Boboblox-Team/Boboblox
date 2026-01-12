import { ArrowRight, Box, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import bobobloxLogo from "@/assets/boboblox-logo.png";

const FloatingBlock = ({ 
  className, 
  delay = "0s",
  size = "lg" 
}: { 
  className?: string; 
  delay?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-20 h-20"
  };

  return (
    <div 
      className={`absolute ${sizes[size]} bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl backdrop-blur-sm animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-primary/10 rounded-xl" />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-20">
      {/* Animated background blocks */}
      <FloatingBlock className="top-[15%] left-[10%]" delay="0s" size="lg" />
      <FloatingBlock className="top-[25%] right-[15%]" delay="1s" size="md" />
      <FloatingBlock className="bottom-[30%] left-[20%]" delay="2s" size="sm" />
      <FloatingBlock className="top-[60%] right-[10%]" delay="0.5s" size="lg" />
      <FloatingBlock className="bottom-[20%] right-[25%]" delay="1.5s" size="md" />
      <FloatingBlock className="top-[40%] left-[5%]" delay="2.5s" size="sm" />

      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 animate-pulse-glow rounded-2xl p-1">
            <img 
              src={bobobloxLogo} 
              alt="Boboblox" 
              className="h-32 w-auto"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/50 border border-primary/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">A kid-friendly Roblox experience for ages 7+</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to{" "}
            <span className="text-gradient-cyan">Boboblox</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            The ultimate Roblox mod designed for young creators. Play, create, and earn 
            Bobobux in a safe and fun environment made just for you!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <Box className="w-8 h-8 text-primary mb-2" />
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">7+</span>
              <span className="text-sm text-muted-foreground">Ages</span>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-8 h-8 text-primary mb-2" />
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Bobobux</span>
              <span className="text-sm text-muted-foreground">Currency</span>
            </div>
            <div className="flex flex-col items-center">
              <Sparkles className="w-8 h-8 text-primary mb-2" />
              <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Safe</span>
              <span className="text-sm text-muted-foreground">For Kids</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
