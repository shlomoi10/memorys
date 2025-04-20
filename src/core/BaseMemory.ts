// בסיס לוגיקת משחק זיכרון, ניתן להרחבה לכל וריאנט
export interface EmojiItem {
  shortName: string;
  name: string;
  src: string;
}

export interface Card {
  id: string;
  emoji: EmojiItem; // היה string, כעת אובייקט
  type: 'normal' | 'action';
  actionType?: 'reveal-pair' | 'shuffle' | 'extra-turn' | 'lose-turn';
  category?: string;
  isOpen: boolean;
  isMatched: boolean;
}

export interface Player {
  name: string;
  color: string;
  score: number;
}

export interface MemorySettings {
  players: Player[];
  currentPlayer: number;
  cardBackColors: string[];
  categories?: string[];
  numPairs?: number;
  numTriplets?: number;
  timerEnabled?: boolean;
  boardSize?: number;
  cardOrientation?: 'portrait' | 'landscape'; // חדש: אורך/רוחב
  cardNameMode?: 'default' | 'none';
  spacingMode?: 'default' | 'compact';
}

export interface MemoryState {
  cards: Card[];
  players: Player[];
  currentPlayer: number;
  isPopupOpen: boolean;
  popupContent?: React.ReactNode;
  winner?: Player;
  timer?: number;
  stats?: any;
}

export abstract class BaseMemory {
  abstract settings: MemorySettings;
  abstract state: MemoryState;
  abstract onCardClick(cardId: string): void;
  abstract onSettingsChange(settings: MemorySettings): void;
  abstract reset(): void;
}
