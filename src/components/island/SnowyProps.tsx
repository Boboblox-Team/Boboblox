function PineTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 1]} />
        <meshLambertMaterial color="#78350f" />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.8, 1.5, 6]} />
        <meshLambertMaterial color="#166534" />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 6]} />
        <meshLambertMaterial color="#15803d" />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[0.4, 0.5, 6]} />
        <meshLambertMaterial color="#f0f9ff" />
      </mesh>
    </group>
  );
}

function Snowman({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.5]} />
        <meshLambertMaterial color="#f0f9ff" />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <sphereGeometry args={[0.35]} />
        <meshLambertMaterial color="#f0f9ff" />
      </mesh>
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.25]} />
        <meshLambertMaterial color="#f0f9ff" />
      </mesh>
    </group>
  );
}

function IceRock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.6, 0]} />
      <meshLambertMaterial color="#bae6fd" transparent opacity={0.8} />
    </mesh>
  );
}

export default function SnowyProps() {
  const trees = [
    { pos: [-5, 1, -3] as [number, number, number], scale: 1 },
    { pos: [6, 0.5, -5] as [number, number, number], scale: 0.9 },
    { pos: [-8, 0.3, 4] as [number, number, number], scale: 1.1 },
    { pos: [3, 1.2, -8] as [number, number, number], scale: 0.85 },
    { pos: [-3, 0.5, 7] as [number, number, number], scale: 1.05 },
    { pos: [9, 0.2, 2] as [number, number, number], scale: 0.95 },
    { pos: [-10, 0.2, -6] as [number, number, number], scale: 0.8 },
    { pos: [7, 0.3, 7] as [number, number, number], scale: 0.7 },
  ];

  return (
    <group>
      {trees.map((t, i) => (
        <PineTree key={i} position={t.pos} scale={t.scale} />
      ))}
      <Snowman position={[2, 0.3, 3]} />
      <Snowman position={[-5, 0.5, 5]} />
      <IceRock position={[-3, 0.5, -5]} scale={1.2} />
      <IceRock position={[8, 0.2, -3]} scale={0.8} />
      <IceRock position={[0, 0.3, -9]} />
    </group>
  );
}
