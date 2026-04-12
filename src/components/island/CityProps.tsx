function Building({ position, height, width, color }: { position: [number, number, number]; height: number; width: number; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, width]} />
        <meshLambertMaterial color={color} />
      </mesh>
      {/* Windows */}
      {Array.from({ length: Math.floor(height / 1.2) }).map((_, i) => (
        <mesh key={i} position={[width / 2 + 0.01, 1 + i * 1.2, 0]}>
          <planeGeometry args={[0.4, 0.5]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
      ))}
    </group>
  );
}

function StreetLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 3]} />
        <meshLambertMaterial color="#71717a" />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshBasicMaterial color="#fef9c3" />
      </mesh>
      <pointLight position={[0, 3.1, 0]} intensity={0.5} distance={8} color="#fef9c3" />
    </group>
  );
}

export default function CityProps() {
  const buildings = [
    { pos: [-6, 0, -6] as [number, number, number], h: 8, w: 2.5, c: "#64748b" },
    { pos: [6, 0, -8] as [number, number, number], h: 12, w: 3, c: "#475569" },
    { pos: [-10, 0, 4] as [number, number, number], h: 6, w: 2, c: "#78716c" },
    { pos: [10, 0, 2] as [number, number, number], h: 10, w: 2.5, c: "#57534e" },
    { pos: [3, 0, -4] as [number, number, number], h: 5, w: 2, c: "#6b7280" },
    { pos: [-4, 0, 8] as [number, number, number], h: 7, w: 2.5, c: "#525252" },
    { pos: [8, 0, 8] as [number, number, number], h: 9, w: 2, c: "#44403c" },
    { pos: [-8, 0, -10] as [number, number, number], h: 4, w: 3, c: "#71717a" },
  ];

  const lights: [number, number, number][] = [
    [-2, 0, 0], [2, 0, 0], [0, 0, -5], [0, 0, 5],
    [-6, 0, 0], [6, 0, 0], [0, 0, -10], [0, 0, 10],
  ];

  return (
    <group>
      {buildings.map((b, i) => (
        <Building key={i} position={b.pos} height={b.h} width={b.w} color={b.c} />
      ))}
      {lights.map((p, i) => (
        <StreetLight key={i} position={p} />
      ))}
    </group>
  );
}
