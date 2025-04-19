import React, { useState, useEffect } from 'react';
import GameLayout from './components/GameLayout';
import Board from './components/Board';
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
import './AppButtons.css';

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
  const [winnerDialogClosed, setWinnerDialogClosed] = useState(false);

  // שינוי הגדרות כלליות (שמות, צבעים, שחקנים) יתעדכן אוטומטית בכל המשחקים
  // כל hook של משחק יקבל תמיד את settings המשותף
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

  // כאשר מתבצע שינוי כלשהו בהגדרות הכלליות, הוא מתעדכן בכל המשחקים וגם בדף הבית
  // לדוג' שינוי שם/צבע שחקן:
  const handleSettingsChange = (newPlayers: Player[]) => {
    setSettings(prev => ({
      ...prev,
      players: newPlayers,
      cardBackColors: newPlayers.map(p => p.color),
    }));
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
    setSelectedGame(null);
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
          setSettings({
            players,
            currentPlayer: 0,
            cardBackColors: players.map(p => p.color),
            boardSize,
            numPairs,
          });
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
        <Board
          cards={cards}
          onCardClick={onCardClick}
          currentPlayerColor={players[currentPlayer]?.color}
          boardSize={settings.boardSize}
        />
        <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'center', width: '100%' }}>
          <button className="game-btn primary" onClick={reset}>התחל מחדש</button>
          <button className="game-btn" onClick={() => setShowSettings(true)} type="button">הגדרות שחקנים</button>
          <button className="game-btn" onClick={() => setShowInfo(true)} type="button">מידע וחוקים</button>
          <button className="game-btn" onClick={() => { reset(); setSelectedGame(null); }} type="button">חזרה לדף הבית</button>
        </div>
        <WinnerDialog
          open={isPopupOpen}
          winner={winner ? winner.name : ''}
          onClose={handleWinnerDialogClose}
        />
        <PlayerSettingsDialog
          open={showSettings}
          players={players}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
        <GameInfoDialog open={showInfo} onClose={() => setShowInfo(false)} gameName={gameName} rules={gameRules} />
      </GameLayout>
    );
  }

  return null;
}
