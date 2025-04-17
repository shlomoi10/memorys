// קטגוריות
import { BaseMemory } from '../core/BaseMemory';

export class CategoriesMemory extends BaseMemory {
  onCardClick(cardId: string) {}
  getPopupContent() { return null; }
  getWinner() { return null; }
  getEndMessage() { return ''; }
}
