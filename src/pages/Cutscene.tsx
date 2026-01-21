import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Play, Pause, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Scene {
  id: number;
  text: string;
  visual: string;
  duration: number;
}

const cutscenes: Record<string, { title: string; scenes: Scene[] }> = {
  "the-core-awakens": {
    title: "The Core Awakens",
    scenes: [
      { id: 1, text: "In the beginning, there was only darkness... an endless void of potential.", visual: "🌌", duration: 5000 },
      { id: 2, text: "Then, a spark of energy ignited—The Core awakened.", visual: "✨", duration: 4500 },
      { id: 3, text: "Pure creation energy flowed outward, shaping reality itself.", visual: "💫", duration: 4500 },
      { id: 4, text: "The first world emerged from The Core's vision: Tropical Island.", visual: "🏝️", duration: 5000 },
      { id: 5, text: "Golden sands, swaying palms, and crystal waters—a paradise of peace.", visual: "🌴", duration: 4500 },
      { id: 6, text: "The Core smiled upon its creation. This would be the starting point for all Explorers.", visual: "🌅", duration: 5000 },
      { id: 7, text: "And so the universe began... waiting for those brave enough to explore its wonders.", visual: "🚀", duration: 5000 },
    ],
  },
  "patch-0-origin": {
    title: "The Curious One",
    scenes: [
      { id: 1, text: "Among the countless Bloxlings, one was different...", visual: "⚡", duration: 4000 },
      { id: 2, text: "Patch-0 wondered: How could the universe grow?", visual: "💭", duration: 4500 },
      { id: 3, text: "It began writing code—adaptive, creative, revolutionary.", visual: "💻", duration: 4500 },
      { id: 4, text: "Prime Bloxlings. Dynamic worlds. An evolving Core.", visual: "🌟", duration: 5000 },
      { id: 5, text: "But The Core did not understand. It wasn't dangerous—just different.", visual: "🔷", duration: 5000 },
      { id: 6, text: "The code was rejected. Too strongly.", visual: "❌", duration: 4000 },
    ],
  },
  "the-glitchstorm": {
    title: "The Glitchstorm",
    scenes: [
      { id: 1, text: "The rejection triggered a massive overload.", visual: "⚠️", duration: 4000 },
      { id: 2, text: "A wave of glitch energy burst across the universe.", visual: "🌪️", duration: 4500 },
      { id: 3, text: "Worlds cracked. Code scattered. Portals flickered.", visual: "💥", duration: 4500 },
      { id: 4, text: "Bloxlings malfunctioned. The Core shut down parts of itself.", visual: "🔌", duration: 5000 },
      { id: 5, text: "Patch-0 was damaged. It survived, but now flickers like a shadow.", visual: "👤", duration: 5000 },
      { id: 6, text: "This event became known as... The Glitchstorm.", visual: "⚡", duration: 5000 },
      { id: 7, text: "Patch-0 watches from the edges of worlds. Waiting.", visual: "👁️", duration: 4500 },
    ],
  },
  "explorers-arrive": {
    title: "Explorers Arrive",
    scenes: [
      { id: 1, text: "To repair the damage, The Core needed help from outside.", visual: "🌍", duration: 4500 },
      { id: 2, text: "It opened portals to a new kind of helper...", visual: "🌀", duration: 4000 },
      { id: 3, text: "Explorers—players from beyond the universe.", visual: "🚀", duration: 4500 },
      { id: 4, text: "They cannot create worlds or rewrite The Core.", visual: "🚫", duration: 4000 },
      { id: 5, text: "But they can explore, repair, discover, and help Bloxlings.", visual: "🔧", duration: 5000 },
      { id: 6, text: "The Core watches them closely, learning from their actions.", visual: "👁️", duration: 5000 },
    ],
  },
  "glitchbound-transformation": {
    title: "Glitchbound Transformation",
    scenes: [
      { id: 1, text: "One Explorer ventured deeper than others dared.", visual: "🚶", duration: 4000 },
      { id: 2, text: "In a hidden glitch zone, they found it—a fragment of Patch-0's code.", visual: "✨", duration: 5000 },
      { id: 3, text: "Curiosity overcame caution. They reached out...", visual: "🤚", duration: 4000 },
      { id: 4, text: "The code merged with them. Energy surged through their being.", visual: "⚡", duration: 4500 },
      { id: 5, text: "They could see hidden code. Enter forbidden zones. Connect to Patch-0.", visual: "🔮", duration: 5000 },
      { id: 6, text: "They were not corrupted. They were transformed.", visual: "🦋", duration: 5000 },
      { id: 7, text: "The Glitchbound Explorer was born.", visual: "🌟", duration: 4500 },
    ],
  },
};

const Cutscene = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const cutscene = id ? cutscenes[id] : null;

  useEffect(() => {
    if (!cutscene || !isPlaying) return;

    const scene = cutscene.scenes[currentSceneIndex];
    const interval = 50;
    const steps = scene.duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress((step / steps) * 100);

      if (step >= steps) {
        if (currentSceneIndex < cutscene.scenes.length - 1) {
          setCurrentSceneIndex((prev) => prev + 1);
          setProgress(0);
        } else {
          setIsPlaying(false);
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentSceneIndex, isPlaying, cutscene]);

  const handleSkip = () => {
    if (!cutscene) return;
    if (currentSceneIndex < cutscene.scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      navigate("/lore");
    }
  };

  const handleClose = () => {
    navigate("/lore");
  };

  if (!cutscene) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Cutscene Not Found</h1>
          <Button onClick={() => navigate("/lore")}>Return to Codex</Button>
        </div>
      </div>
    );
  }

  const currentScene = cutscene.scenes[currentSceneIndex];

  return (
    <div className="min-h-screen bg-[hsl(var(--dark-blue))] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="bg-background/30 backdrop-blur-sm hover:bg-background/50"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="bg-background/30 backdrop-blur-sm hover:bg-background/50"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-50"
      >
        <span className="text-sm text-primary/70 font-medium">{cutscene.title}</span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl"
          >
            {/* Visual */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-8xl mb-8"
            >
              {currentScene.visual}
            </motion.div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-display leading-relaxed text-foreground/90"
            >
              {currentScene.text}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-50 px-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Progress Bar */}
          <div className="flex gap-2">
            {cutscene.scenes.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 rounded-full bg-primary/20 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      index < currentSceneIndex
                        ? "100%"
                        : index === currentSceneIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-background/30 backdrop-blur-sm hover:bg-background/50"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="bg-background/30 backdrop-blur-sm hover:bg-background/50"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Scene Counter */}
          <p className="text-center text-sm text-muted-foreground">
            {currentSceneIndex + 1} / {cutscene.scenes.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cutscene;
