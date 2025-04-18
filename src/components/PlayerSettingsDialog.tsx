import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box } from '@mui/material';
import '../PlayerSettingsDialog.css';
import PlayerColorPicker from './PlayerColorPicker';
import './PlayerColorPicker.css';

interface PlayerSettingsDialogProps {
  open: boolean;
  players: { name: string; color: string; score: number }[];
  onChange: (players: { name: string; color: string; score: number }[]) => void;
  onClose: () => void;
}

const colorOptions = ['#2196f3', '#4caf50', '#ff9800', '#e91e63', '#795548', '#607d8b'];

export default function PlayerSettingsDialog({ open, players, onChange, onClose }: PlayerSettingsDialogProps) {
  const [localPlayers, setLocalPlayers] = useState(players);

  useEffect(() => {
    setLocalPlayers(players);
  }, [players, open]);

  const handleNameChange = (idx: number, value: string) => {
    const updated = [...localPlayers];
    updated[idx] = { ...updated[idx], name: value };
    setLocalPlayers(updated);
  };
  const handleColorChange = (idx: number, value: string) => {
    const updated = [...localPlayers];
    updated[idx] = { ...updated[idx], color: value };
    setLocalPlayers(updated);
  };
  const handleSave = () => {
    onChange(localPlayers);
    onClose();
  };
  const handleCancel = () => {
    setLocalPlayers(players);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} dir="rtl">
      <DialogTitle className="player-settings-title">הגדרות שחקנים</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} className="player-settings-grid">
          {localPlayers.map((player, idx) => (
            <Grid item xs={12} key={idx} className="player-settings-row">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, direction: 'rtl' }}>
                <label className="player-settings-label" style={{fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontWeight: 800, fontSize: '1.08rem', color: '#1976d2', marginBottom: 2, alignSelf: 'flex-start'}}>
                  {`שם שחקן ${idx + 1}`}
                </label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', flexDirection: 'row' }}>
                  <PlayerColorPicker
                    value={player.color}
                    options={colorOptions}
                    onChange={color => handleColorChange(idx, color)}
                    ariaLabel={`בחר צבע עבור שחקן ${idx + 1}`}
                  />
                  <TextField
                    value={player.name}
                    onChange={e => handleNameChange(idx, e.target.value)}
                    className="player-settings-input"
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 140, flex: 1, fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontWeight: 700, direction: 'rtl' }}
                    inputProps={{ style: { fontWeight: 700, direction: 'rtl', fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontSize: '1.18rem' } }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions className="player-settings-actions">
        <Button onClick={handleCancel} color="secondary" variant="outlined">ביטול</Button>
        <Button onClick={handleSave} color="primary" variant="contained">שמור</Button>
      </DialogActions>
    </Dialog>
  );
}
