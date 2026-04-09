import { useMemo } from "react";
import * as THREE from "three";

interface PalmTreeProps {
  position: [number, number, number];
  scale?: number;
}

export default function PalmTree({ position, scale = 1 }: PalmTreeProps) {
  const trunkCurve = useMemo(() => {
    // Slight curve to the trunk
    const pts = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.15, 1.5, 0.1),
      new THREE.Vector3(0.1, 3, -0.05),
      new THREE.Vector3(-0.05, 4.2, 0),
    ];
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh castShadow>
        <tubeGeometry args={[trunkCurve, 8, 0.12, 6, false]} />
        <meshLambertMaterial color="#92400e" />
      </mesh>

      {/* Leaf clusters — 5 drooping cones */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group
            key={i}
            position={[-0.05, 4.2, 0]}
            rotation={[0.6, rad, 0.3]}
          >
            <mesh castShadow>
              <coneGeometry args={[0.6, 2.5, 4]} />
              <meshLambertMaterial color="#22c55e" />
            </mesh>
          </group>
        );
      })}

      {/* Coconuts */}
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.2 - 0.05;
        const z = Math.sin(rad) * 0.2;
        return (
          <mesh key={`c${i}`} position={[x, 3.9, z]} castShadow>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshLambertMaterial color="#a16207" />
          </mesh>
        );
      })}
    </group>
  );
}
