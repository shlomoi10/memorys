import { useState, useEffect } from 'react';
import { Card, Player, MemorySettings, EmojiItem } from '../core/BaseMemory';
import { getAvailableEmojis } from '../utils/EmojiHelper';

export function useMinScoreMemory(settings: MemorySettings) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [players, setPlayers] = useState<Player[]>(settings.players.map(p => ({ ...p })));
  const [currentPlayer, setCurrentPlayer] = useState(settings.currentPlayer);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timer, setTimer] = useState('00:00');
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const numPairs = settings.numPairs || 8;
    const emojis: EmojiItem[] = getAvailableEmojis(numPairs);
    let newCards: Card[] = [];
    emojis.forEach((emoji, i) => {
      newCards.push({ id: `${i}-a`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
      newCards.push({ id: `${i}-b`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
    });
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setCards(newCards);
    setFlipped([]);
    setLockBoard(false);
    setPlayers(settings.players.map(p => ({ ...p })));
    setCurrentPlayer(settings.currentPlayer);
    setWinner(null);
    setIsPopupOpen(false);
  }, [settings]);

  useEffect(() => {
    if (flipped.length === 2) {
      setLockBoard(true);
      setTimeout(() => {
        const [id1, id2] = flipped;
        const c1 = cards.find(c => c.id === id1);
        const c2 = cards.find(c => c.id === id2);
        if (c1 && c2 && JSON.stringify(c1.emoji) === JSON.stringify(c2.emoji)) {
          setCards(prev => prev.map(card =>
            card.id === id1 || card.id === id2 ? { ...card, isMatched: true, isOpen: true } : card
          ));
          setPlayers(prev => prev.map((p, i) => i === currentPlayer ? { ...p, score: p.score + 1 } : p));
        } else {
          setCards(prev => prev.map(card =>
            card.id === id1 || card.id === id2 ? { ...card, isOpen: false } : card
          ));
          setPlayers(prev => prev.map((p, i) => i === currentPlayer ? { ...p, score: p.score + 1 } : p));
          setCurrentPlayer(prev => (prev + 1) % players.length);
        }
        setFlipped([]);
        setLockBoard(false);
        setMoves(m => m + 1);
      }, 800);
    }
  }, [flipped]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setIsPopupOpen(true);
      const minScore = Math.min(...players.map(p => p.score));
      setWinner(players.find(p => p.score === minScore) || null);
    }
  }, [cards]);

  useEffect(() => {
    let interval: any = null;
    if (cards.length > 0 && !winner) {
      let seconds = 0;
      interval = setInterval(() => {
        seconds++;
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = (seconds % 60).toString().padStart(2, '0');
        setTimer(`${min}:${sec}`);
      }, 1000);
    } else if (winner && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [cards, winner]);

  const onCardClick = (id: string) => {
    if (lockBoard) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.isOpen || card.isMatched || flipped.includes(id)) return;
    setCards(prev => prev.map(c => c.id === id ? { ...c, isOpen: true } : c));
    setFlipped(prev => [...prev, id]);
  };

  const reset = () => {
    const numPairs = settings.numPairs || 8;
    const emojis: EmojiItem[] = getAvailableEmojis(numPairs);
    let newCards: Card[] = [];
    emojis.forEach((emoji, i) => {
      newCards.push({ id: `${i}-a`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
      newCards.push({ id: `${i}-b`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
    });
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setCards(newCards);
    setFlipped([]);
    setLockBoard(false);
    setPlayers(settings.players.map(p => ({ ...p })));
    setCurrentPlayer(settings.currentPlayer);
    setWinner(null);
    setIsPopupOpen(false);
    setTimer('00:00');
    setMoves(0);
  };

  return {
    cards,
    players,
    currentPlayer,
    onCardClick,
    winner,
    isPopupOpen,
    reset,
    timer,
    moves,
    pairsFound: cards.filter(c => c.isMatched).length / 2,
    totalPairs: cards.length / 2,
  };
}
