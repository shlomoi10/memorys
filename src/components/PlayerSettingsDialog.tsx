import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box, Typography } from '@mui/material';
import '../PlayerSettingsDialog.css';
import PlayerColorPicker from './PlayerColorPicker';
import './PlayerColorPicker.css';
import CardSettingsSection from './CardSettingsSection';

interface PlayerSettingsDialogProps {
  open: boolean;
  players: { name: string; color: string; score: number }[];
  onChange: (players: { name: string; color: string; score: number }[]) => void;
  onClose: () => void;
  cardOrientation?: 'portrait' | 'landscape';
  onCardOrientationChange?: (value: 'portrait' | 'landscape') => void;
  cardNameMode?: 'default' | 'none';
  onCardNameModeChange?: (mode: 'default' | 'none') => void;
}

const colorOptions = ['#2196f3', '#4caf50', '#ff9800', '#e91e63', '#795548', '#607d8b'];

export default function PlayerSettingsDialog({ open, players, onChange, onClose, cardOrientation = 'portrait', onCardOrientationChange, cardNameMode = 'default', onCardNameModeChange }: PlayerSettingsDialogProps) {
  const [localPlayers, setLocalPlayers] = useState(players);
  const [localOrientation, setLocalOrientation] = useState<'portrait' | 'landscape'>(cardOrientation);
  const [localCardNameMode, setLocalCardNameMode] = useState<'default' | 'none'>(cardNameMode);

  useEffect(() => {
    if (open) {
      setLocalPlayers(players);
      setLocalOrientation(cardOrientation);
      setLocalCardNameMode(cardNameMode);
    }
  }, [players, open, cardOrientation, cardNameMode]);

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
    if (onCardOrientationChange) {
      onCardOrientationChange(localOrientation);
    }
    if (onCardNameModeChange) {
      onCardNameModeChange(localCardNameMode);
    }
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} dir="rtl">
      <DialogTitle className="player-settings-title" sx={{
        fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
        fontWeight: 900,
        fontSize: 26,
        color: '#1976d2',
        textAlign: 'right',
        letterSpacing: 1,
        bgcolor: 'rgba(255,255,255,0.98)',
        borderBottom: '2.5px solid #e3f0ff',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        px: 4,
        pt: 3,
        pb: 2.2,
        boxShadow: '0 2px 16px #1976d211',
      }}>הגדרות המשחק</DialogTitle>
      <DialogContent sx={{
        p: 0,
        bgcolor: 'rgba(255,255,255,0.98)',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        boxShadow: '0 4px 32px #1976d222',
        minWidth: 390,
        maxWidth: 530,
        mx: 'auto',
      }}>
        <Box sx={{ p: 3, pb: 2, borderBottom: '2px solid #e3f0ff' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#1976d2', mb: 2, fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontSize: 20, letterSpacing: 0.5 }}>
            הגדרות שחקנים
          </Typography>
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
        </Box>
        <Box sx={{ p: 3, pt: 2 }}>
          <CardSettingsSection orientation={localOrientation} onChange={setLocalOrientation} cardNameMode={localCardNameMode} onCardNameModeChange={setLocalCardNameMode} />
        </Box>
      </DialogContent>
      <DialogActions className="player-settings-actions" sx={{
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: 'rgba(255,255,255,0.95)',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        px: 4,
        py: 2.2,
        boxShadow: '0 -2px 12px #1976d111',
      }}>
        <Button onClick={handleCancel} color="secondary" variant="outlined" sx={{ fontWeight: 800, borderRadius: 99, fontSize: 17, px: 4 }}>ביטול</Button>
        <Button onClick={handleSave} color="primary" variant="contained" sx={{ fontWeight: 800, borderRadius: 99, fontSize: 17, px: 4 }}>שמור</Button>
      </DialogActions>
    </Dialog>
  );
}
