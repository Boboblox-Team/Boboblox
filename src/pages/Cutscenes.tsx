import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Film, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Cutscenes = () => {
  const navigate = useNavigate();

  const availableCutscenes = [
    {
      id: "the-core-awakens",
      title: "The Core Awakens",
      description: "Witness the creation of the first world as The Core brings Tropical Island into existence.",
      duration: "~35 sec",
      world: "Tropical Island",
      chapter: 1,
      icon: "✨",
    },
    {
      id: "patch-0-origin",
      title: "The Curious One",
      description: "Discover how Patch-0 wrote the forbidden code that would change everything.",
      duration: "~30 sec",
      world: "Origin",
      chapter: 2,
      icon: "⚡",
    },
    {
      id: "the-glitchstorm",
      title: "The Glitchstorm",
      description: "Experience the catastrophic moment when The Core rejected Patch-0's code.",
      duration: "~40 sec",
      world: "All Worlds",
      chapter: 3,
      icon: "🌪️",
    },
    {
      id: "explorers-arrive",
      title: "Explorers Arrive",
      description: "The portals open and Explorers enter the universe for the first time.",
      duration: "~30 sec",
      world: "Portal Gateway",
      chapter: 4,
      icon: "🚀",
    },
    {
      id: "glitchbound-transformation",
      title: "Glitchbound Transformation",
      description: "One Explorer touches Patch-0's fragment and is forever changed.",
      duration: "~35 sec",
      world: "Glitch Zone",
      chapter: 5,
      icon: "🔮",
    },
  ];

  const lockedCutscenes = [
    {
      title: "Core System v2.0",
      description: "The Core's evolution and acceptance of change.",
      chapter: 6,
      icon: "🔷",
    },
    {
      title: "HiddenRealm-X Discovery",
      description: "Entering Patch-0's unfinished world.",
      chapter: "Future",
      icon: "❓",
    },
    {
      title: "Prime Bloxling Awakening",
      description: "The evolution of Bloxlings begins.",
      chapter: "Future",
      icon: "⭐",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
              <Film className="w-4 h-4" />
              <span className="text-sm font-medium">Cinematic Experience</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-cyan">Cut-Scenes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the story of Boboblox through immersive animated sequences.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 pb-20 space-y-12">
        {/* Available Cutscenes */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Play className="w-6 h-6 text-primary" />
            Available Cut-Scenes
          </h2>
          
          <div className="grid gap-4">
            {availableCutscenes.map((cutscene, i) => (
              <motion.div
                key={cutscene.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-3xl">
                  {cutscene.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-primary">Chapter {cutscene.chapter}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{cutscene.world}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold">{cutscene.title}</h3>
                  <p className="text-sm text-muted-foreground">{cutscene.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {cutscene.duration}
                  </div>
                  <Button
                    onClick={() => navigate(`/cutscene/${cutscene.id}`)}
                    className="gap-2 group-hover:bg-primary"
                  >
                    <Play className="w-4 h-4" />
                    Watch
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Locked Cutscenes */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-muted-foreground" />
            Coming Soon
          </h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            {lockedCutscenes.map((cutscene, i) => (
              <motion.div
                key={cutscene.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-muted/50 border border-border/50 opacity-60"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl grayscale">{cutscene.icon}</span>
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-1">
                  Chapter {cutscene.chapter}
                </div>
                <h3 className="font-display font-bold mb-1">{cutscene.title}</h3>
                <p className="text-sm text-muted-foreground">{cutscene.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cutscenes;
