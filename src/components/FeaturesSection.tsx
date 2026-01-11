import { Box, Layers, Palette, Puzzle, Rocket, Shield } from "lucide-react";

const features = [
  {
    icon: Box,
    title: "Block-Based Design",
    description: "Create stunning designs using our intuitive block-based system. Stack, arrange, and customize with ease."
  },
  {
    icon: Palette,
    title: "Creative Freedom",
    description: "Express your unique vision with unlimited customization options and a rich library of components."
  },
  {
    icon: Layers,
    title: "Layered Architecture",
    description: "Build complex structures with our powerful layering system. Organize and manage with precision."
  },
  {
    icon: Puzzle,
    title: "Modular Components",
    description: "Mix and match components to create exactly what you need. Everything is designed to work together."
  },
  {
    icon: Rocket,
    title: "Lightning Fast",
    description: "Optimized for performance from the ground up. Your creations load instantly and run smoothly."
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Robust and reliable framework that scales with your needs. Build with confidence."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools and features designed to unleash your creativity and bring your ideas to life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 rounded-2xl bg-card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
