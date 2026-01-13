import { LogicBlock, LOGIC_TEMPLATES, GameElement } from "./types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LogicPanelProps {
  logicBlocks: LogicBlock[];
  elements: GameElement[];
  onAddLogic: (type: string) => void;
  onRemoveLogic: (id: string) => void;
  onUpdateLogic: (id: string, updates: Partial<LogicBlock>) => void;
}

export const LogicPanel = ({ 
  logicBlocks, 
  elements, 
  onAddLogic, 
  onRemoveLogic,
  onUpdateLogic 
}: LogicPanelProps) => {
  const selectableElements = elements.filter(e => e.type !== 'player');

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="text-2xl">⚡</span> Game Rules
      </h3>
      
      {/* Add Logic Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {LOGIC_TEMPLATES.map((template) => (
          <Button
            key={template.type}
            variant="outline"
            size="sm"
            onClick={() => onAddLogic(template.type)}
            className="text-xs h-auto py-2 px-2 flex items-center gap-1"
          >
            <span>{template.icon}</span>
            <span className="truncate">{template.label.replace(/^[^\s]+\s/, '')}</span>
          </Button>
        ))}
      </div>

      {/* Active Logic Blocks */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {logicBlocks.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            Add rules to make your game work! 🎯
          </p>
        ) : (
          logicBlocks.map((block) => {
            const template = LOGIC_TEMPLATES.find(t => t.type === block.type);
            return (
              <div 
                key={block.id} 
                className="bg-secondary/50 rounded-lg p-3 flex items-center gap-2"
              >
                <span className="text-lg">{template?.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {template?.label}
                  </p>
                  {(block.type === 'when_touch' || block.type === 'collect') && (
                    <select
                      value={block.targetId || ''}
                      onChange={(e) => onUpdateLogic(block.id, { targetId: e.target.value })}
                      className="mt-1 w-full text-xs bg-background border border-border rounded px-2 py-1"
                    >
                      <option value="">Select item...</option>
                      {selectableElements.map(el => (
                        <option key={el.id} value={el.id}>
                          {el.type} #{el.id.slice(-4)}
                        </option>
                      ))}
                    </select>
                  )}
                  {block.type === 'add_score' && (
                    <input
                      type="number"
                      value={block.value || 10}
                      onChange={(e) => onUpdateLogic(block.id, { value: parseInt(e.target.value) || 0 })}
                      className="mt-1 w-16 text-xs bg-background border border-border rounded px-2 py-1"
                      min={1}
                      max={1000}
                    />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemoveLogic(block.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
