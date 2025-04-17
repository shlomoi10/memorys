// משחק "מינימום ניקוד"
import { BaseMemory, MemorySettings, Player, MemoryState, Card as CoreCard } from '../core/BaseMemory';
import { getAvailableEmojis } from '../utils/EmojiHelper';

export class MinScoreMemory extends BaseMemory {
  settings: MemorySettings;
  state: MemoryState;
  private cards: CoreCard[];
  private flipped: string[];
  private lockBoard: boolean;
  constructor(settings: MemorySettings) {
    super();
    this.settings = settings;
    this.cards = this.generateCards();
    this.flipped = [];
    this.lockBoard = false;
    this.state = this.buildState();
  }
  generateCards(): CoreCard[] {
    const numPairs = this.settings.numPairs || 8;
    const emojis = getAvailableEmojis(numPairs);
    let cards: CoreCard[] = [];
    emojis.forEach((emoji, i) => {
      cards.push({ id: `${i}-a`, emoji, type: 'normal', isOpen: false, isMatched: false });
      cards.push({ id: `${i}-b`, emoji, type: 'normal', isOpen: false, isMatched: false });
    });
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
  buildState(): MemoryState {
    return {
      cards: this.cards.map(c => ({ ...c })),
      players: this.settings.players,
      currentPlayer: this.settings.currentPlayer,
      isPopupOpen: false,
    };
  }
  onCardClick(cardId: string) {
    if (this.lockBoard) return;
    const card = this.cards.find(c => c.id === cardId);
    if (!card || card.isOpen || card.isMatched) return;
    card.isOpen = true;
    this.flipped.push(cardId);
    if (this.flipped.length === 2) {
      this.lockBoard = true;
      setTimeout(() => {
        this.checkMatch();
        this.lockBoard = false;
        this.state = this.buildState();
      }, 800);
    } else {
      this.state = this.buildState();
    }
  }
  checkMatch() {
    const [id1, id2] = this.flipped;
    const c1 = this.cards.find(c => c.id === id1);
    const c2 = this.cards.find(c => c.id === id2);
    if (!c1 || !c2) return;
    if (c1.emoji === c2.emoji) {
      c1.isMatched = true;
      c2.isMatched = true;
      this.settings.players[this.settings.currentPlayer].score += 1;
    } else {
      c1.isOpen = false;
      c2.isOpen = false;
      // מעבר תור
      this.settings.currentPlayer = (this.settings.currentPlayer + 1) % this.settings.players.length;
    }
    this.flipped = [];
    this.state = this.buildState();
    // בדיקת ניצחון
    if (this.cards.every(c => c.isMatched)) {
      this.state.isPopupOpen = true;
      // מנצח: הכי פחות נקודות
      this.state.winner = this.settings.players.reduce((a, b) => (a.score < b.score ? a : b));
    }
  }
  onSettingsChange(settings: MemorySettings) {
    this.settings = settings;
    this.cards = this.generateCards();
    this.flipped = [];
    this.lockBoard = false;
    this.state = this.buildState();
  }
  reset() {
    this.cards = this.generateCards();
    this.flipped = [];
    this.lockBoard = false;
    this.state = this.buildState();
  }
}
