export interface QuestDay {
  id: number;
  date: string; // Format: YYYY-MM-DD
  title: string;
  riddle: string;
  answer: string[]; // Array of acceptable answers (case-insensitive)
  rewardMessage: string;
  lockedMessage?: string;
  // New properties for unique levels
  mapLayout: string[]; 
  theme: {
    wallColor: string;
    floorColor: string;
    accentColor: string;
  };
}

export interface QuestConfig {
  recipientName: string;
  startDate: string; // YYYY-MM-DD
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  days: QuestDay[];
}

export interface ProgressState {
  [dayId: number]: boolean; // true if completed
}

// Game Types
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export interface Position { x: number; y: number; }
export type GameView = 'HUB' | 'ROOM' | 'RIDDLE' | 'EVOLUTION';

export interface TileData {
  type: 'WALL' | 'FLOOR' | 'DOOR' | 'CHEST' | 'START';
  id?: number; // For doors (level ID)
  isLocked?: boolean;
  isCompleted?: boolean;
}