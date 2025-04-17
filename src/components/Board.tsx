import React from 'react';
import MemoryCard from './MemoryCard';
import { Card } from '../core/BaseMemory';

interface BoardProps {
  cards: Card[];
  onCardClick: (id: string) => void;
  currentPlayerColor: string;
  disabled?: boolean;
}

export default function Board({ cards, onCardClick, currentPlayerColor, disabled }: BoardProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 600, margin: '0 auto' }}>
      {cards.map(card => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={onCardClick}
          backColor={currentPlayerColor}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
