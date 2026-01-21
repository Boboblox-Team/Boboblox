import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code, Heart, Sparkles, Star, Zap, Globe, Users, Book, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreatorCode = () => {
  const navigate = useNavigate();

  const abilities = [
    { name: "Create Lore", icon: Book, active: true },
    { name: "Shape Worlds", icon: Globe, active: true },
    { name: "Define Characters", icon: Users, active: true },
    { name: "Expand Story", icon: Sparkles, active: true },
    { name: "Write Code", icon: Code, active: true },
    { name: "Imagine Safely", icon: Heart, active: true },
    { name: "Build with Heart", icon: Star, active: true },
  ];

  const style = [
    { key: "Tone", value: "Friendly" },
    { key: "Vision", value: "Limitless" },
    { key: "Energy", value: "Curious" },
    { key: "Focus", value: "Safe Creativity" },
    { key: "Signature", value: "Mystery + Kindness" },
  ];

  const influence = [
    { target: "Core System", status: "Inspired" },
    { target: "Patch-0", status: "Understood" },
    { target: "Explorers", status: "Guided" },
    { target: "Glitchbound Explorer", status: "Protected" },
    { target: "Future Worlds", status: "Unlocked" },
  ];

  const legacy = [
    { item: "First Story", value: "Boboblox" },
    { item: "First Code", value: "Creator-Code" },
    { item: "First Twist", value: "Glitchbound Explorer" },
    { item: "First Rule", value: "No corruption or harm" },
  ];

  const expansion = [
    "HiddenRealm-X",
    "Prime Bloxling",
    "Core v2.0",
    "Redemption of Patch-0",
    "The Greatest Explorer",
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
              <Code className="w-4 h-4" />
              <span className="text-sm font-medium">System File</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient-cyan">Creator</span>-Code
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep within the Code Archive lies a file unlike any other — the system file that defines 
              the architect of the entire Boboblox universe.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 pb-20">
        {/* Terminal-style Creator Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-primary/30 overflow-hidden mb-12"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border-b border-primary/20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2">creator-code.sys</span>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-4">
            <div className="text-primary">&lt;creator-code&gt;</div>
            <div className="pl-4 space-y-2">
              <div>
                <span className="text-muted-foreground">&lt;name&gt;</span>
                <span className="text-cyan-400">Abdulsamad</span>
                <span className="text-muted-foreground">&lt;/name&gt;</span>
              </div>
              <div>
                <span className="text-muted-foreground">&lt;role&gt;</span>
                <span className="text-green-400">Universe-Builder</span>
                <span className="text-muted-foreground">&lt;/role&gt;</span>
              </div>
              <div>
                <span className="text-muted-foreground">&lt;title&gt;</span>
                <span className="text-yellow-400">Creator of Boboblox</span>
                <span className="text-muted-foreground">&lt;/title&gt;</span>
              </div>
              <div>
                <span className="text-muted-foreground">&lt;origin&gt;</span>
                <span className="text-purple-400">Website Developer → Story Creator</span>
                <span className="text-muted-foreground">&lt;/origin&gt;</span>
              </div>
            </div>
            <div className="text-primary">&lt;/creator-code&gt;</div>
          </div>
        </motion.div>

        {/* Abilities Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Abilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {abilities.map((ability, i) => (
              <motion.div
                key={ability.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center"
              >
                <ability.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium">{ability.name}</span>
                <div className="text-xs text-green-400 mt-1">true</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Style & Influence */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Style
            </h2>
            <div className="space-y-3">
              {style.map((s) => (
                <div key={s.key} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                  <span className="text-muted-foreground text-sm">{s.key}</span>
                  <span className="text-sm font-medium text-purple-400">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Influence
            </h2>
            <div className="space-y-3">
              {influence.map((inf) => (
                <div key={inf.target} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                  <span className="text-muted-foreground text-sm">{inf.target}</span>
                  <span className="text-sm font-medium text-cyan-400">{inf.status}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Legacy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Legacy
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {legacy.map((l, i) => (
              <motion.div
                key={l.item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
              >
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{l.item}</div>
                <div className="text-sm font-medium text-yellow-400">{l.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Expansion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-green-400" />
            Next Expansions
          </h2>
          <div className="flex flex-wrap gap-3">
            {expansion.map((exp, i) => (
              <motion.span
                key={exp}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-sm font-medium text-green-400"
              >
                {exp}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-purple-500/10 border border-primary/30 text-center"
        >
          <div className="text-lg text-foreground/80 italic space-y-2">
            <p>"Boboblox exists because Abdulsamad imagined it."</p>
            <p>"The Core evolves because Abdulsamad believed in change."</p>
            <p>"The story continues because Abdulsamad keeps creating."</p>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            The Creator-Code becomes the highest-level file in the universe.
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-12"
        >
          <Button onClick={() => navigate("/lore")} className="gap-2">
            Explore the Codex
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorCode;
