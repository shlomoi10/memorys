// משחק עם קלפי פעולה
import { BaseMemory, MemorySettings, Player, MemoryState, Card as CoreCard, EmojiItem } from '../core/BaseMemory';
import { getAvailableEmojis } from '../utils/EmojiHelper';

const ACTION_TYPES = ['reveal-pair', 'shuffle', 'extra-turn', 'lose-turn'] as const;
type ActionType = typeof ACTION_TYPES[number];

function getRandomAction(): ActionType {
  return ACTION_TYPES[Math.floor(Math.random() * ACTION_TYPES.length)];
}

export class ActionCardsMemory extends BaseMemory {
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
    const emojis: EmojiItem[] = getAvailableEmojis(numPairs - 2);
    let cards: CoreCard[] = [];
    emojis.forEach((emoji, i) => {
      cards.push({ id: `${i}-a`, emoji, type: 'normal', isOpen: false, isMatched: false });
      cards.push({ id: `${i}-b`, emoji, type: 'normal', isOpen: false, isMatched: false });
    });
    // מוסיפים 2 זוגות קלפי פעולה
    for (let i = 0; i < 2; i++) {
      const action = getRandomAction();
      cards.push({ id: `action${i}-a`, emoji: { shortName: 'star', name: 'כוכב', src: 'https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/2B50.svg' }, type: 'action', actionType: action, isOpen: false, isMatched: false });
      cards.push({ id: `action${i}-b`, emoji: { shortName: 'star', name: 'כוכב', src: 'https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/2B50.svg' }, type: 'action', actionType: action, isOpen: false, isMatched: false });
    }
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
    if (c1.type === 'action' && c2.type === 'action' && c1.actionType === c2.actionType) {
      c1.isMatched = true;
      c2.isMatched = true;
      this.applyAction(c1.actionType!);
    } else if (c1.emoji.shortName === c2.emoji.shortName && c1.type === 'normal' && c2.type === 'normal') {
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
      this.state.winner = this.settings.players.reduce((a, b) => (a.score > b.score ? a : b));
    }
  }
  applyAction(action: ActionType) {
    switch (action) {
      case 'reveal-pair':
        // פותח זוג קלפים אקראי
        const closed = this.cards.filter(c => !c.isOpen && !c.isMatched);
        if (closed.length >= 2) {
          closed[0].isOpen = true;
          closed[1].isOpen = true;
        }
        break;
      case 'shuffle':
        // ערבוב הקלפים
        for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        break;
      case 'extra-turn':
        // השחקן הנוכחי מקבל תור נוסף (לא מעבירים תור)
        break;
      case 'lose-turn':
        // השחקן הנוכחי מפסיד תור (מעבירים פעמיים)
        this.settings.currentPlayer = (this.settings.currentPlayer + 1) % this.settings.players.length;
        break;
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
