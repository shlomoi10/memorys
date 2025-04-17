import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface WinnerDialogProps {
  open: boolean;
  winner: string;
  onClose: () => void;
}

export default function WinnerDialog({ open, winner, onClose }: WinnerDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>סיום המשחק</DialogTitle>
      <DialogContent>
        <Typography variant="h5" align="center">המנצח: {winner}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">סגור</Button>
      </DialogActions>
    </Dialog>
  );
}
