// בסיס כללי למנוע זיכרון מודולרי
export interface PlayerConfig {
  name: string;
  color: string;
}

export interface MemoryCard {
  id: string;
  emoji: string;
  type: 'pair' | 'action';
  actionType?: 'reveal-pair' | 'shuffle';
  category?: string;
}

export interface MemorySettings {
  players: PlayerConfig[];
}

export interface MemoryState {
  cards: MemoryCard[];
  openCards: string[];
  foundPairs: string[];
  playerTurn: number;
  scores: number[];
  settings: MemorySettings;
  winner?: number;
  finished: boolean;
}

export abstract class BaseMemory {
  state: MemoryState;
  constructor(settings: MemorySettings, cards: MemoryCard[]) {
    this.state = {
      cards,
      openCards: [],
      foundPairs: [],
      playerTurn: 0,
      scores: settings.players.map(() => 0),
      settings,
      finished: false
    };
  }
  abstract onCardClick(cardId: string): void;
  abstract getPopupContent(): React.ReactNode | null;
  abstract getWinner(): number | null;
  abstract getEndMessage(): string;
}
