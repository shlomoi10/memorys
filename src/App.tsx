import React, { useState } from 'react';
import GameLayout from './components/GameLayout';
import ModernBoard from './components/ModernBoard';
import SidePanel from './components/SidePanel';
import GameInfoDialog from './components/GameInfoDialog';
import PlayerSettingsDialog from './components/PlayerSettingsDialog';
import WinnerDialog from './components/WinnerDialog';
import StartScreen from './components/StartScreen';
import { useClassicMemory } from './hooks/useClassicMemory';
import { useMinScoreMemory } from './hooks/useMinScoreMemory';
import { useTripletMemory } from './hooks/useTripletMemory';
import { useCategoriesMemory } from './hooks/useCategoriesMemory';
import { useActionCardsMemory } from './hooks/useActionCardsMemory';
import { GAME_RULES } from './constants/gameRules';
import { MemorySettings, Player } from './core/BaseMemory';

const defaultPlayers: Player[] = [
  { name: 'שחקן 1', color: '#2196f3', score: 0 },
  { name: 'שחקן 2', color: '#4caf50', score: 0 },
];

const gameVariants = [
  { key: 'classic', name: 'זיכרון קלאסי', hook: useClassicMemory },
  { key: 'minscore', name: 'מינימום ניקוד', hook: useMinScoreMemory },
  { key: 'triplet', name: 'השלישייה', hook: useTripletMemory },
  { key: 'categories', name: 'קטגוריות', hook: useCategoriesMemory },
  { key: 'actioncards', name: 'קלפי פעולה', hook: useActionCardsMemory },
];

export default function App() {
  const [settings, setSettings] = useState<MemorySettings>({
    players: defaultPlayers,
    currentPlayer: 0,
    cardBackColors: ['#2196f3', '#4caf50'],
  });
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const classic = useClassicMemory(settings);
  const minscore = useMinScoreMemory(settings);
  const triplet = useTripletMemory(settings);
  const categories = useCategoriesMemory(settings);
  const actioncards = useActionCardsMemory(settings);

  const variantMap: Record<string, any> = {
    classic,
    minscore,
    triplet,
    categories,
    actioncards,
  };

  let gameHookResult = selectedGame ? variantMap[selectedGame] : null;
  let gameName = '';
  let gameRules = '';
  if (selectedGame) {
    const variant = gameVariants.find(g => g.key === selectedGame);
    if (variant) {
      gameName = variant.name;
      gameRules = GAME_RULES[selectedGame] || '';
    }
  }

  const handleSettingsChange = (players: Player[]) => {
    setSettings(s => ({ ...s, players, cardBackColors: players.map(p => p.color) }));
    setShowSettings(false);
  };

  if (!selectedGame) {
    return (
      <StartScreen
        gameVariants={gameVariants}
        defaultPlayers={defaultPlayers}
        onStart={({ selectedGame, boardSize, players }) => {
          setSettings({
            players,
            currentPlayer: 0,
            cardBackColors: players.map(p => p.color),
            boardSize,
          });
          setSelectedGame(selectedGame);
        }}
      />
    );
  }

  if (selectedGame && gameHookResult) {
    const { cards, players, currentPlayer, onCardClick, winner, isPopupOpen, reset, timer, pairsFound, totalPairs, moves } = gameHookResult;
    return (
      <GameLayout
        sidePanel={
          <SidePanel
            players={players}
            currentPlayer={currentPlayer}
            gameName={gameName}
            rules={gameRules}
            timer={timer}
            pairsFound={pairsFound}
            totalPairs={totalPairs}
            moves={moves}
          />
        }
      >
        <ModernBoard
          cards={cards}
          onCardClick={onCardClick}
          currentPlayerColor={settings.cardBackColors[currentPlayer]}
        />
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <button onClick={reset} style={{ fontSize: 16, padding: '0.5em 1.2em', borderRadius: 8, border: '1px solid #1976d2', background: '#e3f2fd', color: '#1976d2', cursor: 'pointer' }}>התחל מחדש</button>
          <button onClick={() => setShowSettings(true)} style={{ fontSize: 16, padding: '0.5em 1.2em', borderRadius: 8, border: '1px solid #1976d2', background: '#fff', color: '#1976d2', cursor: 'pointer' }}>הגדרות שחקנים</button>
          <button onClick={() => setShowInfo(true)} style={{ fontSize: 16, padding: '0.5em 1.2em', borderRadius: 8, border: '1px solid #1976d2', background: '#fff', color: '#1976d2', cursor: 'pointer' }}>מידע וחוקים</button>
          <button onClick={() => setSelectedGame(null)} style={{ fontSize: 16, padding: '0.5em 1.2em', borderRadius: 8, border: '1px solid #1976d2', background: '#fff', color: '#1976d2', cursor: 'pointer' }}>חזרה לדף הבית</button>
        </div>
        <PlayerSettingsDialog
          open={showSettings}
          players={players}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
        <WinnerDialog
          open={!!isPopupOpen}
          winner={winner ? winner.name : ''}
          onClose={reset}
        />
        <GameInfoDialog
          open={showInfo}
          onClose={() => setShowInfo(false)}
          gameName={gameName}
          rules={gameRules}
        />
      </GameLayout>
    );
  }

  return null;
}
