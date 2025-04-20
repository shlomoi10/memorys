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
import { useMinScoreMemory } from './hooks/useMinScoreMemory';
import { useTripletMemory } from './hooks/useTripletMemory';
import { useCategoriesMemory } from './hooks/useCategoriesMemory';
import { useActionCardsMemory } from './hooks/useActionCardsMemory';
import { useCumulativeScoreMemory } from './hooks/useCumulativeScoreMemory';
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
    cardOrientation: 'portrait',
    cardNameMode: 'default',
    spacingMode: 'default',
    cardSizeMode: 'default',
  });
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [winnerDialogClosed, setWinnerDialogClosed] = useState(false);
  const [cardOrientation, setCardOrientation] = useState<'portrait' | 'landscape'>(settings.cardOrientation || 'portrait');
  const [cardNameMode, setCardNameMode] = useState<'default' | 'none'>(settings.cardNameMode || 'default');
  const [spacingMode, setSpacingMode] = useState<'default' | 'compact'>(settings.spacingMode || 'default');
  const [cardSizeMode, setCardSizeMode] = useState<'default' | 'small'>(settings.cardSizeMode || 'default');

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

  // שמירה וטעינה של הגדרות כולל cardOrientation ו-cardNameMode
  useEffect(() => {
    setCardOrientation(settings.cardOrientation || 'portrait');
    setCardNameMode(settings.cardNameMode || 'default');
    setSpacingMode(settings.spacingMode || 'default');
    setCardSizeMode(settings.cardSizeMode || 'default');
  }, [settings.cardOrientation, settings.cardNameMode, settings.spacingMode, settings.cardSizeMode]);

  // שינוי הגדרות כלליות (שמות, צבעים, שחקנים) יתעדכן אוטומטית בכל המשחקים
  // כל hook של משחק יקבל תמיד את settings המשותף
  const classic = useClassicMemory(settings);
  const cumulative = useCumulativeScoreMemory(settings);
  const minscore = useMinScoreMemory(settings);
  const triplet = useTripletMemory(settings);
  const categories = useCategoriesMemory(settings);
  const actioncards = useActionCardsMemory(settings);

  const variantMap: Record<string, any> = {
    classic,
    cumulative,
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
    setCardOrientation(value);
    setSettings(prev => ({ ...prev, cardOrientation: value }));
  };

  const handleCardNameModeChange = (mode: 'default' | 'none') => {
    setCardNameMode(mode);
    setSettings(prev => ({ ...prev, cardNameMode: mode }));
  };

  const handleSpacingModeChange = (mode: 'default' | 'compact') => {
    setSpacingMode(mode);
    setSettings(prev => ({ ...prev, spacingMode: mode }));
  };

  const handleCardSizeModeChange = (mode: 'default' | 'small') => {
    setCardSizeMode(mode);
    setSettings(prev => ({ ...prev, cardSizeMode: mode }));
  };

  const handleWinnerDialogClose = () => {
    setWinnerDialogClosed(true);
    // הפעל משחק חדש על ידי שינוי settings (טריגר לאיפוס)
    setSettings(prev => ({
      ...prev,
      // שינוי קטן כדי לטרגר את useEffect של useClassicMemory
      players: prev.players.map(p => ({ ...p })),
    }));
  };

  useEffect(() => {
    if (winnerDialogClosed) {
      setWinnerDialogClosed(false);
    }
  }, [settings]);

  // חזרה לדף הבית לא תאפס את ה־state, רק תסגור את המשחק הנוכחי
  const handleBackToHome = () => {
    setWinnerDialogClosed(true); // סגור דיאלוג
    setTimeout(() => setSelectedGame(null), 0); // עבור לדף הבית אחרי סגירה
  };

  const handleRestart = () => {
    setWinnerDialogClosed(true); // סגור דיאלוג
    setTimeout(() => {
      setWinnerDialogClosed(false); // פתח דיאלוג מחדש אם צריך
      if (gameHookResult && gameHookResult.reset) {
        gameHookResult.reset();
      }
    }, 0);
  };

  if (!selectedGame) {
    return (
      <StartScreen
        gameVariants={gameVariants}
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
    const { cards, players, currentPlayer, onCardClick, winner, isPopupOpen, reset, timer, pairsFound, totalPairs, moves } = gameHookResult;
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
          />
        </div>
        <Board
          cards={cards}
          onCardClick={onCardClick}
          currentPlayerColor={players[currentPlayer]?.color}
          boardSize={settings.boardSize}
          cardOrientation={cardOrientation}
          cardNameMode={cardNameMode}
          spacingMode={spacingMode}
          cardSizeMode={cardSizeMode}
        />
        <WinnerDialog
          open={isPopupOpen && !winnerDialogClosed}
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
          cardOrientation={cardOrientation}
          onCardOrientationChange={handleCardOrientationChange}
          cardNameMode={cardNameMode}
          onCardNameModeChange={handleCardNameModeChange}
          spacingMode={spacingMode}
          onSpacingModeChange={handleSpacingModeChange}
          cardSizeMode={cardSizeMode}
          onCardSizeModeChange={handleCardSizeModeChange}
        />
        <GameInfoDialog open={showInfo} onClose={() => setShowInfo(false)} gameName={gameName} rules={gameRules} />
      </GameLayout>
    );
  }

  return null;
}
