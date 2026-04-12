import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Globe, Lock, Play, Sparkles, MapPin, ChevronRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Worlds = () => {
  const navigate = useNavigate();

  const existingWorlds = [
    {
      name: "Tropical Island",
      description: "The first world created by The Core. Golden sands, swaying palms, and crystal waters — a peaceful paradise and the starting point for all Explorers.",
      features: ["Peaceful beaches", "Palm forests", "Hidden caves", "Starter quests"],
      icon: "🏝️",
      color: "bg-cyan-500/10 border-cyan-500/30",
      cutsceneId: "the-core-awakens",
      slug: "TropicalIsland",
    },
    {
      name: "City Center",
      description: "A bustling urban environment with tall buildings and busy streets. Home to many Bloxlings who maintain the infrastructure.",
      features: ["Tall skyscrapers", "Busy streets", "Underground tunnels", "Tech puzzles"],
      icon: "🏙️",
      color: "bg-blue-500/10 border-blue-500/30",
      slug: "CityCenter",
    },
    {
      name: "Snowy Mountains",
      description: "Frozen peaks and icy caves. Home to resilient Guardian Bloxlings who protect ancient secrets buried in the ice.",
      features: ["Frozen peaks", "Ice caves", "Aurora lights", "Guardian quests"],
      icon: "🏔️",
      color: "bg-slate-500/10 border-slate-500/30",
      slug: "SnowyMountains",
    },
    {
      name: "Desert Dunes",
      description: "Endless golden sands hiding ancient secrets beneath. Scout Bloxlings search for code fragments buried by the Glitchstorm.",
      features: ["Ancient ruins", "Hidden oases", "Sandstorms", "Fragment hunts"],
      icon: "🏜️",
      color: "bg-yellow-500/10 border-yellow-500/30",
      slug: "DesertDunes",
    },
    {
      name: "Forest Adventure",
      description: "Dense woodland filled with mysteries and hidden paths. Archivist Bloxlings guard ancient lore in tree-top libraries.",
      features: ["Dense canopy", "Hidden trails", "Tree houses", "Lore discoveries"],
      icon: "🌲",
      color: "bg-green-500/10 border-green-500/30",
      slug: "ForestAdventure",
    },
  ];

  const futureWorlds = [
    {
      name: "HiddenRealm-X",
      description: "Patch-0's unfinished world. What secrets await in this realm that was never completed? The next step in the expansion.",
      features: ["Unfinished zones", "Patch-0 echoes", "Experimental code", "Unknown dangers"],
      icon: "❓",
      color: "bg-purple-500/10 border-purple-500/30",
      status: "Next Release",
    },
    {
      name: "The Glitch Frontier",
      description: "Where glitch energy flows freely. Unstable but full of potential. Only Glitchbound Explorers can safely navigate here.",
      features: ["Unstable terrain", "Glitch portals", "Energy streams", "Transformation zones"],
      icon: "⚡",
      color: "bg-pink-500/10 border-pink-500/30",
      status: "Coming Soon",
    },
    {
      name: "Prime Sanctuary",
      description: "Home of the future Prime Bloxling. A sacred and protected realm where the evolution of Bloxlings began.",
      features: ["Sacred grounds", "Prime chambers", "Evolution pools", "Ancient wisdom"],
      icon: "⭐",
      color: "bg-amber-500/10 border-amber-500/30",
      status: "Coming Soon",
    },
    {
      name: "The Sky Archive",
      description: "Where ancient code is stored. A library floating in the clouds, maintained by Archivist Bloxlings.",
      features: ["Cloud platforms", "Code libraries", "Floating gardens", "Knowledge quests"],
      icon: "☁️",
      color: "bg-sky-500/10 border-sky-500/30",
      status: "Planned",
    },
    {
      name: "The Code Sea",
      description: "A shifting ocean of pure data. An ever-changing landscape where reality itself is written in real-time.",
      features: ["Data streams", "Shifting islands", "Code currents", "Reality puzzles"],
      icon: "🌊",
      color: "bg-indigo-500/10 border-indigo-500/30",
      status: "Planned",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">World Explorer</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-cyan">Worlds</span> of Boboblox
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Explore the ten realms of the Boboblox universe — five existing and five yet to be unlocked.
            </p>
            <Button
              onClick={() => navigate("/worlds/explore")}
              className="gap-2"
              size="lg"
            >
              <Compass className="w-5 h-5" />
              Explore in 3D
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 pb-20 space-y-16">
        {/* Existing Worlds */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Existing Worlds
              </h2>
              <p className="text-muted-foreground">The five original worlds created by The Core</p>
            </div>
            <span className="text-sm text-primary font-medium">5 Active</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {existingWorlds.map((world, i) => (
              <motion.div
                key={world.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={cn("p-6 rounded-xl border transition-all cursor-pointer", world.color)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{world.icon}</span>
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    Active
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{world.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{world.description}</p>
                
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {world.features.map((feature) => (
                      <span key={feature} className="px-2 py-0.5 rounded bg-background/50 text-xs text-muted-foreground">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {world.cutsceneId && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/cutscene/${world.cutsceneId}`);
                    }}
                    className="w-full gap-1.5 border-primary/50 text-primary hover:bg-primary/10 mb-2"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Watch Cut-Scene
                  </Button>
                )}

                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/worlds/play/${world.slug}`);
                  }}
                  className="w-full gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  Enter World
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Future Worlds */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" />
                Future Worlds
              </h2>
              <p className="text-muted-foreground">Realms yet to be unlocked as the universe expands</p>
            </div>
            <span className="text-sm text-muted-foreground font-medium">5 Locked</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {futureWorlds.map((world, i) => (
              <motion.div
                key={world.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn("p-6 rounded-xl border opacity-75 relative overflow-hidden", world.color)}
              >
                <div className="absolute top-3 right-3">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl grayscale">{world.icon}</span>
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    {world.status}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{world.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{world.description}</p>
                
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Expected Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {world.features.map((feature) => (
                      <span key={feature} className="px-2 py-0.5 rounded bg-muted/50 text-xs text-muted-foreground">
                        {feature}
                      </span>
                    ))}
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
          <Button onClick={() => navigate("/characters")} className="gap-2">
            Meet the Characters
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Worlds;
