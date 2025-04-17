import React from 'react';
import { Card } from '../core/BaseMemory';
import { Box, Paper, Typography } from '@mui/material';

interface MemoryCardProps {
  card: Card;
  onClick: (id: string) => void;
  backColor: string;
  disabled?: boolean;
}

export default function MemoryCard({ card, onClick, backColor, disabled }: MemoryCardProps) {
  return (
    <Box sx={{ perspective: 700, width: 80, height: 110, m: 1, display: 'inline-block' }}>
      <Paper
        elevation={card.isOpen ? 6 : 2}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 3,
          boxShadow: card.isOpen ? '0 4px 20px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)',
          background: card.isOpen ? '#fff' : backColor,
          color: card.isOpen ? '#222' : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          cursor: disabled || card.isOpen ? 'default' : 'pointer',
          transition: 'background 0.3s, box-shadow 0.3s',
          position: 'relative',
        }}
        onClick={() => !disabled && !card.isOpen && onClick(card.id)}
      >
        {card.isOpen ? (
          <Box textAlign="center">
            <span>{card.emoji}</span>
            {card.type === 'action' && (
              <Typography variant="caption" color="primary" sx={{ display: 'block', fontWeight: 'bold' }}>
                {card.actionType === 'reveal-pair' ? 'קלף פעולה: גלה זוג' : card.actionType === 'shuffle' ? 'קלף פעולה: ערבב' : ''}
              </Typography>
            )}
          </Box>
        ) : null}
      </Paper>
    </Box>
  );
}
