import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Book, Sparkles, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Story = () => {
  const navigate = useNavigate();

  const chapters = [
    {
      number: 1,
      title: "The Beginning — The Core Awakens",
      content: `Before anything existed, there was only The Core — a glowing cube of pure creation. It generated the first five worlds: Tropical Island, City Center, Snowy Mountains, Desert Dunes, and Forest Adventure.

To maintain these worlds, The Core created tiny helpers called Bloxlings. The Core valued order, predictability, and safety. It feared anything that could change the universe.`,
      accent: "cyan",
      cutsceneId: "the-core-awakens",
    },
    {
      number: 2,
      title: "Patch-0 — The Curious One",
      content: `Among the Bloxlings was a unique program: Patch-0. It wondered how the universe could grow. Patch-0 wrote a piece of code meant to improve the universe — enabling adaptive systems, dynamic worlds, and Prime Bloxlings.

But The Core didn't understand this code. It wasn't dangerous — just different. The Core rejected it. Too strongly.`,
      accent: "purple",
      cutsceneId: "patch-0-origin",
    },
    {
      number: 3,
      title: "The Glitchstorm",
      content: `The rejection triggered a massive overload. A wave of glitch energy burst across the universe: worlds cracked, code scattered, portals flickered, Bloxlings malfunctioned.

Patch-0 was damaged. The Core shut down parts of itself. This event became known as The Glitchstorm.

Patch-0 survived, but now flickers like a glitchy shadow — watching from the edges of worlds.`,
      accent: "yellow",
      cutsceneId: "the-glitchstorm",
    },
    {
      number: 4,
      title: "The Explorers Arrive",
      content: `To repair the damage, The Core opened portals to a new kind of helper: Explorers — players from outside the universe.

They cannot create worlds, rewrite the Core, or build games. But they can explore, repair, discover, help Bloxlings, collect missing code, and enter glitch zones.

The Core watches them closely, learning from their actions.`,
      accent: "green",
      cutsceneId: "explorers-arrive",
    },
    {
      number: 5,
      title: "The Glitchbound Explorer",
      content: `One Explorer found a fragment of Patch-0's unfinished code. When they touched it, the code merged with them. They became the Glitchbound Explorer.

They can see hidden code, enter glitch zones, and connect to Patch-0. They were not corrupted — they were transformed.

The Core feared this at first… But the Explorers proved that change could be safe.`,
      accent: "pink",
      cutsceneId: "glitchbound-transformation",
    },
    {
      number: 6,
      title: "The Core Evolves — System v2.0",
      content: `As Explorers repaired worlds and helped Bloxlings, The Core began to understand: Change is not dangerous. Change helps the universe grow.

The Core updated itself to version 2.0 — with no corruption, no harmful events, and growing trust in Explorers.

This update allows the universe to grow safely.`,
      accent: "blue",
    },
    {
      number: 7,
      title: "The Future — Expansion Begins",
      content: `With the universe stable again, new realms begin to open:

• HiddenRealm-X — Patch-0's unfinished world
• The Glitch Frontier — where glitch energy flows freely
• Prime Sanctuary — home of the future Prime Bloxling
• The Sky Archive — where ancient code is stored
• The Code Sea — a shifting ocean of pure data

Patch-0 seeks redemption. The Glitchbound Explorer seeks answers. The Core continues to evolve. And the Explorers guide the universe forward.`,
      accent: "indigo",
    },
  ];

  const accentColors: Record<string, { gradient: string; border: string; badge: string }> = {
    cyan: { gradient: "from-cyan-500/20 to-transparent", border: "border-cyan-500/30", badge: "bg-cyan-500/20 text-cyan-300" },
    purple: { gradient: "from-purple-500/20 to-transparent", border: "border-purple-500/30", badge: "bg-purple-500/20 text-purple-300" },
    yellow: { gradient: "from-yellow-500/20 to-transparent", border: "border-yellow-500/30", badge: "bg-yellow-500/20 text-yellow-300" },
    green: { gradient: "from-green-500/20 to-transparent", border: "border-green-500/30", badge: "bg-green-500/20 text-green-300" },
    pink: { gradient: "from-pink-500/20 to-transparent", border: "border-pink-500/30", badge: "bg-pink-500/20 text-pink-300" },
    blue: { gradient: "from-blue-500/20 to-transparent", border: "border-blue-500/30", badge: "bg-blue-500/20 text-blue-300" },
    indigo: { gradient: "from-indigo-500/20 to-transparent", border: "border-indigo-500/30", badge: "bg-indigo-500/20 text-indigo-300" },
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
              <Book className="w-4 h-4" />
              <span className="text-sm font-medium">The Complete Story</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-cyan">Boboblox</span> Story
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The complete tale of creation, chaos, and evolution in the Boboblox universe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapters */}
      <section className="container mx-auto max-w-4xl px-4 pb-20">
        <div className="space-y-8">
          {chapters.map((chapter, index) => {
            const colors = accentColors[chapter.accent];
            return (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border bg-gradient-to-r ${colors.gradient} ${colors.border}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-card flex items-center justify-center text-2xl font-display font-bold text-primary border border-border">
                    {chapter.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-display font-bold">{chapter.title}</h3>
                      {chapter.cutsceneId && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/cutscene/${chapter.cutsceneId}`)}
                          className={`gap-1.5 ${colors.badge} hover:opacity-80`}
                        >
                          <Play className="w-3 h-3" />
                          <span className="text-xs">Watch</span>
                        </Button>
                      )}
                    </div>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {chapter.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue to Codex */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button onClick={() => navigate("/lore")} className="gap-2">
            Explore the Codex
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Story;
