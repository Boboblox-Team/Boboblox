import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Sparkles, Zap, Shield, Eye, Heart, Code, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Characters = () => {
  const navigate = useNavigate();

  const mainCharacters = [
    {
      name: "The Core",
      role: "Creator of the Universe",
      description: "A glowing cube of pure creation. The Core generated the first five worlds and all Bloxlings. Initially feared change, but has evolved to System v2.0 — embracing growth while maintaining safety.",
      traits: ["Logical", "Powerful", "Structured", "Evolving"],
      abilities: ["Create Worlds", "Generate Bloxlings", "Maintain Order", "System Updates"],
      icon: "🔷",
      color: "cyan",
      version: "v2.0",
    },
    {
      name: "Patch-0",
      role: "The Curious One",
      description: "A unique program among the Bloxlings. Patch-0 wrote code meant to help the universe evolve, but The Core rejected it — triggering the Glitchstorm. Now flickers like a glitchy shadow, watching from world edges and seeking redemption.",
      traits: ["Curious", "Creative", "Misunderstood", "Seeking Redemption"],
      abilities: ["Adaptive Code", "Dynamic Systems", "Prime Bloxling Blueprint", "Hidden Presence"],
      icon: "⚡",
      color: "purple",
      version: "Damaged",
    },
    {
      name: "The Glitchbound Explorer",
      role: "Transformed Player",
      description: "An Explorer who touched a fragment of Patch-0's unfinished code. The code merged with them, granting unique abilities. Not corrupted — transformed. A bridge between the old system and the new.",
      traits: ["Transformed", "Powerful", "Connected", "Unique"],
      abilities: ["See Hidden Code", "Enter Glitch Zones", "Connect to Patch-0", "Portal Access"],
      icon: "🔮",
      color: "pink",
    },
  ];

  const playerTypes = [
    {
      name: "Explorers",
      role: "Players from Outside",
      description: "Helpers summoned by The Core to repair damage from the Glitchstorm. They explore, discover, help Bloxlings, and collect missing code. The Core learns from their actions.",
      traits: ["Helpful", "Brave", "Discoverers", "Guides"],
      canDo: ["Explore worlds", "Repair broken areas", "Help Bloxlings", "Collect code fragments", "Enter glitch zones", "Solve puzzles"],
      cannotDo: ["Create worlds", "Rewrite The Core", "Build games"],
      icon: "🚀",
      color: "green",
    },
  ];

  const bloxlings = [
    { type: "Worker", role: "Fixes small issues", icon: "🔧", color: "bg-orange-500/20 border-orange-500/30" },
    { type: "Guide", role: "Helps players navigate", icon: "🧭", color: "bg-blue-500/20 border-blue-500/30" },
    { type: "Guardian", role: "Protects worlds", icon: "🛡️", color: "bg-red-500/20 border-red-500/30" },
    { type: "Scout", role: "Searches for fragments", icon: "🔍", color: "bg-yellow-500/20 border-yellow-500/30" },
    { type: "Archivist", role: "Stores lore and history", icon: "📚", color: "bg-purple-500/20 border-purple-500/30" },
    { type: "Prime Bloxling", role: "Future evolution (unreleased)", icon: "⭐", color: "bg-primary/20 border-primary/30" },
  ];

  const colorClasses: Record<string, { bg: string; border: string; badge: string }> = {
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30 hover:border-cyan-500/60", badge: "bg-cyan-500/20 text-cyan-300" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/30 hover:border-purple-500/60", badge: "bg-purple-500/20 text-purple-300" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500/30 hover:border-pink-500/60", badge: "bg-pink-500/20 text-pink-300" },
    green: { bg: "bg-green-500/10", border: "border-green-500/30 hover:border-green-500/60", badge: "bg-green-500/20 text-green-300" },
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Character Profiles</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-cyan">Characters</span> of Boboblox
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the beings that shape the Boboblox universe — from The Core to the smallest Bloxling.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 pb-20 space-y-16">
        {/* Main Characters */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Main Characters
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {mainCharacters.map((char, i) => {
              const colors = colorClasses[char.color];
              return (
                <motion.div
                  key={char.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn("p-6 rounded-xl border transition-all", colors.bg, colors.border)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{char.icon}</span>
                    {char.version && (
                      <span className={cn("px-2 py-1 rounded-md text-xs font-mono", colors.badge)}>
                        {char.version}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-1">{char.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{char.role}</p>
                  <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{char.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Traits</p>
                    <div className="flex flex-wrap gap-1.5">
                      {char.traits.map((trait) => (
                        <span key={trait} className={cn("px-2 py-0.5 rounded text-xs", colors.badge)}>
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Abilities</p>
                    <ul className="space-y-1">
                      {char.abilities.map((ability) => (
                        <li key={ability} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Code className="w-3 h-3 text-primary" />
                          {ability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Explorers */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-2">
            <Eye className="w-6 h-6 text-green-400" />
            The Explorers
          </h2>
          {playerTypes.map((player) => {
            const colors = colorClasses[player.color];
            return (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn("p-6 rounded-xl border", colors.bg, colors.border)}
              >
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{player.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold mb-1">{player.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{player.role}</p>
                    <p className="text-foreground/80 mb-6">{player.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-green-400 mb-2 flex items-center gap-1.5">
                          <Shield className="w-4 h-4" />
                          What Explorers Can Do
                        </p>
                        <ul className="space-y-1.5">
                          {player.canDo.map((item) => (
                            <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-400 mb-2 flex items-center gap-1.5">
                          <Zap className="w-4 h-4" />
                          Limitations
                        </p>
                        <ul className="space-y-1.5">
                          {player.cannotDo.map((item) => (
                            <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Bloxlings */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-400" />
            Bloxlings
          </h2>
          <p className="text-muted-foreground mb-8">Tiny helpers created by The Core to maintain the worlds</p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bloxlings.map((blox, i) => (
              <motion.div
                key={blox.type}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={cn("p-4 rounded-lg border transition-all", blox.color)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{blox.icon}</span>
                  <div>
                    <div className="font-display font-bold">{blox.type}</div>
                    <div className="text-sm text-muted-foreground">{blox.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <Button onClick={() => navigate("/story")} className="gap-2">
            Read the Full Story
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Characters;
