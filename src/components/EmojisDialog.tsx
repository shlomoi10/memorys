import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Card } from '../core/BaseMemory';

interface EmojisDialogProps {
  open: boolean;
  onClose: () => void;
  cards: Card[];
}

export default function EmojisDialog({ open, onClose, cards }: EmojisDialogProps) {
  // הפוך את רשימת האימוג'ים לייחודית
  const uniqueEmojis = Array.from(new Map(cards.map(card => [card.emoji.shortName, card.emoji])).values());
  // מצא אילו קלפים נמצאו (isMatched=true)
  const foundShortNames = new Set(cards.filter(card => card.isMatched).map(card => card.emoji.shortName));

  return (
    <Dialog open={open} onClose={onClose} dir="rtl" maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontWeight: 900, fontSize: 24, color: '#1976d2', textAlign: 'right', letterSpacing: 1 }}>קלפים משתתפים</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.98)', py: 3, fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontWeight: 500, fontSize: 20 }}>
        {uniqueEmojis.map(emoji => (
          <Tooltip key={emoji.shortName} title={emoji.name} arrow
            componentsProps={{ tooltip: { sx: { fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontWeight: 700, fontSize: 17 } } }}
          >
            <Box sx={{
              width: 58,
              height: 58,
              borderRadius: 3,
              bgcolor: foundShortNames.has(emoji.shortName) ? '#e3f0ff' : '#fff',
              border: foundShortNames.has(emoji.shortName)
                ? '3px solid #4caf50'
                : '2px solid #e3f0ff',
              boxShadow: foundShortNames.has(emoji.shortName)
                ? '0 0 16px #4caf5055'
                : '0 2px 8px #1976d211',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.3s',
              fontSize: 34,
              m: 0.5,
              fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
            }}>
              <img src={emoji.src} alt={emoji.name} style={{ width: 36, height: 36 }} />
              {foundShortNames.has(emoji.shortName) && (
                <CheckCircleIcon sx={{ position: 'absolute', top: -8, left: -8, color: '#4caf50', fontSize: 28, filter: 'drop-shadow(0 2px 8px #4caf5066)' }} />
              )}
            </Box>
          </Tooltip>
        ))}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
        <Button onClick={onClose} color="primary" variant="contained" sx={{ fontWeight: 800, borderRadius: 99, fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontSize: 18, px: 4 }}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
}
