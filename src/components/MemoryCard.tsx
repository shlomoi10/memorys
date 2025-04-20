import React from 'react';
import { Card } from '../core/BaseMemory';
import { Box, Paper, Typography } from '@mui/material';

interface MemoryCardProps {
  card: Card;
  onClick: (id: string) => void;
  backColor: string;
  disabled?: boolean;
  orientation?: 'portrait' | 'landscape';
  showName?: boolean;
  cardSizeMode?: 'default' | 'small';
}

export default function MemoryCard({ card, onClick, backColor, disabled, orientation = 'portrait', showName = true, cardSizeMode = 'default' }: MemoryCardProps) {
  const rotate = orientation === 'landscape';
  // רספונסיבי: חישוב גודל דינמי
  const vw = Math.max(window.innerWidth, 320);
  // סדר: קודם המרווח מגיע למינימום, ואז הקלף מתחיל להתקטן
  let width, height, emojiSize, nameFontSize;
  const baseWidth = rotate ? 150 : 110;
  const baseHeight = rotate ? 110 : 150;
  const minWidth = rotate ? 70 : 54;
  const minHeight = rotate ? 54 : 70;
  const maxWidth = baseWidth;
  const maxHeight = baseHeight;

  // שלבים: עד 650px - המרווח במינימום, אחרי זה הקלף מתחיל להתקטן
  if (vw > 650) {
    width = Math.round(Math.max(minWidth, Math.min(maxWidth, vw * (rotate ? 0.13 : 0.095))));
    height = Math.round(Math.max(minHeight, Math.min(maxHeight, vw * (rotate ? 0.095 : 0.13))));
  } else {
    // מרווח כבר במינימום, כעת הקלף מתכווץ עד min
    const ratio = Math.max(0.7, vw / 650); // 1 ב-650px ומעלה, יורד עד 0.7 ב-~450px
    width = Math.round(maxWidth * ratio);
    height = Math.round(maxHeight * ratio);
    if (width < minWidth) width = minWidth;
    if (height < minHeight) height = minHeight;
  }
  // שינוי: גודל אימוג'י ותגית תלוי בגודל הקלף
  if (cardSizeMode === 'small') {
    emojiSize = Math.round(Math.max(22, Math.min(44, width * 0.32)));
    nameFontSize = 13;
  } else {
    emojiSize = Math.round(Math.max(36, Math.min(64, width * 0.48)));
    nameFontSize = 22;
  }
  if (!showName) {
    if (rotate) {
      width = Math.round(width * 0.77);
      if (cardSizeMode === 'small') width = Math.round(width * 0.88);
    } else {
      height = Math.round(height * 0.77);
      if (cardSizeMode === 'small') height = Math.round(height * 0.88);
    }
  }
  return (
    <Box sx={{
      perspective: 900,
      width,
      height,
      m: 1.2,
      display: 'inline-block',
      transition: 'width 0.35s, height 0.35s',
      '&:hover': !disabled && !card.isOpen ? { transform: 'scale(1.07) rotateZ(-2deg)' } : {},
    }}>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper
          elevation={card.isOpen ? 12 : 3}
          sx={{
            width,
            height,
            borderRadius: 5,
            boxShadow: card.isOpen ? '0 8px 32px rgba(25,118,210,0.18)' : '0 2px 12px rgba(25,118,210,0.10)',
            background: card.isOpen ? 'linear-gradient(135deg, #f8fafc 60%, #e3eafc 100%)' : `linear-gradient(135deg, ${backColor} 70%, #b6c9ff 120%)`,
            color: card.isOpen ? '#222' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: cardSizeMode === 'small' ? 28 : 44,
            cursor: disabled || card.isOpen ? 'default' : 'pointer',
            transition: 'background 0.35s, box-shadow 0.35s, width 0.35s, height 0.35s',
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
                  width: emojiSize, height: emojiSize, mx: 'auto', mb: 0.5,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e3eafc 60%, #fff 100%)',
                  boxShadow: '0 2px 10px #1976d222',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={card.emoji.src} alt={card.emoji.shortName} style={{ width: emojiSize - 12, height: emojiSize - 12, filter: 'drop-shadow(0 1.5px 2px #1976d233)' }} />
                </Box>
              )}
              {/* שם האימוג'י */}
              {showName && (
                <span style={{
                  display: 'block',
                  fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
                  fontWeight: 700,
                  fontSize: nameFontSize,
                  color: '#1976d2',
                  margin: 0,
                  marginTop: 3,
                  letterSpacing: 0.3,
                  direction: 'rtl',
                  textAlign: 'center',
                }}>
                  {card.emoji.name || card.emoji.shortName}
                </span>
              )}
              {/* ניקוד זוגי בקלף - יופיע רק אם יש pairScore */}
              {typeof card.pairScore === 'number' && (
                <Box sx={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  mt: 0.5,
                }}>
                  <Box sx={{
                    bgcolor: '#fff',
                    color: '#1976d2',
                    px: 1.1,
                    py: 0.2,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: cardSizeMode === 'small' ? 13 : 17,
                    boxShadow: '0 1.5px 6px #1976d222',
                    border: '1.5px solid #b6c9ff',
                    minWidth: 30,
                    textAlign: 'center',
                  }}>
                    {card.pairScore}
                  </Box>
                </Box>
              )}
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
    </Box>
  );
}
