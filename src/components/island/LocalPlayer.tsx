import { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface LocalPlayerProps {
  color: string;
  onPositionUpdate: (pos: [number, number, number]) => void;
}

const MOVE_SPEED = 5;
const ISLAND_RADIUS = 23;

export default function LocalPlayer({ color, onPositionUpdate }: LocalPlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const keys = useRef<Record<string, boolean>>({});
  const { camera } = useThree();
  const lastBroadcast = useRef(0);
  const velocity = useRef(new THREE.Vector3());
  const position = useRef(new THREE.Vector3(0, 1, 8));

  // Joystick state for mobile
  const joystick = useRef({ active: false, dx: 0, dy: 0 });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keys.current[e.key.toLowerCase()] = true;
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keys.current[e.key.toLowerCase()] = false;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Listen for joystick events from HUD
    const onJoystick = (e: CustomEvent) => {
      joystick.current = e.detail;
    };
    window.addEventListener("joystick" as any, onJoystick as any);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("joystick" as any, onJoystick as any);
    };
  }, [handleKeyDown, handleKeyUp]);

  useFrame((_, delta) => {
    const k = keys.current;
    const dir = new THREE.Vector3();

    // Keyboard input
    if (k["w"] || k["arrowup"]) dir.z -= 1;
    if (k["s"] || k["arrowdown"]) dir.z += 1;
    if (k["a"] || k["arrowleft"]) dir.x -= 1;
    if (k["d"] || k["arrowright"]) dir.x += 1;

    // Joystick input
    if (joystick.current.active) {
      dir.x += joystick.current.dx;
      dir.z += joystick.current.dy;
    }

    if (dir.length() > 0) {
      dir.normalize();
      // Move relative to camera facing
      const cameraDir = new THREE.Vector3();
      camera.getWorldDirection(cameraDir);
      cameraDir.y = 0;
      cameraDir.normalize();

      const right = new THREE.Vector3().crossVectors(
        new THREE.Vector3(0, 1, 0),
        cameraDir
      ).normalize();

      velocity.current
        .copy(cameraDir)
        .multiplyScalar(-dir.z)
        .add(right.clone().multiplyScalar(-dir.x))
        .normalize()
        .multiplyScalar(MOVE_SPEED * delta);

      position.current.add(velocity.current);
    }

    // Keep within island bounds
    const xz = new THREE.Vector2(position.current.x, position.current.z);
    if (xz.length() > ISLAND_RADIUS) {
      xz.normalize().multiplyScalar(ISLAND_RADIUS);
      position.current.x = xz.x;
      position.current.z = xz.y;
    }

    // Lock Y to ground level
    position.current.y = 1;

    if (meshRef.current) {
      meshRef.current.position.copy(position.current);
    }

    // Third-person camera follow
    const camOffset = new THREE.Vector3(0, 4, 8);
    const desiredCamPos = position.current.clone().add(camOffset);
    camera.position.lerp(desiredCamPos, 0.05);
    camera.lookAt(position.current.clone().add(new THREE.Vector3(0, 1, 0)));

    // Broadcast position at ~10Hz
    const now = performance.now();
    if (now - lastBroadcast.current > 100) {
      lastBroadcast.current = now;
      onPositionUpdate([
        position.current.x,
        position.current.y,
        position.current.z,
      ]);
    }
  });

  return (
    <group>
      {/* Player capsule */}
      <mesh ref={meshRef} position={[0, 1, 8]} castShadow>
        <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
        <meshLambertMaterial color={color} />
      </mesh>
    </group>
  );
}
