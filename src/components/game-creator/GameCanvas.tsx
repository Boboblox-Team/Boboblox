import { useRef, useState } from "react";
import { GameElement, ELEMENT_TEMPLATES } from "./types";
import { Trash2 } from "lucide-react";

interface GameCanvasProps {
  elements: GameElement[];
  draggingType: string | null;
  onAddElement: (type: string, x: number, y: number) => void;
  onMoveElement: (id: string, x: number, y: number) => void;
  onSelectElement: (id: string | null) => void;
  onDeleteElement: (id: string) => void;
  selectedElementId: string | null;
  backgroundColor: string;
  touchDraggingType?: string | null;
  onTouchDragEnd?: () => void;
}

export const GameCanvas = ({
  elements,
  draggingType,
  onAddElement,
  onMoveElement,
  onSelectElement,
  onDeleteElement,
  selectedElementId,
  backgroundColor,
  touchDraggingType,
  onTouchDragEnd,
}: GameCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [movingElement, setMovingElement] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [touchMovingElement, setTouchMovingElement] = useState<string | null>(null);
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggingType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const template = ELEMENT_TEMPLATES[draggingType as keyof typeof ELEMENT_TEMPLATES];
    const x = Math.max(0, Math.min(e.clientX - rect.left - template.width / 2, rect.width - template.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top - template.height / 2, rect.height - template.height));

    onAddElement(draggingType, x, y);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    setMovingElement(elementId);
    setOffset({
      x: e.clientX - element.x,
      y: e.clientY - element.y,
    });
    onSelectElement(elementId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!movingElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const element = elements.find(el => el.id === movingElement);
    if (!element) return;

    const x = Math.max(0, Math.min(e.clientX - rect.left - offset.x, rect.width - element.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top - offset.y, rect.height - element.height));

    onMoveElement(movingElement, x, y);
  };

  const handleMouseUp = () => {
    setMovingElement(null);
  };

  const handleCanvasClick = () => {
    onSelectElement(null);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent, elementId: string) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const element = elements.find(el => el.id === elementId);
    if (!element || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    setTouchMovingElement(elementId);
    setTouchOffset({
      x: touch.clientX - rect.left - element.x,
      y: touch.clientY - rect.top - element.y,
    });
    onSelectElement(elementId);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canvasRef.current) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();

    if (touchMovingElement) {
      const element = elements.find(el => el.id === touchMovingElement);
      if (!element) return;

      const x = Math.max(0, Math.min(touch.clientX - rect.left - touchOffset.x, rect.width - element.width));
      const y = Math.max(0, Math.min(touch.clientY - rect.top - touchOffset.y, rect.height - element.height));
      onMoveElement(touchMovingElement, x, y);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchDraggingType && canvasRef.current) {
      const touch = e.changedTouches[0];
      const rect = canvasRef.current.getBoundingClientRect();

      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        const template = ELEMENT_TEMPLATES[touchDraggingType as keyof typeof ELEMENT_TEMPLATES];
        const x = Math.max(0, Math.min(touch.clientX - rect.left - template.width / 2, rect.width - template.width));
        const y = Math.max(0, Math.min(touch.clientY - rect.top - template.height / 2, rect.height - template.height));
        onAddElement(touchDraggingType, x, y);
      }
      onTouchDragEnd?.();
    }

    setTouchMovingElement(null);
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case "player": return "🎮";
      case "block": return "🧱";
      case "coin": return "⭐";
      case "enemy": return "👾";
      case "goal": return "🏆";
      case "platform": return "➖";
      case "spike": return "🔺";
      default: return "❓";
    }
  };

  return (
    <div className="relative">
      <div
        ref={canvasRef}
        className="w-full aspect-[16/10] rounded-xl border-4 border-border relative overflow-hidden cursor-crosshair touch-none"
        style={{ backgroundColor }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grid BEHIND elements */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Elements */}
        {elements.map((el) => (
          <div
            key={el.id}
            className={`absolute z-10 rounded-lg flex items-center justify-center cursor-move transition-all select-none ${
              selectedElementId === el.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
            }`}
            style={{
              left: el.x,
              top: el.y,
              width: el.width,
              height: el.height,
              backgroundColor: el.color,
            }}
            onMouseDown={(e) => handleMouseDown(e, el.id)}
            onTouchStart={(e) => handleTouchStart(e, el.id)}
          >
            <span className="text-lg pointer-events-none">{getElementIcon(el.type)}</span>

            {selectedElementId === el.id && (
              <button
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteElement(el.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}

        {/* Empty state */}
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-10">
            <div className="text-center">
              <p className="text-4xl mb-2">🎨</p>
              <p className="text-lg font-medium">Drag items here to build your game!</p>
              <p className="text-sm">Start with a Player, then add blocks and coins</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
