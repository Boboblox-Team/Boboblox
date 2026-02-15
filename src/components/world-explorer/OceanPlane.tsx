import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const OceanPlane = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.05 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshStandardMaterial
        color="#0e4166"
        emissive="#00d4ff"
        emissiveIntensity={0.05}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

export default OceanPlane;
