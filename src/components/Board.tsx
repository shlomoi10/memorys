import React from 'react';
import { Card } from '../core/BaseMemory';
import MemoryCard from './MemoryCard';

interface BoardProps {
  cards: Card[];
  onCardClick: (cardId: string) => void;
  currentPlayerColor: string;
}

export default function Board({ cards, onCardClick, currentPlayerColor }: BoardProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, justifyContent: 'center', margin: '40px 0' }}>
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
