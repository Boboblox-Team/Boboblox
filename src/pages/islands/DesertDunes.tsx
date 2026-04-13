import { useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import DesertTerrain from "@/components/island/DesertTerrain";
import DesertProps from "@/components/island/DesertProps";
import LocalPlayer from "@/components/island/LocalPlayer";
import RemotePlayers from "@/components/island/RemotePlayers";
import IslandHUD from "@/components/island/IslandHUD";
import { useIslandPresence } from "@/hooks/useIslandPresence";
import { useAuth } from "@/hooks/useAuth";

export default function DesertIsland() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { otherPlayers, onlineCount, updatePosition, myColor } =
    useIslandPresence("desert_dunes");

  const handleLeave = useCallback(() => navigate("/worlds"), [navigate]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#fef3c7" }}>
      <IslandHUD onLeave={handleLeave} onlineCount={onlineCount} />
      <Canvas
        shadows
        camera={{ position: [0, 6, 18], fov: 60, near: 0.1, far: 300 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[20, 25, 5]} intensity={1.4} castShadow
          shadow-mapSize-width={1024} shadow-mapSize-height={1024}
          shadow-camera-far={50} shadow-camera-left={-30} shadow-camera-right={30}
          shadow-camera-top={30} shadow-camera-bottom={-30}
        />
        <Sky sunPosition={[100, 80, 50]} turbidity={15} rayleigh={1} />

        <DesertTerrain />
        <DesertProps />

        {user && <LocalPlayer color={myColor} onPositionUpdate={updatePosition} />}
        <RemotePlayers players={otherPlayers} />
      </Canvas>
    </div>
  );
}
