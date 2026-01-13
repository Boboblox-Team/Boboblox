import { Gamepad2, Square, CircleDot, Skull, Trophy, Minus, Triangle } from "lucide-react";
import { ELEMENT_TEMPLATES } from "./types";

interface ElementPaletteProps {
  onDragStart: (type: string) => void;
}

const elements = [
  { type: 'player', label: 'Player', icon: Gamepad2, color: ELEMENT_TEMPLATES.player.color },
  { type: 'block', label: 'Block', icon: Square, color: ELEMENT_TEMPLATES.block.color },
  { type: 'coin', label: 'Coin', icon: CircleDot, color: ELEMENT_TEMPLATES.coin.color },
  { type: 'enemy', label: 'Enemy', icon: Skull, color: ELEMENT_TEMPLATES.enemy.color },
  { type: 'goal', label: 'Goal', icon: Trophy, color: ELEMENT_TEMPLATES.goal.color },
  { type: 'platform', label: 'Platform', icon: Minus, color: ELEMENT_TEMPLATES.platform.color },
  { type: 'spike', label: 'Spike', icon: Triangle, color: ELEMENT_TEMPLATES.spike.color },
];

export const ElementPalette = ({ onDragStart }: ElementPaletteProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="text-2xl">🧱</span> Game Pieces
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {elements.map((el) => (
          <div
            key={el.type}
            draggable
            onDragStart={() => onDragStart(el.type)}
            className="flex flex-col items-center gap-2 p-3 bg-secondary/50 rounded-xl cursor-grab hover:bg-secondary hover:scale-105 transition-all active:cursor-grabbing border-2 border-transparent hover:border-primary/30"
          >
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: el.color }}
            >
              <el.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-foreground">{el.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
