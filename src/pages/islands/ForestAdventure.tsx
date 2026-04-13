import { useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import ForestTerrain from "@/components/island/ForestTerrain";
import Ocean from "@/components/island/Ocean";
import ForestProps from "@/components/island/ForestProps";
import LocalPlayer from "@/components/island/LocalPlayer";
import RemotePlayers from "@/components/island/RemotePlayers";
import IslandHUD from "@/components/island/IslandHUD";
import { useIslandPresence } from "@/hooks/useIslandPresence";
import { useAuth } from "@/hooks/useAuth";

export default function ForestAdventure() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { otherPlayers, onlineCount, updatePosition, myColor } =
    useIslandPresence("forest_adventure");

  const handleLeave = useCallback(() => navigate("/worlds"), [navigate]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#dcfce7" }}>
      <IslandHUD onLeave={handleLeave} onlineCount={onlineCount} />
      <Canvas
        shadows
        camera={{ position: [0, 6, 16], fov: 60, near: 0.1, far: 300 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 18, 8]} intensity={0.9} castShadow
          shadow-mapSize-width={1024} shadow-mapSize-height={1024}
          shadow-camera-far={50} shadow-camera-left={-30} shadow-camera-right={30}
          shadow-camera-top={30} shadow-camera-bottom={-30}
        />
        <Sky sunPosition={[80, 40, 100]} turbidity={6} rayleigh={2.5} />
        <fog attach="fog" args={["#dcfce7", 25, 70]} />

        <ForestTerrain />
        <Ocean />
        <ForestProps />

        {user && <LocalPlayer color={myColor} onPositionUpdate={updatePosition} />}
        <RemotePlayers players={otherPlayers} />
      </Canvas>
    </div>
  );
}
