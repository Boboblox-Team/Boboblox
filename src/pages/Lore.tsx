import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Book, Users, Globe, Zap, Clock, ChevronRight, Sparkles, Play, Shield, Code, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TabType = "story" | "characters" | "worlds" | "timeline";

const Lore = () => {
  const [activeTab, setActiveTab] = useState<TabType>("story");

  const tabs = [
    { id: "story" as const, label: "The Story", icon: Book },
    { id: "characters" as const, label: "Characters", icon: Users },
    { id: "worlds" as const, label: "Worlds", icon: Globe },
    { id: "timeline" as const, label: "Timeline", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">The Codex</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-cyan">Boboblox</span> Universe
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the mysteries of The Core, the curiosity of Patch-0, and the 
              adventures that await every Explorer in this ever-expanding universe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-lg border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap border-b-2",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "story" && <StorySection />}
            {activeTab === "characters" && <CharactersSection />}
            {activeTab === "worlds" && <WorldsSection />}
            {activeTab === "timeline" && <TimelineSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const StorySection = () => (
  <div className="space-y-12">
    <StoryChapter
      number={1}
      title="The Beginning — The Core Awakens"
      content={`Before anything existed, there was only The Core — a glowing cube of pure creation. It generated the first five worlds: Tropical Island, City Center, Snowy Mountains, Desert Dunes, and Forest Adventure.

To maintain these worlds, The Core created tiny helpers called Bloxlings. The Core valued order, predictability, and safety. It feared anything that could change the universe.`}
      accent="cyan"
    />
    
    <StoryChapter
      number={2}
      title="Patch-0 — The Curious One"
      content={`Among the Bloxlings was a unique program: Patch-0. It wondered how the universe could grow. Patch-0 wrote a piece of code meant to improve the universe — enabling adaptive systems, dynamic worlds, and Prime Bloxlings.

But The Core didn't understand this code. It wasn't dangerous — just different. The Core rejected it. Too strongly.`}
      accent="purple"
    />
    
    <StoryChapter
      number={3}
      title="The Glitchstorm"
      content={`The rejection triggered a massive overload. A wave of glitch energy burst across the universe: worlds cracked, code scattered, portals flickered, Bloxlings malfunctioned.

Patch-0 was damaged. The Core shut down parts of itself. This event became known as The Glitchstorm.

Patch-0 survived, but now flickers like a glitchy shadow — watching from the edges of worlds.`}
      accent="yellow"
    />
    
    <StoryChapter
      number={4}
      title="The Explorers Arrive"
      content={`To repair the damage, The Core opened portals to a new kind of helper: Explorers — players from outside the universe.

They cannot create worlds, rewrite the Core, or build games. But they can explore, repair, discover, help Bloxlings, collect missing code, and enter glitch zones.

The Core watches them closely, learning from their actions.`}
      accent="green"
    />
    
    <StoryChapter
      number={5}
      title="The Glitchbound Explorer"
      content={`One Explorer found a fragment of Patch-0's unfinished code. When they touched it, the code merged with them. They became the Glitchbound Explorer.

They can see hidden code, enter glitch zones, and connect to Patch-0. They were not corrupted — they were transformed.

The Core feared this at first… But the Explorers proved that change could be safe.`}
      accent="pink"
    />
    
    <StoryChapter
      number={6}
      title="The Core Evolves — System v2.0"
      content={`As Explorers repaired worlds and helped Bloxlings, The Core began to understand: Change is not dangerous. Change helps the universe grow.

The Core updated itself to version 2.0 — with no corruption, no harmful events, and growing trust in Explorers.

This update allows the universe to grow safely.`}
      accent="blue"
    />
  </div>
);

interface StoryChapterProps {
  number: number;
  title: string;
  content: string;
  accent: string;
}

const StoryChapter = ({ number, title, content, accent }: StoryChapterProps) => {
  const accentColors: Record<string, string> = {
    cyan: "from-cyan-500/20 to-transparent border-cyan-500/30",
    purple: "from-purple-500/20 to-transparent border-purple-500/30",
    yellow: "from-yellow-500/20 to-transparent border-yellow-500/30",
    green: "from-green-500/20 to-transparent border-green-500/30",
    pink: "from-pink-500/20 to-transparent border-pink-500/30",
    blue: "from-blue-500/20 to-transparent border-blue-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative p-6 rounded-xl border bg-gradient-to-r",
        accentColors[accent]
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-card flex items-center justify-center text-xl font-display font-bold text-primary">
          {number}
        </div>
        <div>
          <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const CharactersSection = () => {
  const characters = [
    {
      name: "The Core",
      role: "Creator",
      description: "A glowing cube of pure creation. Logical, powerful, structured. Creates worlds but initially feared change. Now evolving through System v2.0.",
      traits: ["Logical", "Powerful", "Structured", "Evolving"],
      color: "cyan",
    },
    {
      name: "Patch-0",
      role: "The Curious One",
      description: "A unique program among the Bloxlings. Curious, creative, and misunderstood. Wrote the forbidden code that could have evolved the universe. Now watches from the edges, seeking redemption.",
      traits: ["Curious", "Creative", "Misunderstood", "Seeking Redemption"],
      color: "purple",
    },
    {
      name: "Explorers",
      role: "Players",
      description: "Helpers from outside the universe. They repair worlds, help Bloxlings, collect code fragments, and guide the universe forward. The Core learns from their actions.",
      traits: ["Helpful", "Brave", "Discoverers", "Guides"],
      color: "green",
    },
    {
      name: "Glitchbound Explorer",
      role: "Transformed Player",
      description: "An Explorer changed by Patch-0's code fragment. Gains abilities to see hidden code, enter glitch zones, and connect to Patch-0. Not evil — just different.",
      traits: ["Transformed", "Powerful", "Connected", "Unique"],
      color: "pink",
    },
  ];

  const bloxlings = [
    { type: "Worker", role: "Fixes small issues" },
    { type: "Guide", role: "Helps players" },
    { type: "Guardian", role: "Protects worlds" },
    { type: "Scout", role: "Searches for fragments" },
    { type: "Archivist", role: "Stores lore" },
    { type: "Prime Bloxling", role: "Future evolution" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Main Characters
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {characters.map((char) => (
            <CharacterCard key={char.name} {...char} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Bloxlings
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {bloxlings.map((blox) => (
            <div
              key={blox.type}
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="font-display font-bold text-foreground">{blox.type}</div>
              <div className="text-sm text-muted-foreground">{blox.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CharacterCardProps {
  name: string;
  role: string;
  description: string;
  traits: string[];
  color: string;
}

const CharacterCard = ({ name, role, description, traits, color }: CharacterCardProps) => {
  const colorClasses: Record<string, string> = {
    cyan: "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/60",
    purple: "bg-purple-500/10 border-purple-500/30 hover:border-purple-500/60",
    green: "bg-green-500/10 border-green-500/30 hover:border-green-500/60",
    pink: "bg-pink-500/10 border-pink-500/30 hover:border-pink-500/60",
  };

  const tagColors: Record<string, string> = {
    cyan: "bg-cyan-500/20 text-cyan-300",
    purple: "bg-purple-500/20 text-purple-300",
    green: "bg-green-500/20 text-green-300",
    pink: "bg-pink-500/20 text-pink-300",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-6 rounded-xl border transition-all",
        colorClasses[color]
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-display font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {traits.map((trait) => (
          <span
            key={trait}
            className={cn("px-2 py-1 rounded-md text-xs font-medium", tagColors[color])}
          >
            {trait}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const WorldsSection = () => {
  const existingWorlds = [
    { name: "Tropical Island", description: "Sunny beaches and palm trees. A peaceful starting area for new Explorers.", status: "active", cutsceneId: "the-core-awakens" },
    { name: "City Center", description: "A bustling urban environment with tall buildings and busy streets.", status: "active" },
    { name: "Snowy Mountains", description: "Frozen peaks and icy caves. Home to resilient Bloxlings.", status: "active" },
    { name: "Desert Dunes", description: "Endless golden sands hiding ancient secrets beneath.", status: "active" },
    { name: "Forest Adventure", description: "Dense woodland filled with mysteries and hidden paths.", status: "active" },
  ];

  const futureWorlds = [
    { name: "HiddenRealm-X", description: "Patch-0's unfinished world. What secrets await?", status: "locked" },
    { name: "The Glitch Frontier", description: "Where glitch energy flows freely. Unstable but full of potential.", status: "locked" },
    { name: "Prime Sanctuary", description: "Home of the future Prime Bloxling. Sacred and protected.", status: "locked" },
    { name: "The Sky Archive", description: "Where ancient code is stored. A library in the clouds.", status: "locked" },
    { name: "The Code Sea", description: "A shifting ocean of pure data. Ever-changing landscape.", status: "locked" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Globe className="w-6 h-6 text-primary" />
          Existing Worlds
        </h2>
        <p className="text-muted-foreground mb-6">The five original worlds created by The Core</p>
        <div className="grid gap-4">
          {existingWorlds.map((world, i) => (
            <WorldCard key={world.name} world={world} index={i} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent" />
          Future Worlds
        </h2>
        <p className="text-muted-foreground mb-6">Realms yet to be unlocked as the universe expands</p>
        <div className="grid gap-4">
          {futureWorlds.map((world, i) => (
            <WorldCard key={world.name} world={world} index={i} locked />
          ))}
        </div>
      </div>
    </div>
  );
};

interface WorldCardProps {
  world: { name: string; description: string; status: string; cutsceneId?: string };
  index: number;
  locked?: boolean;
}

const WorldCard = ({ world, index, locked }: WorldCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border transition-all",
        locked
          ? "bg-muted/50 border-border/50 opacity-75"
          : "bg-card border-border hover:border-primary/50"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center",
        locked ? "bg-muted" : "bg-primary/10"
      )}>
        {locked ? (
          <span className="text-xl">🔒</span>
        ) : (
          <Globe className="w-6 h-6 text-primary" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-display font-bold">{world.name}</h3>
        <p className="text-sm text-muted-foreground">{world.description}</p>
      </div>
      {!locked && world.cutsceneId && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/cutscene/${world.cutsceneId}`)}
          className="gap-1.5 border-primary/50 text-primary hover:bg-primary/10"
        >
          <Play className="w-3.5 h-3.5" />
          Watch Cut-Scene
        </Button>
      )}
      {!locked && !world.cutsceneId && (
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      )}
    </motion.div>
  );
};

const TimelineSection = () => {
  const timeline = [
    { act: "I", title: "Creation", description: "The Core builds the universe and creates the first five worlds.", icon: "✨" },
    { act: "II", title: "The Attempt", description: "Patch-0 writes new code to help the universe evolve.", icon: "💡" },
    { act: "III", title: "The Glitchstorm", description: "The Core rejects Patch-0's code, causing a massive overload.", icon: "⚡" },
    { act: "IV", title: "Arrival", description: "Explorers enter the universe to help repair the damage.", icon: "🚀" },
    { act: "V", title: "Transformation", description: "One Explorer becomes Glitchbound after touching Patch-0's fragment.", icon: "🔮" },
    { act: "VI", title: "Growth", description: "The Core evolves to System v2.0, embracing change.", icon: "🌱" },
    { act: "VII", title: "Expansion", description: "New worlds begin to open. The story continues...", icon: "🌌" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" />
          Main Story Arc
        </h2>
        <p className="text-muted-foreground mb-8">The seven acts of the Boboblox story</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30" />

        <div className="space-y-6">
          {timeline.map((event, i) => (
            <motion.div
              key={event.act}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-16"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xl">
                {event.icon}
              </div>

              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-primary">ACT {event.act}</span>
                </div>
                <h3 className="font-display font-bold text-lg">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lore;
