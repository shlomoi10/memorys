// משחק זיכרון קלאסי בסיסי
import { BaseMemory, Card, Player, MemorySettings } from '../core/BaseMemory';

export class ClassicMemory extends BaseMemory {
  settings: MemorySettings;
  state: any;
  constructor(settings: MemorySettings) {
    super();
    this.settings = settings;
    // יצירת קלפים, ערבוב, וכו'...
  }
  onCardClick(cardId: string) {}
  onSettingsChange(settings: MemorySettings) {}
  reset() {}
}
