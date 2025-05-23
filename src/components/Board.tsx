import React from 'react';
import { Card } from '../core/BaseMemory';
import MemoryCard from './MemoryCard';
import './Board.css';

interface BoardProps {
  cards: Card[];
  onCardClick: (cardId: string) => void;
  currentPlayerColor: string;
  boardSize?: number;
  cardOrientation?: 'portrait' | 'landscape';
  cardNameMode?: 'default' | 'none';
  spacingMode?: 'default' | 'compact';
  cardSizeMode?: 'default' | 'small';
}

export default function Board({ cards, onCardClick, currentPlayerColor, boardSize, cardOrientation = 'portrait', cardNameMode = 'default', spacingMode = 'default', cardSizeMode = 'default' }: BoardProps) {
  // פריסה תמיד מרובעת: מספר עמודות = שורש ריבועי של מספר הקלפים
  let columns = 4;
  if (boardSize && boardSize > 0) {
    columns = boardSize;
  } else if (cards.length > 0) {
    columns = Math.round(Math.sqrt(cards.length));
  }

  return (
    <div className={`board board-size-${boardSize} orientation-${cardOrientation} spacing-${spacingMode} size-${cardSizeMode}`} style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, justifyContent: 'center', margin: '40px 0' }}>
      {cards.map(card => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={onCardClick}
          backColor={currentPlayerColor}
          disabled={card.isMatched}
          orientation={cardOrientation}
          showName={cardNameMode === 'default'}
          cardSizeMode={cardSizeMode}
        />
      ))}
    </div>
  );
}
