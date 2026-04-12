import { useMemo } from "react";
import * as THREE from "three";

export default function SnowyTerrain() {
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
      if (dist < 0.5) {
        // Mountains
        y = Math.sin(x * 0.3) * 1.5 + Math.cos(z * 0.4) * 2 + Math.sin(x * 0.15 + z * 0.2) * 3 + 1;
      } else if (dist < 0.7) {
        const t = (dist - 0.5) / 0.2;
        const peak = Math.sin(x * 0.3) * 1.5 + Math.cos(z * 0.4) * 2 + Math.sin(x * 0.15 + z * 0.2) * 3 + 1;
        y = THREE.MathUtils.lerp(peak, 0.2, t);
      } else {
        const t = (dist - 0.7) / 0.3;
        y = THREE.MathUtils.lerp(0.2, -0.8, t);
      }
      pos.setY(i, y);
    }

    geo.computeVertexNormals();

    const colors = new Float32Array(pos.count * 3);
    const snow = new THREE.Color("#f0f9ff");
    const ice = new THREE.Color("#bae6fd");
    const rock = new THREE.Color("#78716c");

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const dist = Math.sqrt(pos.getX(i) ** 2 + pos.getZ(i) ** 2) / radius;
      let color: THREE.Color;
      if (y > 3) color = snow;
      else if (y > 1) color = ice.clone().lerp(snow, (y - 1) / 2);
      else if (dist > 0.75) color = ice;
      else color = rock.clone().lerp(snow, Math.max(0, y / 2));
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
