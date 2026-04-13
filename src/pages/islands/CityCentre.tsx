import { useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import CityTerrain from "@/components/island/CityTerrain";
import CityProps from "@/components/island/CityProps";
import LocalPlayer from "@/components/island/LocalPlayer";
import RemotePlayers from "@/components/island/RemotePlayers";
import IslandHUD from "@/components/island/IslandHUD";
import { useIslandPresence } from "@/hooks/useIslandPresence";
import { useAuth } from "@/hooks/useAuth";

export default function CityCentre() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { otherPlayers, onlineCount, updatePosition, myColor } =
    useIslandPresence("city_center");

  const handleLeave = useCallback(() => navigate("/worlds"), [navigate]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#374151" }}>
      <IslandHUD onLeave={handleLeave} onlineCount={onlineCount} />
      <Canvas
        shadows
        camera={{ position: [0, 8, 20], fov: 60, near: 0.1, far: 300 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[15, 25, 10]} intensity={1} castShadow
          shadow-mapSize-width={1024} shadow-mapSize-height={1024}
          shadow-camera-far={50} shadow-camera-left={-30} shadow-camera-right={30}
          shadow-camera-top={30} shadow-camera-bottom={-30}
        />
        <fog attach="fog" args={["#374151", 30, 80]} />
        <color attach="background" args={["#1e293b"]} />

        <CityTerrain />
        <CityProps />

        {user && <LocalPlayer color={myColor} onPositionUpdate={updatePosition} />}
        <RemotePlayers players={otherPlayers} />
      </Canvas>
    </div>
  );
}
