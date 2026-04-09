import { useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import IslandTerrain from "@/components/island/IslandTerrain";
import Ocean from "@/components/island/Ocean";
import IslandProps from "@/components/island/IslandProps";
import LocalPlayer from "@/components/island/LocalPlayer";
import RemotePlayers from "@/components/island/RemotePlayers";
import IslandHUD from "@/components/island/IslandHUD";
import { useIslandPresence } from "@/hooks/useIslandPresence";
import { useAuth } from "@/hooks/useAuth";

export default function TropicalIsland() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { otherPlayers, onlineCount, updatePosition, myColor } =
    useIslandPresence("tropical-island");

  const handleLeave = useCallback(() => {
    navigate("/worlds");
  }, [navigate]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#87ceeb" }}>
      <IslandHUD onLeave={handleLeave} onlineCount={onlineCount} />

      <Canvas
        shadows
        camera={{ position: [0, 5, 16], fov: 60, near: 0.1, far: 300 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[15, 20, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />

        {/* Sky */}
        <Sky
          sunPosition={[100, 50, 100]}
          turbidity={8}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />

        {/* Environment */}
        <IslandTerrain />
        <Ocean />
        <IslandProps />

        {/* Players */}
        {user && (
          <LocalPlayer
            color={myColor}
            onPositionUpdate={updatePosition}
          />
        )}
        <RemotePlayers players={otherPlayers} />
      </Canvas>
    </div>
  );
}
