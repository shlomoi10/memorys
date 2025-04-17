// מינימום ניקוד
import { BaseMemory } from '../core/BaseMemory';

export class MinScoreMemory extends BaseMemory {
  onCardClick(cardId: string) {}
  getPopupContent() { return null; }
  getWinner() { return null; }
  getEndMessage() { return ''; }
}
