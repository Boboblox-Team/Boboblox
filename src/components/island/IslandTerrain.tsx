import { useMemo } from "react";
import * as THREE from "three";

// Procedural low-poly island: a circular terrain with gentle hills
export default function IslandTerrain() {
  const geometry = useMemo(() => {
    const radius = 25;
    const segments = 32;
    const geo = new THREE.CircleGeometry(radius, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const normalised = dist / radius;

      // Central hills, edges slope down below water
      let y = 0;
      if (normalised < 0.6) {
        // Gentle rolling hills
        y =
          Math.sin(x * 0.4) * 0.8 +
          Math.cos(z * 0.5) * 0.6 +
          Math.sin(x * 0.2 + z * 0.3) * 1.2 +
          0.3;
      } else {
        // Beach slope to water
        const t = (normalised - 0.6) / 0.4;
        const hillHeight =
          Math.sin(x * 0.4) * 0.8 +
          Math.cos(z * 0.5) * 0.6 +
          Math.sin(x * 0.2 + z * 0.3) * 1.2 +
          0.3;
        y = THREE.MathUtils.lerp(hillHeight * 0.3, -0.5, t);
      }
      pos.setY(i, y);
    }

    geo.computeVertexNormals();

    // Vertex colors: green hills, sandy beach
    const colors = new Float32Array(pos.count * 3);
    const green = new THREE.Color("#4ade80");
    const sand = new THREE.Color("#fbbf24");
    const darkGreen = new THREE.Color("#16a34a");

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z) / radius;
      const y = pos.getY(i);

      let color: THREE.Color;
      if (dist > 0.7) {
        color = sand;
      } else if (y > 1.5) {
        color = darkGreen;
      } else {
        color = green.clone().lerp(darkGreen, Math.max(0, y / 2));
      }
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
