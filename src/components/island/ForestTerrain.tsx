import { useMemo } from "react";
import * as THREE from "three";

export default function ForestTerrain() {
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
        y = Math.sin(x * 0.35) * 0.6 + Math.cos(z * 0.45) * 0.5 + Math.sin(x * 0.2 + z * 0.25) * 0.9 + 0.4;
      } else {
        const t = (dist - 0.6) / 0.4;
        const hilly = Math.sin(x * 0.35) * 0.6 + Math.cos(z * 0.45) * 0.5 + Math.sin(x * 0.2 + z * 0.25) * 0.9 + 0.4;
        y = THREE.MathUtils.lerp(hilly * 0.3, -0.4, t);
      }
      pos.setY(i, y);
    }

    geo.computeVertexNormals();

    const colors = new Float32Array(pos.count * 3);
    const grass = new THREE.Color("#22c55e");
    const darkGrass = new THREE.Color("#15803d");
    const dirt = new THREE.Color("#a16207");

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const dist = Math.sqrt(pos.getX(i) ** 2 + pos.getZ(i) ** 2) / radius;
      let color: THREE.Color;
      if (dist > 0.75) color = dirt;
      else if (y > 1.2) color = darkGrass;
      else color = grass.clone().lerp(darkGrass, Math.max(0, y / 1.5));
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
