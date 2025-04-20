import { useState, useEffect } from 'react';
import { Card, Player, MemorySettings } from '../core/BaseMemory';
import { getAvailableEmojis } from '../utils/EmojiHelper';

// יצירת קלפים עם pairScore רנדומלי (זהה לכל זוג)
function generateCardsWithScores(numPairs: number) {
  const emojis = getAvailableEmojis(numPairs);
  let newCards: Card[] = [];
  for (let i = 0; i < emojis.length; i++) {
    // ניקוד רנדומלי בין 1 ל-10 לכל זוג
    const score = Math.floor(Math.random() * 10) + 1;
    newCards.push({ id: `${i}-a`, emoji: emojis[i], type: 'normal', isOpen: false, isMatched: false, pairScore: score });
    newCards.push({ id: `${i}-b`, emoji: emojis[i], type: 'normal', isOpen: false, isMatched: false, pairScore: score });
  }
  // ערבוב
  for (let i = newCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
  }
  return newCards;
}

export function useLowScoreMemory(settings: MemorySettings) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [players, setPlayers] = useState<Player[]>(settings.players.map(p => ({ ...p, score: 0 })));
  const [currentPlayer, setCurrentPlayer] = useState(settings.currentPlayer);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timer, setTimer] = useState('00:00');

  useEffect(() => {
    setPlayers(prevPlayers => prevPlayers.map((p, idx) => ({
      ...p,
      name: settings.players[idx]?.name || p.name,
      color: settings.players[idx]?.color || p.color,
    })));
  }, [settings.players, settings]);

  useEffect(() => {
    const numPairs = settings.numPairs || 8;
    setCards(generateCardsWithScores(numPairs));
    setFlipped([]);
    setLockBoard(false);
    setPlayers(settings.players.map(p => ({ ...p, score: 0 })));
    setCurrentPlayer(settings.currentPlayer);
    setWinner(null);
    setIsPopupOpen(false);
  }, [settings.numPairs, settings.currentPlayer, settings.players]);

  useEffect(() => {
    setMoves(0);
    setStartTime(null);
    setTimer('00:00');
  }, [settings.numPairs, settings.currentPlayer]);

  useEffect(() => {
    if (cards.length && startTime === null && moves === 0) {
      setStartTime(Date.now());
    }
  }, [cards, startTime, moves]);

  useEffect(() => {
    if (startTime !== null && !winner) {
      const interval = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000);
        const m = String(Math.floor(diff / 60)).padStart(2, '0');
        const s = String(diff % 60).padStart(2, '0');
        setTimer(`${m}:${s}`);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, winner]);

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(m => m + 1);
    }
  }, [flipped]);

  useEffect(() => {
    if (flipped.length === 2) {
      setLockBoard(true);
      setTimeout(() => {
        const [id1, id2] = flipped;
        const c1 = cards.find(c => c.id === id1);
        const c2 = cards.find(c => c.id === id2);
        if (
          c1 && c2 &&
          JSON.stringify(c1.emoji) === JSON.stringify(c2.emoji)
        ) {
          setCards(prev => prev.map(card =>
            card.id === id1 || card.id === id2 ? { ...card, isMatched: true, isOpen: true } : card
          ));
          // לא צוברים נקודות בזוג תואם
        } else if (c1 && c2) {
          setCards(prev => prev.map(card =>
            card.id === id1 || card.id === id2 ? { ...card, isOpen: false } : card
          ));
          // צבור את סכום הניקוד של שני הקלפים לשחקן הנוכחי
          setPlayers(prev => prev.map((p, i) => i === currentPlayer ? { ...p, score: (p.score || 0) + (c1.pairScore || 0) + (c2.pairScore || 0) } : p));
          setCurrentPlayer(prev => (prev + 1) % players.length);
        }
        setFlipped([]);
        setLockBoard(false);
      }, 800);
    }
  }, [flipped, cards, currentPlayer, players.length]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setIsPopupOpen(true);
      // מנצח: מי שצבר הכי פחות נקודות
      const minScore = Math.min(...players.map(p => p.score || 0));
      setWinner(players.find(p => (p.score || 0) === minScore) || null);
    }
  }, [cards, players]);

  useEffect(() => {
    if (winner) {
      setStartTime(null); // עוצר את הטיימר
    }
  }, [winner]);

  const onCardClick = (id: string) => {
    if (lockBoard || winner) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.isOpen || card.isMatched || flipped.includes(id)) return;
    setCards(prev => prev.map(c => c.id === id ? { ...c, isOpen: true } : c));
    setFlipped(prev => [...prev, id]);
  };

  const reset = () => {
    const numPairs = settings.numPairs || 8;
    setCards(generateCardsWithScores(numPairs));
    setFlipped([]);
    setLockBoard(false);
    setPlayers(settings.players.map(p => ({ ...p, score: 0 })));
    setCurrentPlayer(settings.currentPlayer);
    setWinner(null);
    setIsPopupOpen(false);
    setMoves(0);
    setStartTime(null);
    setTimer('00:00');
  };

  const pairsFound = cards.filter(c => c.isMatched).length / 2;
  const totalPairs = cards.length / 2;

  return {
    cards,
    players,
    currentPlayer,
    onCardClick,
    winner,
    isPopupOpen,
    reset,
    timer,
    pairsFound,
    totalPairs,
    moves,
  };
}
