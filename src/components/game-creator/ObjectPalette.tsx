import { Box, Circle, Package, Triangle, Cylinder } from "lucide-react";
import { GameObject, OBJECT_TEMPLATES } from "./types";

interface ObjectPaletteProps {
  onDragStart: (type: GameObject['type']) => void;
  onTouchDragStart: (type: GameObject['type']) => void;
}

const OBJECT_ITEMS: { type: GameObject['type']; label: string; icon: React.ReactNode }[] = [
  { type: 'part', label: 'Part', icon: <Box className="w-5 h-5" /> },
  { type: 'sphere', label: 'Sphere', icon: <Circle className="w-5 h-5" /> },
  { type: 'model', label: 'Model', icon: <Package className="w-5 h-5" /> },
  { type: 'wedge', label: 'Wedge', icon: <Triangle className="w-5 h-5" /> },
  { type: 'cylinder', label: 'Cylinder', icon: <Cylinder className="w-5 h-5" /> },
];

export const ObjectPalette = ({ onDragStart, onTouchDragStart }: ObjectPaletteProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
        <Package className="w-4 h-4" />
        Objects
      </h3>
      
      <div className="space-y-2">
        {OBJECT_ITEMS.map((item) => {
          const template = OBJECT_TEMPLATES[item.type];
          return (
            <div
              key={item.type}
              draggable
              onDragStart={() => onDragStart(item.type)}
              onTouchStart={() => onTouchDragStart(item.type)}
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg cursor-grab active:cursor-grabbing hover:bg-accent hover:border-primary/50 transition-all select-none"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: template.color }}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">
                  {template.width} × {template.height}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        💡 Drag objects to the workspace
      </p>
    </div>
  );
};
