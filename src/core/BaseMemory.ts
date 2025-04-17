// בסיס לוגיקת משחק זיכרון, ניתן להרחבה לכל וריאנט
export interface Card {
  id: string;
  emoji: string;
  type: 'normal' | 'action';
  actionType?: 'reveal-pair' | 'shuffle';
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
}

export interface MemoryState {
  cards: Card[];
  players: Player[];
  currentPlayer: number;
  isPopupOpen: boolean;
  popupContent?: React.ReactNode;
  winner?: Player;
}

export abstract class BaseMemory {
  abstract settings: MemorySettings;
  abstract state: MemoryState;
  abstract onCardClick(cardId: string): void;
  abstract onSettingsChange(settings: MemorySettings): void;
  abstract reset(): void;
}
