function Cactus({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 2]} />
        <meshLambertMaterial color="#22c55e" />
      </mesh>
      <mesh position={[0.4, 1.4, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.8]} />
        <meshLambertMaterial color="#16a34a" />
      </mesh>
      <mesh position={[-0.35, 1.1, 0]} rotation={[0, 0, -Math.PI / 5]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.6]} />
        <meshLambertMaterial color="#16a34a" />
      </mesh>
    </group>
  );
}

function Pyramid({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <coneGeometry args={[2, 3, 4]} />
      <meshLambertMaterial color="#d97706" />
    </mesh>
  );
}

function Oasis({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[2, 16]} />
        <meshLambertMaterial color="#0ea5e9" transparent opacity={0.7} />
      </mesh>
      {/* Palm at oasis */}
      <group position={[1.5, 0, 0]}>
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 2]} />
          <meshLambertMaterial color="#92400e" />
        </mesh>
        <mesh position={[0, 2.3, 0]} castShadow>
          <sphereGeometry args={[0.6, 6, 4]} />
          <meshLambertMaterial color="#22c55e" />
        </mesh>
      </group>
    </group>
  );
}

function DesertRock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshLambertMaterial color="#a8a29e" />
    </mesh>
  );
}

export default function DesertProps() {
  const cacti = [
    { pos: [-5, 0.8, -3] as [number, number, number], scale: 1 },
    { pos: [7, 0.5, -6] as [number, number, number], scale: 0.8 },
    { pos: [-9, 0.3, 5] as [number, number, number], scale: 1.2 },
    { pos: [4, 1, -9] as [number, number, number], scale: 0.9 },
    { pos: [-3, 0.6, 8] as [number, number, number], scale: 1.1 },
    { pos: [10, 0.2, 3] as [number, number, number], scale: 0.7 },
  ];

  return (
    <group>
      {cacti.map((c, i) => (
        <Cactus key={i} position={c.pos} scale={c.scale} />
      ))}
      <Pyramid position={[-8, 1.5, -7]} scale={1.5} />
      <Pyramid position={[5, 0.8, 7]} scale={0.8} />
      <Oasis position={[0, 0.1, 4]} />
      <DesertRock position={[8, 0.3, -2]} scale={1.2} />
      <DesertRock position={[-6, 0.5, 6]} scale={0.9} />
    </group>
  );
}
