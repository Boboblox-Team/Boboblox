import { useMemo } from "react";
import * as THREE from "three";

export default function CityTerrain() {
  const geometry = useMemo(() => {
    const size = 50;
    const segments = 32;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    // Flat city terrain with slight variations
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const normalised = dist / (size / 2);
      let y = 0;
      if (normalised > 0.85) {
        y = -0.5 * ((normalised - 0.85) / 0.15);
      }
      pos.setY(i, y);
    }

    geo.computeVertexNormals();

    const colors = new Float32Array(pos.count * 3);
    const road = new THREE.Color("#6b7280");
    const sidewalk = new THREE.Color("#9ca3af");

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const isRoad = Math.abs(x % 8) < 1.5 || Math.abs(z % 8) < 1.5;
      const color = isRoad ? road : sidewalk;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshLambertMaterial vertexColors />
    </mesh>
  );
}
