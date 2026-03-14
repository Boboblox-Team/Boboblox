import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePresence } from "@/hooks/usePresence";

const WorldExplorer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { onlineCount } = usePresence("world-explorer");

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-dark-blue">

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
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
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border"
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Choose an island to play</span>
        </div>
      </motion.div>

      {/* Island Buttons */}
      <div className="absolute left-4 top-24 z-20 space-y-3">

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
