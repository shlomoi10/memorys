import React, { useState, useEffect } from 'react';
import GameLayout from './components/GameLayout';
import Board from './components/Board';
import SidePanel from './components/SidePanel';
import GameInfoDialog from './components/GameInfoDialog';
import WinnerDialog from './components/WinnerDialog';
import StartScreen from './components/StartScreen';
import PlayerSettingsDialog from './components/PlayerSettingsDialog';
import PanelButtons from './components/PanelButtons';
import { useClassicMemory } from './hooks/useClassicMemory';
import { useCumulativeScoreMemory } from './hooks/useCumulativeScoreMemory';
import { useLowScoreMemory } from './hooks/useLowScoreMemory';
import { useActionCardsMemory } from './hooks/useActionCardsMemory';
import { GAME_RULES } from './constants/gameRules';
import { MemorySettings, Player } from './core/BaseMemory';
import './AppButtons.css';

const defaultPlayers: Player[] = [
  { name: 'שחקן 1', color: '#2196f3', score: 0 },
  { name: 'שחקן 2', color: '#4caf50', score: 0 },
];

const gameVariants = [
  { key: 'classic', name: 'זיכרון קלאסי', hook: useClassicMemory },
  { key: 'cumulative', name: 'ניקוד מצטבר', hook: useCumulativeScoreMemory },
  { key: 'action', name: 'קלפי פעולה', hook: useActionCardsMemory },
];

