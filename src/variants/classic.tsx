// זיכרון קלאסי - משחק בסיסי
import { BaseMemory } from '../core/BaseMemory';

export class ClassicMemory extends BaseMemory {
  onCardClick(cardId: string) {
    // לוגיקה בסיסית לזוגות
  }
  getPopupContent() {
    return null;
  }
  getWinner() {
    return null;
  }
  getEndMessage() {
    return '';
  }
}
