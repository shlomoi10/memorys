import React from 'react';
import { Card } from '../core/BaseMemory';
import { Grid, Paper } from '@mui/material';

interface ModernBoardProps {
  cards: Card[];
  onCardClick: (cardId: string) => void;
  currentPlayerColor: string;
}

export default function ModernBoard({ cards, onCardClick, currentPlayerColor }: ModernBoardProps) {
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 4, mb: 4 }}>
      {cards.map(card => (
        <Grid item key={card.id}>
          <Paper
            elevation={card.isOpen || card.isMatched ? 6 : 2}
            onClick={() => !card.isOpen && !card.isMatched && onCardClick(card.id)}
            sx={{
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              bgcolor: card.isOpen || card.isMatched ? '#fff' : currentPlayerColor,
              color: card.isOpen || card.isMatched ? '#222' : '#fff',
              border: card.isMatched ? '3px solid #4caf50' : '2px solid #1976d2',
              borderRadius: 2,
              cursor: card.isOpen || card.isMatched ? 'default' : 'pointer',
              boxShadow: card.isOpen || card.isMatched ? '0 4px 20px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)',
              userSelect: 'none',
              transition: 'all 0.2s',
            }}
          >
            {card.isOpen || card.isMatched ? (
              <span>{card.emoji}</span>
            ) : (
              <span role="img" aria-label="back">❓</span>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
