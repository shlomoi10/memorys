import React from 'react';
import { Card } from '../core/BaseMemory';

interface BoardProps {
  cards: Card[];
  onCardClick: (cardId: string) => void;
  currentPlayerColor: string;
}

export default function Board({ cards, onCardClick, currentPlayerColor }: BoardProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 80px)', gap: 16, justifyContent: 'center', margin: '40px 0' }}>
      {cards.map(card => (
        <div
          key={card.id}
          onClick={() => !card.isOpen && !card.isMatched && onCardClick(card.id)}
          style={{
            width: 80,
            height: 80,
            background: card.isOpen || card.isMatched ? '#fff' : currentPlayerColor,
            color: card.isOpen || card.isMatched ? '#000' : 'transparent',
            border: card.isMatched ? '3px solid #4caf50' : '2px solid #1976d2',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            cursor: card.isOpen || card.isMatched ? 'default' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: card.isOpen || card.isMatched ? '0 2px 8px #bbb' : 'none',
            userSelect: 'none',
          }}
        >
          {card.isOpen || card.isMatched ? card.emoji : '❓'}
        </div>
      ))}
    </div>
  );
}
