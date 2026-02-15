import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface IslandProps {
  position: [number, number, number];
  name: string;
  icon: string;
  color: string;
  size?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const Island = ({ position, name, icon, color, size = 1, onClick, isSelected }: IslandProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
  });

  const col = new THREE.Color(color);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Glow ring */}
        {(hovered || isSelected) && (
          <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <ringGeometry args={[size * 1.2, size * 1.6, 32]} />
            <meshBasicMaterial color={col} transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Base platform */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[size, size * 1.3, size * 0.6, 6]} />
          <meshStandardMaterial
            color={col}
            roughness={0.4}
            metalness={0.2}
            emissive={col}
            emissiveIntensity={hovered || isSelected ? 0.4 : 0.1}
          />
        </mesh>

        {/* Top terrain */}
        <mesh position={[0, size * 0.35, 0]} castShadow>
          <sphereGeometry args={[size * 0.5, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={new THREE.Color(color).lerp(new THREE.Color("#4ade80"), 0.3)}
            roughness={0.8}
          />
        </mesh>

        {/* Trees / features on top */}
        {[...Array(3)].map((_, i) => {
          const angle = (i / 3) * Math.PI * 2;
          const r = size * 0.3;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * r, size * 0.5, Math.sin(angle) * r]}
              castShadow
            >
              <coneGeometry args={[size * 0.12, size * 0.4, 4]} />
              <meshStandardMaterial
                color={new THREE.Color(color).lerp(new THREE.Color("#166534"), 0.5)}
                roughness={0.7}
              />
            </mesh>
          );
        })}

        {/* Label */}
        <Html
          position={[0, size * 1.2, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: "none" }}
        >
          <div className={`text-center transition-all ${hovered || isSelected ? "scale-110" : ""}`}>
            <span className="text-2xl block mb-1">{icon}</span>
            <span className="text-xs font-display font-bold text-foreground bg-card/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border whitespace-nowrap">
              {name}
            </span>
          </div>
        </Html>
      </group>
    </Float>
  );
};

export default Island;
