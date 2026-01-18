import { useRef, useState, useCallback, useEffect } from "react";
import { GameObject, OBJECT_TEMPLATES } from "./types";
import { Trash2, ZoomIn, ZoomOut, Move, Box, Circle, Package, Triangle, Cylinder } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkspaceProps {
  objects: GameObject[];
  draggingType: GameObject['type'] | null;
  touchDraggingType: GameObject['type'] | null;
  onAddObject: (type: GameObject['type'], x: number, y: number) => void;
  onMoveObject: (id: string, x: number, y: number) => void;
  onResizeObject: (id: string, width: number, height: number) => void;
  onSelectObject: (id: string | null) => void;
  onDeleteObject: (id: string) => void;
  selectedObjectId: string | null;
  backgroundColor: string;
  onTouchDragEnd: () => void;
}

export const Workspace = ({
  objects,
  draggingType,
  touchDraggingType,
  onAddObject,
  onMoveObject,
  onResizeObject,
  onSelectObject,
  onDeleteObject,
  selectedObjectId,
  backgroundColor,
  onTouchDragEnd,
}: WorkspaceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  
  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  
  // Object manipulation state
  const [movingObject, setMovingObject] = useState<string | null>(null);
  const [resizingObject, setResizingObject] = useState<string | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

  const WORKSPACE_SIZE = 2000;
  const GRID_SIZE = 40;

  // Convert screen coordinates to workspace coordinates
  const screenToWorkspace = useCallback((screenX: number, screenY: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: (screenX - rect.left - pan.x) / zoom,
      y: (screenY - rect.top - pan.y) / zoom,
    };
  }, [zoom, pan]);

  // Handle zoom
  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(0.25, Math.min(2, prev + delta)));
  };

  // Handle wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.max(0.25, Math.min(2, prev + delta)));
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  // Center workspace initially
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPan({
        x: (rect.width - WORKSPACE_SIZE * zoom) / 2,
        y: (rect.height - WORKSPACE_SIZE * zoom) / 2,
      });
    }
  }, []);

  // Handle drop from palette
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggingType) return;
    
    const pos = screenToWorkspace(e.clientX, e.clientY);
    const template = OBJECT_TEMPLATES[draggingType];
    onAddObject(draggingType, pos.x - template.width / 2, pos.y - template.height / 2);
  };

  // Handle panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    } else if (e.target === workspaceRef.current || e.target === containerRef.current) {
      onSelectObject(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
      return;
    }

    if (movingObject) {
      const pos = screenToWorkspace(e.clientX, e.clientY);
      const snappedX = Math.round((pos.x - dragOffset.x) / GRID_SIZE) * GRID_SIZE;
      const snappedY = Math.round((pos.y - dragOffset.y) / GRID_SIZE) * GRID_SIZE;
      onMoveObject(movingObject, snappedX, snappedY);
    }

    if (resizingObject && resizeHandle) {
      const pos = screenToWorkspace(e.clientX, e.clientY);
      const obj = objects.find(o => o.id === resizingObject);
      if (!obj) return;

      let newWidth = initialSize.width;
      let newHeight = initialSize.height;
      let newX = initialPos.x;
      let newY = initialPos.y;

      if (resizeHandle.includes('e')) {
        newWidth = Math.max(20, Math.round((pos.x - obj.x) / GRID_SIZE) * GRID_SIZE);
      }
      if (resizeHandle.includes('w')) {
        const diff = initialPos.x - pos.x;
        newWidth = Math.max(20, Math.round((initialSize.width + diff) / GRID_SIZE) * GRID_SIZE);
        newX = initialPos.x + initialSize.width - newWidth;
      }
      if (resizeHandle.includes('s')) {
        newHeight = Math.max(20, Math.round((pos.y - obj.y) / GRID_SIZE) * GRID_SIZE);
      }
      if (resizeHandle.includes('n')) {
        const diff = initialPos.y - pos.y;
        newHeight = Math.max(20, Math.round((initialSize.height + diff) / GRID_SIZE) * GRID_SIZE);
        newY = initialPos.y + initialSize.height - newHeight;
      }

      onMoveObject(resizingObject, newX, newY);
      onResizeObject(resizingObject, newWidth, newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setMovingObject(null);
    setResizingObject(null);
    setResizeHandle(null);
  };

  // Object mouse handlers
  const handleObjectMouseDown = (e: React.MouseEvent, obj: GameObject) => {
    e.stopPropagation();
    onSelectObject(obj.id);
    
    const pos = screenToWorkspace(e.clientX, e.clientY);
    setMovingObject(obj.id);
    setDragOffset({ x: pos.x - obj.x, y: pos.y - obj.y });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, obj: GameObject, handle: string) => {
    e.stopPropagation();
    setResizingObject(obj.id);
    setResizeHandle(handle);
    setInitialSize({ width: obj.width, height: obj.height });
    setInitialPos({ x: obj.x, y: obj.y });
  };

  // Touch handlers
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchDraggingType && containerRef.current) {
      const touch = e.changedTouches[0];
      const pos = screenToWorkspace(touch.clientX, touch.clientY);
      
      if (pos.x >= 0 && pos.x <= WORKSPACE_SIZE && pos.y >= 0 && pos.y <= WORKSPACE_SIZE) {
        const template = OBJECT_TEMPLATES[touchDraggingType];
        onAddObject(touchDraggingType, pos.x - template.width / 2, pos.y - template.height / 2);
      }
      onTouchDragEnd();
    }
    handleMouseUp();
  };

  const getObjectIcon = (type: GameObject['type']) => {
    switch (type) {
      case 'part': return <Box className="w-6 h-6" />;
      case 'sphere': return <Circle className="w-6 h-6" />;
      case 'model': return <Package className="w-6 h-6" />;
      case 'wedge': return <Triangle className="w-6 h-6" />;
      case 'cylinder': return <Cylinder className="w-6 h-6" />;
    }
  };

  const renderResizeHandles = (obj: GameObject) => {
    if (selectedObjectId !== obj.id) return null;
    
    const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    const positions: Record<string, { left: string; top: string; cursor: string }> = {
      nw: { left: '-4px', top: '-4px', cursor: 'nwse-resize' },
      n: { left: '50%', top: '-4px', cursor: 'ns-resize' },
      ne: { left: 'calc(100% - 4px)', top: '-4px', cursor: 'nesw-resize' },
      e: { left: 'calc(100% - 4px)', top: '50%', cursor: 'ew-resize' },
      se: { left: 'calc(100% - 4px)', top: 'calc(100% - 4px)', cursor: 'nwse-resize' },
      s: { left: '50%', top: 'calc(100% - 4px)', cursor: 'ns-resize' },
      sw: { left: '-4px', top: 'calc(100% - 4px)', cursor: 'nesw-resize' },
      w: { left: '-4px', top: '50%', cursor: 'ew-resize' },
    };

    return handles.map(handle => (
      <div
        key={handle}
        className="absolute w-2 h-2 bg-primary border border-primary-foreground rounded-sm -translate-x-1/2 -translate-y-1/2"
        style={{
          left: positions[handle].left,
          top: positions[handle].top,
          cursor: positions[handle].cursor,
        }}
        onMouseDown={(e) => handleResizeMouseDown(e, obj, handle)}
      />
    ));
  };

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-card border-b border-border">
        <Button variant="outline" size="sm" onClick={() => handleZoom(0.1)}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground min-w-[50px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <Button variant="outline" size="sm" onClick={() => handleZoom(-0.1)}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <div className="h-4 w-px bg-border mx-2" />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Move className="w-3 h-3" />
          <span>Hold Alt + drag to pan</span>
        </div>
      </div>

      {/* Workspace container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden bg-muted/50 cursor-default"
        style={{ cursor: isPanning ? 'grabbing' : (movingObject ? 'move' : 'default') }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onTouchEnd={handleTouchEnd}
      >
        {/* Zoomable/Pannable workspace */}
        <div
          ref={workspaceRef}
          className="relative border-2 border-border/50 rounded-lg"
          style={{
            width: WORKSPACE_SIZE,
            height: WORKSPACE_SIZE,
            backgroundColor,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            }}
          />

          {/* Origin marker */}
          <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute left-1/2 top-0 w-px h-full bg-primary/50" />
            <div className="absolute left-0 top-1/2 w-full h-px bg-primary/50" />
          </div>

          {/* Objects */}
          {objects.map((obj) => (
            <div
              key={obj.id}
              className={`absolute flex items-center justify-center cursor-move transition-shadow select-none ${
                selectedObjectId === obj.id
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg z-10'
                  : 'hover:ring-1 hover:ring-primary/50'
              }`}
              style={{
                left: obj.x,
                top: obj.y,
                width: obj.width,
                height: obj.height,
                backgroundColor: obj.color,
                borderRadius: obj.type === 'sphere' ? '50%' : obj.type === 'cylinder' ? '50% 50% 50% 50% / 20% 20% 20% 20%' : '8px',
                clipPath: obj.type === 'wedge' ? 'polygon(0 100%, 50% 0, 100% 100%)' : undefined,
              }}
              onMouseDown={(e) => handleObjectMouseDown(e, obj)}
            >
              <div className="text-white/80 pointer-events-none">
                {getObjectIcon(obj.type)}
              </div>
              
              {/* Object name */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-foreground whitespace-nowrap bg-card/80 px-1 rounded">
                {obj.name}
              </div>

              {/* Resize handles */}
              {renderResizeHandles(obj)}

              {/* Delete button */}
              {selectedObjectId === obj.id && (
                <button
                  className="absolute -top-3 -right-3 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteObject(obj.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          {/* Empty state */}
          {objects.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
              <div className="text-center">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Drag objects here to build your game</p>
                <p className="text-sm">Use the palette on the left to add Parts, Spheres, and more</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
