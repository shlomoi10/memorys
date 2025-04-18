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
    <Box sx={{
      perspective: 900,
      width: 110,
      height: 150,
      m: 1.2,
      display: 'inline-block',
      transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)',
      '&:hover': !disabled && !card.isOpen ? { transform: 'scale(1.07) rotateZ(-2deg)' } : {},
    }}>
      <Paper
        elevation={card.isOpen ? 12 : 3}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 5,
          boxShadow: card.isOpen ? '0 8px 32px rgba(25,118,210,0.18)' : '0 2px 12px rgba(25,118,210,0.10)',
          background: card.isOpen ? 'linear-gradient(135deg, #f8fafc 60%, #e3eafc 100%)' : `linear-gradient(135deg, ${backColor} 70%, #b6c9ff 120%)`,
          color: card.isOpen ? '#222' : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 44,
          cursor: disabled || card.isOpen ? 'default' : 'pointer',
          transition: 'background 0.35s, box-shadow 0.35s',
          position: 'relative',
          overflow: 'hidden',
          border: card.isOpen ? '2.5px solid #1976d2' : '2px solid #e3eafc',
        }}
        onClick={() => !disabled && !card.isOpen && onClick(card.id)}
      >
        {card.isOpen ? (
          <Box textAlign="center" sx={{ width: '100%' }}>
            {/* אימוג'י SVG */}
            {card.emoji.src && (
              <Box sx={{
                width: 56, height: 56, mx: 'auto', mb: 0.5,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e3eafc 60%, #fff 100%)',
                boxShadow: '0 2px 10px #1976d222',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src={card.emoji.src} alt={card.emoji.shortName} style={{ width: 44, height: 44, filter: 'drop-shadow(0 1.5px 2px #1976d233)' }} />
              </Box>
            )}
            {/* שם האימוג'י */}
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 800, color: '#1976d2', fontSize: 16, mt: 1, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', letterSpacing: 0.5 }}>
              {card.emoji.name}
            </Typography>
            {card.type === 'action' && (
              <Typography variant="caption" color="primary" sx={{ display: 'block', fontWeight: 700, fontSize: 13, mt: 0.5 }}>
                {card.actionType === 'reveal-pair' ? 'קלף פעולה: גלה זוג' : card.actionType === 'shuffle' ? 'קלף פעולה: ערבב' : ''}
              </Typography>
            )}
          </Box>
        ) : (
          // גב קלף: עיצוב מודרני עם אלמנט דינאמי
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Box sx={{
              width: 38, height: 38, borderRadius: '50%',
              bgcolor: 'rgba(25,118,210,0.09)',
              boxShadow: '0 2px 12px #1976d222',
              border: '2.5px solid #1976d2',
              position: 'absolute',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              animation: 'spin 2.7s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
              },
              opacity: 0.18,
            }} />
            <Box sx={{
              width: 18, height: 18, borderRadius: '50%',
              bgcolor: '#1976d2',
              opacity: 0.11,
              position: 'absolute',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            }} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
