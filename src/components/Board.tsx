import React from 'react';
import { Card } from '../core/BaseMemory';
import MemoryCard from './MemoryCard';

interface BoardProps {
  cards: Card[];
  onCardClick: (cardId: string) => void;
  currentPlayerColor: string;
  boardSize?: number;
}

export default function Board({ cards, onCardClick, currentPlayerColor, boardSize }: BoardProps) {
  // פריסה תמיד מרובעת: מספר עמודות = שורש ריבועי של מספר הקלפים
  let columns = 4;
  if (boardSize && boardSize > 0) {
    columns = boardSize;
  } else if (cards.length > 0) {
    columns = Math.round(Math.sqrt(cards.length));
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 24, justifyContent: 'center', margin: '40px 0' }}>
      {cards.map(card => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={onCardClick}
          backColor={currentPlayerColor}
          disabled={card.isMatched}
        />
      ))}
    </div>
  );
}
