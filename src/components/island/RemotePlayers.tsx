import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { IslandPlayer } from "@/hooks/useIslandPresence";

interface RemotePlayersProps {
  players: IslandPlayer[];
}

interface RemoteAvatarProps {
  player: IslandPlayer;
}

function RemoteAvatar({ player }: RemoteAvatarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPos = useRef(new THREE.Vector3(...player.position));

  // Update target when player data changes
  targetPos.current.set(...player.position);

  useFrame(() => {
    if (!meshRef.current) return;
    // Smooth interpolation
    meshRef.current.position.lerp(targetPos.current, 0.1);
  });

  return (
    <mesh ref={meshRef} position={player.position} castShadow>
      <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
      <meshLambertMaterial color={player.color} />
      <Html
        position={[0, 1.2, 0]}
        center
        distanceFactor={15}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            fontFamily: "sans-serif",
          }}
        >
          {player.username}
        </div>
      </Html>
    </mesh>
  );
}

export default function RemotePlayers({ players }: RemotePlayersProps) {
  return (
    <>
      {players.map((p) => (
        <RemoteAvatar key={p.userId} player={p} />
      ))}
    </>
  );
}
