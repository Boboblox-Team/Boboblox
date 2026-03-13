import { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Users, Play, X, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePresence } from "@/hooks/usePresence";
import WorldScene from "@/components/world-explorer/WorldScene";

const worldDetails: Record<string, {
  description: string;
  features: string[];
  cutsceneId?: string;
}> = {
  "Tropical Island": {
    description: "Golden sands, swaying palms, and crystal waters — the starting point for all Explorers.",
    features: ["Peaceful beaches", "Palm forests", "Hidden caves", "Starter quests"],
    cutsceneId: "the-core-awakens",
  },
  "City Center": {
    description: "A bustling urban environment with tall buildings and busy streets, home to many Bloxlings.",
    features: ["Tall skyscrapers", "Busy streets", "Underground tunnels", "Tech puzzles"],
  },
  "Snowy Mountains": {
    description: "Frozen peaks and icy caves, home to resilient Guardian Bloxlings protecting ancient secrets.",
    features: ["Frozen peaks", "Ice caves", "Aurora lights", "Guardian quests"],
  },
  "Desert Dunes": {
    description: "Endless golden sands hiding ancient secrets. Scout Bloxlings search for code fragments.",
    features: ["Ancient ruins", "Hidden oases", "Sandstorms", "Fragment hunts"],
  },
  "Forest Adventure": {
    description: "Dense woodland filled with mysteries. Archivist Bloxlings guard ancient lore in tree-top libraries.",
    features: ["Dense canopy", "Hidden trails", "Tree houses", "Lore discoveries"],
  },
};

const WorldExplorer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { otherPlayers, onlineCount } = usePresence("world-explorer");
  const [selectedIsland, setSelectedIsland] = useState<string | null>(null);

  const details = selectedIsland ? worldDetails[selectedIsland] : null;

  // ⭐ NEW: Navigate to island play page
  function goToIsland(island: string) {
    const encoded = encodeURIComponent(island);
    navigate(`/worlds/play/${encoded}`);
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-dark-blue">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <Globe className="w-12 h-12 text-primary animate-spin mx-auto" />
                <p className="text-muted-foreground font-display">Loading worlds...</p>
              </div>
            </div>
          }
        >
          <WorldScene
            selectedIsland={selectedIsland}
            onSelectIsland={(island) => {
              setSelectedIsland(island);
              goToIsland(island); // ⭐ Navigate to play page
            }}
            otherPlayers={otherPlayers}
          />
        </Suspense>
      </div>

      {/* Top bar overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/worlds")}
            className="bg-card/80 backdrop-blur-sm border-border"
          >
            ← Back to Worlds
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-display font-bold text-foreground">World Explorer</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border pointer-events-auto"
        >
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-foreground">
            {user ? onlineCount : 0} online
          </span>
          {!user && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate("/auth")}
              className="text-primary text-xs h-6 px-2"
            >
              Sign in to join
            </Button>
          )}
        </motion.div>
      </div>

      {/* Bottom hint */}
      {!selectedIsland && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Click an island to explore</span>
          </div>
        </motion.div>
      )}

      {/* Island details panel */}
      <AnimatePresence>
        {selectedIsland && details && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute top-20 right-4 bottom-4 w-80 z-10 pointer-events-auto"
          >
            <div className="h-full bg-card/90 backdrop-blur-md border border-border rounded-xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold text-foreground">
                  {selectedIsland}
                </h2>
                <button
                  onClick={() => setSelectedIsland(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-6">{details.description}</p>

              <div className="mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Features
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {details.features.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto space-y-2">
                {details.cutsceneId && (
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-primary/50 text-primary hover:bg-primary/10"
                    onClick={() => navigate(`/cutscene/${details.cutsceneId}`)}
                  >
                    <Play className="w-4 h-4" />
                    Watch Cut-Scene
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => navigate("/characters")}
                >
                  Meet Characters
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorldExplorer;
