import PalmTree from "./PalmTree";

// Scattered rocks
function Rock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshLambertMaterial color="#9ca3af" />
    </mesh>
  );
}

// Small hut
function Hut({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Walls */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2, 1.2, 1.8]} />
        <meshLambertMaterial color="#d4a574" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[1.8, 1, 4]} />
        <meshLambertMaterial color="#92400e" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.4, 0.91]}>
        <planeGeometry args={[0.5, 0.8]} />
        <meshLambertMaterial color="#78350f" />
      </mesh>
    </group>
  );
}

// All static props on the island
export default function IslandProps() {
  // Tree positions scattered on land
  const trees: { pos: [number, number, number]; scale: number }[] = [
    { pos: [-5, 0.5, -3], scale: 1 },
    { pos: [6, 0.3, -5], scale: 0.9 },
    { pos: [-8, 0.2, 4], scale: 1.1 },
    { pos: [3, 0.6, -8], scale: 0.85 },
    { pos: [-3, 0.4, 7], scale: 1.05 },
    { pos: [9, 0.1, 2], scale: 0.95 },
    { pos: [-10, 0.1, -6], scale: 1 },
    { pos: [7, 0.2, 7], scale: 0.8 },
    { pos: [-6, 0.5, -9], scale: 1.1 },
    { pos: [2, 0.3, 10], scale: 0.9 },
    { pos: [-12, 0, 1], scale: 0.75 },
    { pos: [11, 0, -3], scale: 0.85 },
  ];

  const rocks: { pos: [number, number, number]; scale: number }[] = [
    { pos: [-4, 0.2, 5], scale: 0.8 },
    { pos: [8, 0.1, -2], scale: 1.2 },
    { pos: [-7, 0.3, -7], scale: 0.6 },
    { pos: [5, 0.1, 9], scale: 1 },
    { pos: [-11, 0, -2], scale: 0.7 },
    { pos: [0, 0.2, -6], scale: 0.9 },
  ];

  return (
    <group>
      {trees.map((t, i) => (
        <PalmTree key={`tree-${i}`} position={t.pos} scale={t.scale} />
      ))}
      {rocks.map((r, i) => (
        <Rock key={`rock-${i}`} position={r.pos} scale={r.scale} />
      ))}
      <Hut position={[4, 0.1, 3]} />
      <Hut position={[-6, 0.3, -1]} />
    </group>
  );
}
