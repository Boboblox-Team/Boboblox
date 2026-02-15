import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import Island from "./Island";
import PlayerCursor from "./PlayerCursor";
import OceanPlane from "./OceanPlane";

interface OtherPlayer {
  userId: string;
  username: string;
  color: string;
  position: [number, number, number];
}

interface WorldSceneProps {
  selectedIsland: string | null;
  onSelectIsland: (name: string) => void;
  otherPlayers: OtherPlayer[];
}

const islands = [
  { name: "Tropical Island", icon: "🏝️", color: "#06b6d4", position: [0, 0, 0] as [number, number, number], size: 1.2 },
  { name: "City Center", icon: "🏙️", color: "#3b82f6", position: [5, 0, -3] as [number, number, number], size: 1.0 },
  { name: "Snowy Mountains", icon: "🏔️", color: "#94a3b8", position: [-5, 0.5, -2] as [number, number, number], size: 1.3 },
  { name: "Desert Dunes", icon: "🏜️", color: "#eab308", position: [3, 0, 5] as [number, number, number], size: 1.0 },
  { name: "Forest Adventure", icon: "🌲", color: "#22c55e", position: [-4, 0, 4] as [number, number, number], size: 1.1 },
];

const WorldScene = ({ selectedIsland, onSelectIsland, otherPlayers }: WorldSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: 50 }}
      shadows
      style={{ background: "transparent" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00d4ff" />

      {/* Skybox */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />

      {/* Ocean */}
      <OceanPlane />

      {/* Islands */}
      {islands.map((island) => (
        <Island
          key={island.name}
          position={island.position}
          name={island.name}
          icon={island.icon}
          color={island.color}
          size={island.size}
          isSelected={selectedIsland === island.name}
          onClick={() => onSelectIsland(island.name)}
        />
      ))}

      {/* Other players */}
      {otherPlayers.map((player) => (
        <PlayerCursor
          key={player.userId}
          position={player.position}
          username={player.username}
          color={player.color}
        />
      ))}

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
};

export default WorldScene;
