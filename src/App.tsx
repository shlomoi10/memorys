import React, { useState } from 'react';
import GameLayout from './layout/GameLayout';
import Board from './components/Board';
import PlayerSettingsDialog from './components/PlayerSettingsDialog';
import WinnerDialog from './components/WinnerDialog';
import { ClassicMemory } from './variants/classic';
import { MemorySettings, Player } from './core/BaseMemory';

const defaultPlayers: Player[] = [
  { name: 'שחקן 1', color: '#2196f3', score: 0 },
  { name: 'שחקן 2', color: '#4caf50', score: 0 },
];

function App() {
  const [settings, setSettings] = useState<MemorySettings>({
    players: defaultPlayers,
    currentPlayer: 0,
    cardBackColors: ['#2196f3', '#4caf50'],
  });
  const [showSettings, setShowSettings] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  // דוגמה: החלף כאן לפי המשחק
  const memory = new ClassicMemory(settings);

  const handleSettingsChange = (players: Player[]) => {
    setSettings(s => ({ ...s, players, cardBackColors: players.map(p => p.color) }));
    setShowSettings(false);
  };

  return (
    <GameLayout
      players={settings.players}
      currentPlayer={settings.currentPlayer}
      onSettings={() => setShowSettings(true)}
    >
      <Board
        cards={memory.state.cards}
        onCardClick={memory.onCardClick.bind(memory)}
        currentPlayerColor={settings.cardBackColors[settings.currentPlayer]}
      />
      <PlayerSettingsDialog
        open={showSettings}
        players={settings.players}
        onChange={handleSettingsChange}
        onClose={() => setShowSettings(false)}
      />
      <WinnerDialog
        open={!!winner}
        winner={winner || ''}
        onClose={() => setWinner(null)}
      />
    </GameLayout>
  );
}

export default App;
