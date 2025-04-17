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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{gameName} - מידע</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: 'pre-line' }}>{rules}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">סגור</Button>
      </DialogActions>
    </Dialog>
  );
}
