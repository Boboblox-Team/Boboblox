import { Coins, Gamepad2, Palette, Shield, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Kid-Safe Gaming",
    description: "Designed for ages 7+ with enhanced safety features, chat filters, and parental controls to keep young players protected."
  },
  {
    icon: Coins,
    title: "Bobobux Currency",
    description: "Earn and spend Bobobux just like Robux! Customize your avatar, unlock items, and trade with friends."
  },
  {
    icon: Gamepad2,
    title: "All Your Favorite Games",
    description: "Play thousands of Roblox games with the Boboblox experience. Same fun, safer environment."
  },
  {
    icon: Palette,
    title: "Creative Freedom",
    description: "Build and design your own worlds with easy-to-use creation tools perfect for young developers."
  },
  {
    icon: Users,
    title: "Friend-Friendly",
    description: "Connect with friends in a moderated community. Play together, chat safely, and have fun!"
  },
  {
    icon: Sparkles,
    title: "Exclusive Content",
    description: "Access Boboblox-exclusive items, games, and events made specially for our community."
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
            Why Choose Boboblox?
          </h2>
          <p className="text-muted-foreground text-lg">
            A safer, kid-friendly way to enjoy Roblox with all the features you love plus exclusive Boboblox perks.
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
