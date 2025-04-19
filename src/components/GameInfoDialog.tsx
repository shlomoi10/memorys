import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface GameInfoDialogProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  rules: string;
}

export default function GameInfoDialog({ open, onClose, gameName, rules }: GameInfoDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle
        sx={{
          fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
          fontWeight: 900,
          fontSize: 26,
          color: '#1976d2',
          textAlign: 'right',
          letterSpacing: 1,
          bgcolor: 'rgba(255,255,255,0.98)',
          borderBottom: '2px solid #e3f0ff',
        }}
      >
        {gameName} - מידע
      </DialogTitle>
      <DialogContent
        sx={{
          bgcolor: 'rgba(255,255,255,0.98)',
          borderRadius: 4,
          fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
          fontWeight: 500,
          color: '#222',
          textAlign: 'right',
          fontSize: 20,
          px: 3,
          py: 2,
          direction: 'rtl',
        }}
      >
        <DialogContentText sx={{ whiteSpace: 'pre-line', fontFamily: 'inherit', color: '#1976d2', fontWeight: 700, fontSize: 19, textAlign: 'right', direction: 'rtl' }}>{rules}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
        <Button onClick={onClose} color="primary" variant="contained" sx={{ fontWeight: 800, borderRadius: 99, fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontSize: 18, px: 4 }}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
}
