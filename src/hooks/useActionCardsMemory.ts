import { Card, Player, MemorySettings } from '../core/BaseMemory';
import { getAvailableEmojis } from '../utils/EmojiHelper';
import { useState, useEffect } from 'react';

// שכפול מהוק קלאסי - יותאם לכללי "קלפי פעולה" בהמשך
export function useActionCardsMemory(settings: MemorySettings) {
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
  const [shuffleAnim, setShuffleAnim] = useState(false);

  useEffect(() => {
    const numPairs = settings.numPairs || 8;
    setCards(generateCards(numPairs));
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
        if (c1 && c2 && c1.emoji.shortName === c2.emoji.shortName) {
          setCards(prev => prev.map(card =>
            card.id === id1 || card.id === id2 ? { ...card, isMatched: true, isOpen: true } : card
          ));
          setPlayers(prev => prev.map((p, i) => i === currentPlayer ? { ...p, score: p.score + 1 } : p));
        } else {
          setCards(prev => prev.map(card =>
            card.id === id1 || card.id === id2 ? { ...card, isOpen: false } : card
          ));
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
      const maxScore = Math.max(...players.map(p => p.score));
      setWinner(players.find(p => p.score === maxScore) || null);
    }
  }, [cards, players]);

  // מגבלת זוגות רגילים לפי רמת קושי
  function getLimitedNumPairs(numPairs?: number) {
    if (!numPairs || numPairs <= 7) return 7; // קל
    if (numPairs <= 17) return 17; // בינוני
    return 31; // קשה
  }

  // זוגות שנמצאו וסך-הכל זוגות (בשביל הפאנל)
  const pairsFound = cards.filter(c => c.isMatched).length / 2;
  const totalPairs = cards.length / 2;

  const onCardClick = (id: string) => {
    if (lockBoard) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.isMatched || card.isOpen) return;
    if (card.type === 'action') {
      // כאשר קלף פעולה נלחץ - הוא נפתח ונשאר פתוח
      setCards(prev => prev.map(c => c.id === id ? { ...c, isOpen: true, isMatched: true } : c));
      // עין: גלה זוג תואם לשנייה
      if (card.actionType === 'reveal-pair') {
        const coveredPairs = cards.filter(c => !c.isMatched && !c.isOpen && c.type === 'normal');
        let found = false;
        for (let i = 0; i < coveredPairs.length; i++) {
          for (let j = i + 1; j < coveredPairs.length; j++) {
            if (coveredPairs[i].emoji.shortName === coveredPairs[j].emoji.shortName) {
              setCards(prev => prev.map(c =>
                c.id === coveredPairs[i].id || c.id === coveredPairs[j].id ? { ...c, isOpen: true } : c
              ));
              setTimeout(() => {
                setCards(prev => prev.map(c =>
                  c.id === coveredPairs[i].id || c.id === coveredPairs[j].id ? { ...c, isOpen: false } : c
                ));
              }, 1000);
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }
      // ערבוב: ממקם מחדש את הקלפים המכוסים בלבד במקומות אקראיים בלוח
      else if (card.actionType === 'shuffle') {
        setShuffleAnim(true);
        setTimeout(() => {
          const covered = cards.filter(c => !c.isMatched && !c.isOpen && c.type === 'normal');
          const coveredIds = covered.map(c => c.id);
          const shuffled = [...coveredIds];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          setCards(prev => {
            // שומרים את כל הקלפים שאינם מכוסים במקום
            const coveredCards = prev.filter(c => !c.isMatched && !c.isOpen && c.type === 'normal');
            const otherCards = prev.filter(c => c.isMatched || c.isOpen || c.type === 'action');
            // ממקמים את הקלפים המכוסים החדשים במקומות אקראיים
            const shuffledCards = shuffled.map(id => coveredCards.find(c => c.id === id)!);
            // שומרים את הסדר: ממזגים את הקלפים האחרים עם הקלפים המעורבבים במקומות הנכונים
            let result: Card[] = [];
            let coveredIdx = 0;
            for (let i = 0; i < prev.length; i++) {
              if (!prev[i].isMatched && !prev[i].isOpen && prev[i].type === 'normal') {
                result.push(shuffledCards[coveredIdx++]);
              } else {
                result.push(prev[i]);
              }
            }
            return result;
          });
          setTimeout(() => setShuffleAnim(false), 900);
        }, 350);
      }
      // קלף פעולה לא מסיים תור ולא מזכה בנקודה
      return;
    }
    // התנהגות רגילה לזוגות
    if (flipped.length === 0) {
      setCards(prev => prev.map(c => c.id === id ? { ...c, isOpen: true } : c));
      setFlipped([id]);
    } else if (flipped.length === 1) {
      setCards(prev => prev.map(c => c.id === id ? { ...c, isOpen: true } : c));
      setFlipped([flipped[0], id]);
    }
  };

  // Reset function for useActionCardsMemory
  function reset(settings: MemorySettings, setCards: any, setFlipped: any, setLockBoard: any, setPlayers: any, setCurrentPlayer: any, setWinner: any, setIsPopupOpen: any, setMoves: any, setStartTime: any, setTimer: any) {
    const numPairs = settings.numPairs || 8;
    setCards(generateCards(numPairs));
    setFlipped([]);
    setLockBoard(false);
    setPlayers(settings.players.map(p => ({ ...p, score: 0 })));
    setCurrentPlayer(settings.currentPlayer);
    setWinner(null);
    setIsPopupOpen(false);
    setMoves(0);
    setStartTime(null);
    setTimer('00:00');
  }

  // עדכון פונקציית יצירת קלפים
  function generateCards(numPairs: number) {
    const limitedPairs = getLimitedNumPairs(numPairs);
    const emojis = getAvailableEmojis(limitedPairs);
    let newCards: Card[] = [];
    for (let i = 0; i < emojis.length; i++) {
      newCards.push({ id: `${i}-a`, emoji: emojis[i], type: 'normal', isOpen: false, isMatched: false });
      newCards.push({ id: `${i}-b`, emoji: emojis[i], type: 'normal', isOpen: false, isMatched: false });
    }
    // הוספת קלפי פעולה
    newCards.push({ ...ACTION_CARDS[0] });
    newCards.push({ ...ACTION_CARDS[1] });
    // ערבוב
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    return newCards;
  }

  return {
    cards,
    flipped,
    lockBoard,
    players,
    currentPlayer,
    winner,
    isPopupOpen,
    moves,
    timer,
    pairsFound,
    totalPairs,
    onCardClick,
    shuffleAnim,
    reset: () => reset(settings, setCards, setFlipped, setLockBoard, setPlayers, setCurrentPlayer, setWinner, setIsPopupOpen, setMoves, setStartTime, setTimer),
    setPlayers,
    setWinner,
    setIsPopupOpen,
    setCurrentPlayer,
    setCards,
    setFlipped,
    setLockBoard,
    setMoves,
    setTimer,
    setStartTime
  };
}

// הרחבת טיפוס Card עם shuffleId (אופציונלי) לצורך ערבוב
interface ShufflableCard extends Card {
  shuffleId?: string;
}

// קלפי פעולה - אימוג'י עין וערבוב
const ACTION_CARDS = [
  {
    id: 'action-reveal-pair',
    emoji: { shortName: 'eye', name: 'עין', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f441.svg' },
    type: 'action' as const,
    actionType: 'reveal-pair' as const,
    isOpen: false,
    isMatched: false,
  },
  {
    id: 'action-shuffle',
    emoji: { shortName: 'shuffle', name: 'ערבוב', src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f500.svg' },
    type: 'action' as const,
    actionType: 'shuffle' as const,
    isOpen: false,
    isMatched: false,
  },
];
