import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface PlayerCursorProps {
  position: [number, number, number];
  username: string;
  color: string;
}

const PlayerCursor = ({ position, username, color }: PlayerCursorProps) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      // Gentle bobbing
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Avatar sphere */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Glow ring beneath */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <ringGeometry args={[0.15, 0.3, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Username label */}
      <Html position={[0, 0.5, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <span className="text-[10px] font-display font-bold bg-card/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-border text-foreground whitespace-nowrap">
          {username}
        </span>
      </Html>
    </group>
  );
};

export default PlayerCursor;
