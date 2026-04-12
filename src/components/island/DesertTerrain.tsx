import { useMemo } from "react";
import * as THREE from "three";

export default function DesertTerrain() {
  const geometry = useMemo(() => {
    const radius = 25;
    const segments = 32;
    const geo = new THREE.CircleGeometry(radius, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z) / radius;

      let y = 0;
      if (dist < 0.6) {
        // Rolling dunes
        y = Math.sin(x * 0.5 + 1) * 1.2 + Math.cos(z * 0.6) * 0.8 + Math.sin(x * 0.3 - z * 0.4) * 1.5 + 0.5;
      } else {
        const t = (dist - 0.6) / 0.4;
        const duneH = Math.sin(x * 0.5 + 1) * 1.2 + Math.cos(z * 0.6) * 0.8 + Math.sin(x * 0.3 - z * 0.4) * 1.5 + 0.5;
        y = THREE.MathUtils.lerp(duneH * 0.3, -0.3, t);
      }
      pos.setY(i, y);
    }

    geo.computeVertexNormals();

    const colors = new Float32Array(pos.count * 3);
    const sand = new THREE.Color("#f59e0b");
    const darkSand = new THREE.Color("#d97706");
    const lightSand = new THREE.Color("#fbbf24");

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const dist = Math.sqrt(pos.getX(i) ** 2 + pos.getZ(i) ** 2) / radius;
      let color: THREE.Color;
      if (y > 2) color = lightSand;
      else if (dist > 0.7) color = darkSand;
      else color = sand.clone().lerp(lightSand, Math.max(0, y / 3));
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
