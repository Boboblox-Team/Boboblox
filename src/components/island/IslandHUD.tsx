import { useRef, useCallback, useEffect, useState } from "react";

interface IslandHUDProps {
  onLeave: () => void;
  onlineCount: number;
}

export default function IslandHUD({ onLeave, onlineCount }: IslandHUDProps) {
  const joystickRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const touchOrigin = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchOrigin.current = { x: touch.clientX, y: touch.clientY };
    window.dispatchEvent(
      new CustomEvent("joystick", {
        detail: { active: true, dx: 0, dy: 0 },
      })
    );
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const dx = (touch.clientX - touchOrigin.current.x) / 50;
    const dy = (touch.clientY - touchOrigin.current.y) / 50;
    const clampedDx = Math.max(-1, Math.min(1, dx));
    const clampedDy = Math.max(-1, Math.min(1, dy));
    window.dispatchEvent(
      new CustomEvent("joystick", {
        detail: { active: true, dx: clampedDx, dy: clampedDy },
      })
    );
  }, []);

  const handleTouchEnd = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("joystick", {
        detail: { active: false, dx: 0, dy: 0 },
      })
    );
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* Leave button */}
      <button
        onClick={onLeave}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          pointerEvents: "auto",
          padding: "8px 16px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        ← Leave Island
      </button>

      {/* Online count */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          pointerEvents: "auto",
          padding: "6px 14px",
          background: "rgba(0,0,0,0.6)",
          color: "#4ade80",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "sans-serif",
        }}
      >
        🟢 {onlineCount} online
      </div>

      {/* Controls hint */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          padding: "6px 12px",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          borderRadius: 8,
          fontSize: 12,
          fontFamily: "monospace",
        }}
      >
        WASD to move
      </div>

      {/* Mobile joystick */}
      {isMobile && (
        <div
          ref={joystickRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.4)",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.5)",
            }}
          />
        </div>
      )}
    </div>
  );
}
