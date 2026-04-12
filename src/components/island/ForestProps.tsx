function OakTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 2]} />
        <meshLambertMaterial color="#92400e" />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[1, 6, 5]} />
        <meshLambertMaterial color="#16a34a" />
      </mesh>
    </group>
  );
}

function BirchTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 2.4]} />
        <meshLambertMaterial color="#e7e5e4" />
      </mesh>
      <mesh position={[0, 2.8, 0]} castShadow>
        <sphereGeometry args={[0.7, 6, 5]} />
        <meshLambertMaterial color="#4ade80" />
      </mesh>
    </group>
  );
}

function Mushroom({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.3]} />
        <meshLambertMaterial color="#fef3c7" />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshLambertMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

function TreeHouse({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 4]} />
        <meshLambertMaterial color="#78350f" />
      </mesh>
      <mesh position={[0, 4.5, 0]} castShadow>
        <sphereGeometry args={[1.5, 6, 5]} />
        <meshLambertMaterial color="#15803d" />
      </mesh>
      {/* Platform */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshLambertMaterial color="#a16207" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshLambertMaterial color="#d4a574" />
      </mesh>
    </group>
  );
}

function ForestRock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.4, 0]} />
      <meshLambertMaterial color="#78716c" />
    </mesh>
  );
}

export default function ForestProps() {
  const oaks = [
    { pos: [-5, 0.5, -3] as [number, number, number], scale: 1 },
    { pos: [6, 0.4, -6] as [number, number, number], scale: 1.1 },
    { pos: [-9, 0.3, 5] as [number, number, number], scale: 0.9 },
    { pos: [3, 0.7, -9] as [number, number, number], scale: 1 },
    { pos: [-3, 0.5, 8] as [number, number, number], scale: 1.2 },
    { pos: [10, 0.2, 3] as [number, number, number], scale: 0.8 },
    { pos: [-7, 0.4, -8] as [number, number, number], scale: 1 },
    { pos: [8, 0.3, 8] as [number, number, number], scale: 0.9 },
  ];

  const birches = [
    { pos: [-4, 0.4, 2] as [number, number, number], scale: 1 },
    { pos: [5, 0.3, -2] as [number, number, number], scale: 0.9 },
    { pos: [-8, 0.2, -4] as [number, number, number], scale: 1.1 },
    { pos: [7, 0.5, 5] as [number, number, number], scale: 0.85 },
  ];

  const mushrooms = [
    { pos: [-2, 0.3, -1] as [number, number, number], scale: 1 },
    { pos: [1, 0.4, 3] as [number, number, number], scale: 1.3 },
    { pos: [-6, 0.3, 3] as [number, number, number], scale: 0.8 },
    { pos: [4, 0.2, -3] as [number, number, number], scale: 1.1 },
    { pos: [9, 0.1, -5] as [number, number, number], scale: 0.9 },
  ];

  return (
    <group>
      {oaks.map((t, i) => <OakTree key={`oak-${i}`} position={t.pos} scale={t.scale} />)}
      {birches.map((t, i) => <BirchTree key={`birch-${i}`} position={t.pos} scale={t.scale} />)}
      {mushrooms.map((m, i) => <Mushroom key={`mush-${i}`} position={m.pos} scale={m.scale} />)}
      <TreeHouse position={[-6, 0.3, -1]} />
      <TreeHouse position={[5, 0.4, 6]} />
      <ForestRock position={[0, 0.3, -6]} scale={1.2} />
      <ForestRock position={[-8, 0.2, 7]} scale={0.9} />
    </group>
  );
}
