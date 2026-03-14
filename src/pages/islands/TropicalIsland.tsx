import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export default function TropicalIsland() {
  // Container for the Three.js canvas
  const containerRef = useRef<HTMLDivElement | null>(null);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Leave world function (callable from UI + cleanup)
  const leaveWorld = useCallback(() => {
    fetch("/functions/v1/leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ worldId: "tropical_island" })
    });

    // Navigate back to home
    window.location.href = "/";
  }, []);

  // Three.js setup + multiplayer join logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 3);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Temporary cube (placeholder world object)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: "#44aa88" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    scene.add(light);

    // Join world
    fetch("/functions/v1/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ worldId: "tropical_island" })
    });

    // Animation loop
    const animate = () => {
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup: leave world + dispose renderer
    return () => {
      leaveWorld();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [leaveWorld]);

  // TSX layout: UI + Three.js container
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* Leave button */}
      <button
        id="leave-btn"
        onClick={leaveWorld}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 999,
          padding: "10px 16px",
          background: "#ff4444",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Leave Island
      </button>

      {/* Three.js canvas mount point */}
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
