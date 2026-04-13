import { useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import SnowyTerrain from "@/components/island/SnowyTerrain";
import Ocean from "@/components/island/Ocean";
import SnowyProps from "@/components/island/SnowyProps";
import LocalPlayer from "@/components/island/LocalPlayer";
import RemotePlayers from "@/components/island/RemotePlayers";
import IslandHUD from "@/components/island/IslandHUD";
import { useIslandPresence } from "@/hooks/useIslandPresence";
import { useAuth } from "@/hooks/useAuth";

export default function SnowyMountains() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { otherPlayers, onlineCount, updatePosition, myColor } =
    useIslandPresence("snowy_mountains");

  const handleLeave = useCallback(() => navigate("/worlds"), [navigate]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#e0f2fe" }}>
      <IslandHUD onLeave={handleLeave} onlineCount={onlineCount} />
      <Canvas
        shadows
        camera={{ position: [0, 8, 18], fov: 60, near: 0.1, far: 300 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[15, 20, 10]} intensity={1} castShadow
          shadow-mapSize-width={1024} shadow-mapSize-height={1024}
          shadow-camera-far={50} shadow-camera-left={-30} shadow-camera-right={30}
          shadow-camera-top={30} shadow-camera-bottom={-30}
        />
        <Sky sunPosition={[100, 30, 100]} turbidity={10} rayleigh={3} />
        <fog attach="fog" args={["#e0f2fe", 40, 100]} />

        <SnowyTerrain />
        <Ocean />
        <SnowyProps />

        {user && <LocalPlayer color={myColor} onPositionUpdate={updatePosition} />}
        <RemotePlayers players={otherPlayers} />
      </Canvas>
    </div>
  );
}