export default function App() {
  const [settings, setSettings] = useState<MemorySettings>({
    players: defaultPlayers,
    currentPlayer: 0,
    cardBackColors: ['#2196f3', '#4caf50'],
    cardOrientation: 'portrait',
    cardNameMode: 'default',
    spacingMode: 'default',
    cardSizeMode: 'default',
  });
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // הגדרות נשמרות ב-localStorage
  useEffect(() => {
    const saved = localStorage.getItem('memorySettings');
    if (saved) {
      setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('memorySettings', JSON.stringify(settings));
  }, [settings]);

  // שינוי הגדרות כלליות (שמות, צבעים, שחקנים) יתעדכן אוטומטית בכל המשחקים
  // כל hook של משחק יקבל תמיד את settings המשותף
  const classic = useClassicMemory(settings);
  const cumulative = useCumulativeScoreMemory(settings);
  const lowscore = useLowScoreMemory(settings);
  const action = useActionCardsMemory(settings);

  const variantMap: Record<string, any> = {
    classic,
    cumulative,
    lowscore,
    action,
  };

  const extendedGameVariants = [
    ...gameVariants,
    { key: 'lowscore', name: 'ניקוד נמוך', hook: useLowScoreMemory },
  ];

  const filteredGameVariants = extendedGameVariants.filter(g => g.key !== 'minscore');

  let gameHookResult = selectedGame ? variantMap[selectedGame] : null;
  let gameName = '';
  let gameRules = '';
  if (selectedGame) {
    const variant = filteredGameVariants.find(g => g.key === selectedGame);
    if (variant) {
      gameName = variant.name;
      gameRules = GAME_RULES[selectedGame] || '';
    }
  }

  // כאשר מתבצע שינוי כלשהו בהגדרות הכלליות, הוא מתעדכן בכל המשחקים וגם בדף הבית
  // לדוג' שינוי שם/צבע שחקן:
  const handleSettingsChange = (newPlayers: Player[]) => {
    setSettings(prev => ({
      ...prev,
      players: newPlayers,
      cardBackColors: newPlayers.map(p => p.color),
    }));
  };

  // שינוי כיוון קלפים
  const handleCardOrientationChange = (value: 'portrait' | 'landscape') => {
    setSettings(prev => ({ ...prev, cardOrientation: value }));
  };

  const handleCardNameModeChange = (mode: 'default' | 'none') => {
    setSettings(prev => ({ ...prev, cardNameMode: mode }));
  };

  const handleSpacingModeChange = (mode: 'default' | 'compact') => {
    setSettings(prev => ({ ...prev, spacingMode: mode }));
  };

  const handleCardSizeModeChange = (mode: 'default' | 'small') => {
    setSettings(prev => ({ ...prev, cardSizeMode: mode }));
  };

  const handleBackToHome = () => {
    setTimeout(() => setSelectedGame(null), 0); // עבור לדף הבית אחרי סגירה
  };

  const handleRestart = () => {
    setTimeout(() => {
      if (gameHookResult && gameHookResult.reset) {
        gameHookResult.reset();
      }
    }, 0);
  };

  if (!selectedGame) {
    return (
      <StartScreen
        gameVariants={filteredGameVariants}
        defaultPlayers={settings.players}
        onStart={({ selectedGame, boardSize, players }) => {
          // קבע מספר זוגות לפי boardSize
          let numPairs = 8;
          if (boardSize === 6) numPairs = 18;
          else if (boardSize === 8) numPairs = 32;
          setSettings(prev => ({
            ...prev,
            players,
            currentPlayer: 0,
            cardBackColors: players.map(p => p.color),
            boardSize,
            numPairs,
          }));
          setSelectedGame(selectedGame);
        }}
        onPlayersChange={handleSettingsChange}
      />
    );
  }

  if (selectedGame && gameHookResult) {
    const { cards, players, currentPlayer, onCardClick, winner, isPopupOpen, timer, pairsFound, totalPairs, moves } = gameHookResult;
    return (
      <GameLayout
        sidePanel={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', marginBottom: '1cm' }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <SidePanel
                players={players}
                currentPlayer={currentPlayer}
                gameName={gameName}
                rules={gameRules}
                timer={timer}
                pairsFound={pairsFound}
                totalPairs={totalPairs}
                moves={moves}
                cards={cards}
              />
            </div>
          </div>
        }
      >
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', margin: '24px 0 12px 0' }}>
          <PanelButtons
            onRestart={handleRestart}
            onSettings={() => setShowSettings(true)}
            onInfo={() => setShowInfo(true)}
            onBackToHome={handleBackToHome}
            timer={gameHookResult?.timer}
            pairsFound={gameHookResult?.pairsFound}
            totalPairs={gameHookResult?.totalPairs}
          />
        </div>
        <Board
          cards={cards}
          onCardClick={onCardClick}
          currentPlayerColor={players[currentPlayer]?.color}
          boardSize={settings.boardSize}
          cardOrientation={settings.cardOrientation}
          cardNameMode={settings.cardNameMode}
          spacingMode={settings.spacingMode}
          cardSizeMode={settings.cardSizeMode}
        />
        <WinnerDialog
          open={isPopupOpen}
          winner={(() => {
            if (!winner || !players.length) return null;
            return { name: winner.name, score: winner.score };
          })()}
          loser={(() => {
            if (!winner || !players.length) return null;
            // מצא את המפסיד: שחקן עם הניקוד הנמוך ביותר, לא המנצח
            const losers = players.filter((p: any) => p.name !== winner.name);
            if (!losers.length) return null;
            let minScore = Math.min(...losers.map((p: any) => p.score));
            const loser = losers.find((p: any) => p.score === minScore) || losers[0];
            return { name: loser.name, score: loser.score };
          })()}
          onHome={handleBackToHome}
          onRestart={handleRestart}
        />
        <PlayerSettingsDialog
          open={showSettings}
          players={players}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
          cardOrientation={settings.cardOrientation}
          onCardOrientationChange={handleCardOrientationChange}
          cardNameMode={settings.cardNameMode}
          onCardNameModeChange={handleCardNameModeChange}
          spacingMode={settings.spacingMode}
          onSpacingModeChange={handleSpacingModeChange}
          cardSizeMode={settings.cardSizeMode}
          onCardSizeModeChange={handleCardSizeModeChange}
        />
        <GameInfoDialog open={showInfo} onClose={() => setShowInfo(false)} gameName={gameName} rules={gameRules} />
      </GameLayout>
    );
  }

  return null;
}
