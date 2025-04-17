// משחק עם קלפי פעולה
import { BaseMemory, Card, Player, MemorySettings } from '../core/BaseMemory';

export class ActionCardsMemory extends BaseMemory {
  settings: MemorySettings;
  state: any;
  constructor(settings: MemorySettings) {
    super();
    this.settings = settings;
  }
  onCardClick(cardId: string) {}
  onSettingsChange(settings: MemorySettings) {}
  reset() {}
}
