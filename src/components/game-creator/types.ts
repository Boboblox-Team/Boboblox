export interface GameElement {
  id: string;
  type: 'player' | 'block' | 'coin' | 'enemy' | 'goal' | 'platform' | 'spike';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface LogicBlock {
  id: string;
  type: 'when_touch' | 'when_start' | 'collect' | 'game_over' | 'next_level' | 'add_score';
  targetId?: string;
  value?: number;
}

export interface GameData {
  elements: GameElement[];
  logic: LogicBlock[];
  backgroundColor: string;
}

export interface UserGame {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  game_data: GameData;
  thumbnail_color: string;
  is_published: boolean;
  play_count: number;
  created_at: string;
  updated_at: string;
}

export const ELEMENT_TEMPLATES = {
  player: { width: 40, height: 40, color: '#00d4ff' },
  block: { width: 60, height: 60, color: '#4ade80' },
  coin: { width: 30, height: 30, color: '#fbbf24' },
  enemy: { width: 40, height: 40, color: '#ef4444' },
  goal: { width: 50, height: 50, color: '#a855f7' },
  platform: { width: 120, height: 20, color: '#6b7280' },
  spike: { width: 30, height: 30, color: '#dc2626' },
};

export const LOGIC_TEMPLATES = [
  { type: 'when_start', label: '🎮 When Game Starts', icon: '🎮' },
  { type: 'when_touch', label: '👆 When Player Touches', icon: '👆' },
  { type: 'collect', label: '⭐ Collect Item', icon: '⭐' },
  { type: 'add_score', label: '🔢 Add Score', icon: '🔢' },
  { type: 'game_over', label: '💥 Game Over', icon: '💥' },
  { type: 'next_level', label: '🏆 Win Level', icon: '🏆' },
] as const;
