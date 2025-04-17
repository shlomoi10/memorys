// קלפי פעולה
import { BaseMemory } from '../core/BaseMemory';

export class ActionCardsMemory extends BaseMemory {
  onCardClick(cardId: string) {}
  getPopupContent() { return null; }
  getWinner() { return null; }
  getEndMessage() { return ''; }
}
