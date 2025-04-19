import { useState, useEffect } from 'react';
import { Card, Player, MemorySettings, EmojiItem } from '../core/BaseMemory';
import { getAvailableEmojis } from '../utils/EmojiHelper';

export function useTripletMemory(settings: MemorySettings) {
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
    // קבע מספר שלישיות לפי גודל הלוח (boardSize)
    let numTriplets = settings.numTriplets;
    if (settings.boardSize) {
      const total = settings.boardSize * settings.boardSize;
      numTriplets = Math.floor(total / 3);
    }
    numTriplets = numTriplets || 6;
    const emojis = getAvailableEmojis(numTriplets);
    let newCards: Card[] = [];
    emojis.forEach((emoji: EmojiItem, i) => {
      newCards.push({ id: `${i}-a`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
      newCards.push({ id: `${i}-b`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
      newCards.push({ id: `${i}-c`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
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
    if (flipped.length === 3) {
      setLockBoard(true);
      setTimeout(() => {
        const [id1, id2, id3] = flipped;
        const c1 = cards.find(c => c.id === id1);
        const c2 = cards.find(c => c.id === id2);
        const c3 = cards.find(c => c.id === id3);
        if (c1 && c2 && c3 && JSON.stringify(c1.emoji) === JSON.stringify(c2.emoji) && JSON.stringify(c2.emoji) === JSON.stringify(c3.emoji)) {
          setCards(prev => prev.map(card =>
            card.id === id1 || card.id === id2 || card.id === id3 ? { ...card, isMatched: true, isOpen: true } : card
          ));
          setPlayers(prev => prev.map((p, i) => i === currentPlayer ? { ...p, score: p.score + 2 } : p));
        } else {
          setCards(prev => prev.map(card =>
            card.id === id1 || card.id === id2 || card.id === id3 ? { ...card, isOpen: false } : card
          ));
          setCurrentPlayer(prev => (prev + 1) % players.length);
        }
        setFlipped([]);
        setLockBoard(false);
        setMoves(m => m + 1);
      }, 900);
    }
  }, [flipped]);

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

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setIsPopupOpen(true);
      const maxScore = Math.max(...players.map(p => p.score));
      setWinner(players.find(p => p.score === maxScore) || null);
    }
  }, [cards]);

  const onCardClick = (id: string) => {
    if (lockBoard) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.isOpen || card.isMatched || flipped.includes(id)) return;
    setCards(prev => prev.map(c => c.id === id ? { ...c, isOpen: true } : c));
    setFlipped(prev => [...prev, id]);
  };

  const reset = () => {
    let numTriplets = settings.numTriplets;
    if (settings.boardSize) {
      const total = settings.boardSize * settings.boardSize;
      numTriplets = Math.floor(total / 3);
    }
    numTriplets = numTriplets || 6;
    const emojis = getAvailableEmojis(numTriplets);
    let newCards: Card[] = [];
    emojis.forEach((emoji: EmojiItem, i) => {
      newCards.push({ id: `${i}-a`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
      newCards.push({ id: `${i}-b`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
      newCards.push({ id: `${i}-c`, emoji: { ...emoji }, type: 'normal', isOpen: false, isMatched: false });
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
    pairsFound: Math.floor(cards.filter(c => c.isMatched).length / 3),
    totalPairs: Math.floor(cards.length / 3),
  };
}
