import { Settings, Move, Maximize, Palette, Trash2 } from "lucide-react";
import { GameObject } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PropertiesPanelProps {
  selectedObject: GameObject | null;
  onUpdateObject: (id: string, updates: Partial<GameObject>) => void;
  onDeleteObject: (id: string) => void;
}

export const PropertiesPanel = ({ 
  selectedObject, 
  onUpdateObject, 
  onDeleteObject 
}: PropertiesPanelProps) => {
  if (!selectedObject) {
    return (
      <div className="space-y-4">
        <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Properties
        </h3>
        <div className="text-center py-8 text-muted-foreground">
          <Settings className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select an object to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
        <Settings className="w-4 h-4" />
        Properties
      </h3>

      {/* Object Name */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">Name</Label>
          <Input
            value={selectedObject.name}
            onChange={(e) => onUpdateObject(selectedObject.id, { name: e.target.value })}
            className="h-8 text-sm"
          />
        </div>

        <div className="text-xs text-muted-foreground">
          Type: <span className="text-foreground capitalize">{selectedObject.type}</span>
        </div>
      </div>

      {/* Position */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Move className="w-4 h-4" />
          Position
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">X</Label>
            <Input
              type="number"
              value={Math.round(selectedObject.x)}
              onChange={(e) => onUpdateObject(selectedObject.id, { x: Number(e.target.value) })}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Y</Label>
            <Input
              type="number"
              value={Math.round(selectedObject.y)}
              onChange={(e) => onUpdateObject(selectedObject.id, { y: Number(e.target.value) })}
              className="h-8 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Maximize className="w-4 h-4" />
          Size
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Width</Label>
            <Input
              type="number"
              value={selectedObject.width}
              onChange={(e) => onUpdateObject(selectedObject.id, { width: Math.max(20, Number(e.target.value)) })}
              className="h-8 text-sm"
              min={20}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Height</Label>
            <Input
              type="number"
              value={selectedObject.height}
              onChange={(e) => onUpdateObject(selectedObject.id, { height: Math.max(20, Number(e.target.value)) })}
              className="h-8 text-sm"
              min={20}
            />
          </div>
        </div>
      </div>

      {/* Color */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Palette className="w-4 h-4" />
          Color
        </div>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={selectedObject.color}
            onChange={(e) => onUpdateObject(selectedObject.id, { color: e.target.value })}
            className="w-10 h-10 rounded-lg border border-border cursor-pointer"
          />
          <Input
            value={selectedObject.color}
            onChange={(e) => onUpdateObject(selectedObject.id, { color: e.target.value })}
            className="h-8 text-sm flex-1 font-mono"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Delete Button */}
      <Button
        variant="destructive"
        size="sm"
        className="w-full"
        onClick={() => onDeleteObject(selectedObject.id)}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Object
      </Button>
    </div>
  );
};
