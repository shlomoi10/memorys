import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, InputLabel, Box } from '@mui/material';

interface PlayerSettingsDialogProps {
  open: boolean;
  players: { name: string; color: string; score: number }[];
  onChange: (players: { name: string; color: string; score: number }[]) => void;
  onClose: () => void;
}

const colorOptions = ['#2196f3', '#4caf50', '#ff9800', '#e91e63', '#795548', '#607d8b'];

export default function PlayerSettingsDialog({ open, players, onChange, onClose }: PlayerSettingsDialogProps) {
  const handleNameChange = (idx: number, value: string) => {
    const updated = [...players];
    updated[idx].name = value;
    onChange(updated);
  };
  const handleColorChange = (idx: number, value: string) => {
    const updated = [...players];
    updated[idx].color = value;
    onChange(updated);
  };
  const handleScoreChange = (idx: number, value: number) => {
    const updated = [...players];
    updated[idx].score = value;
    onChange(updated);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>הגדרות שחקנים</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {players.map((player, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={6}>
                <TextField label={`שם שחקן ${idx + 1}`} value={player.name} onChange={e => handleNameChange(idx, e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>צבע שחקן</InputLabel>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {colorOptions.map(color => (
                    <Box
                      key={color}
                      onClick={() => handleColorChange(idx, color)}
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: color,
                        border: player.color === color ? '3px solid #000' : '2px solid #fff',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <TextField label={`ניקוד שחקן ${idx + 1}`} value={player.score} onChange={e => handleScoreChange(idx, parseInt(e.target.value))} fullWidth type="number" />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
}
