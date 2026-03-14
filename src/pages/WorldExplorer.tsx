import { Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePresence } from "@/hooks/usePresence";
import WorldScene from "@/components/world-explorer/WorldScene";

const WorldExplorer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { onlineCount } = usePresence("world-explorer");

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
          <WorldScene />
        </Suspense>
      </div>

      {/* Top bar */}
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
            <span className="text-sm font-display font-bold text-foreground">
              World Explorer
            </span>
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
        </motion.div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Choose an island to play</span>
        </div>
      </motion.div>

      {/* ⭐ CLEAN ISLAND BUTTONS USING <Link> ⭐ */}
      <div className="absolute left-4 top-24 z-20 space-y-3 pointer-events-auto">

        <Link to="/worlds/play/TropicalIsland" className="block">
          <div className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition w-48">
            Tropical Island
          </div>
        </Link>

        <Link to="/worlds/play/CityCenter" className="block">
          <div className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition w-48">
            City Center
          </div>
        </Link>

        <Link to="/worlds/play/SnowyMountains" className="block">
          <div className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition w-48">
            Snowy Mountains
          </div>
        </Link>

        <Link to="/worlds/play/DesertDunes" className="block">
          <div className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition w-48">
            Desert Dunes
          </div>
        </Link>

        <Link to="/worlds/play/ForestAdventure" className="block">
          <div className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition w-48">
            Forest Adventure
          </div>
        </Link>

      </div>
    </div>
  );
};

export default WorldExplorer;
