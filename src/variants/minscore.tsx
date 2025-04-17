// משחק "מינימום ניקוד"
import { BaseMemory, Card, Player, MemorySettings } from '../core/BaseMemory';

export class MinScoreMemory extends BaseMemory {
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
