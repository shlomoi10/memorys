import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Circle } from '@mui/icons-material';

const COLORS = [
  '#2196f3', // כחול
  '#43a047', // ירוק
  '#ffb300', // כתום
  '#e57373', // אדום
  '#ab47bc', // סגול
  '#00897b', // טורקיז
  '#f06292', // ורוד
  '#607d8b', // אפור
];

export interface PlayerSetting {
  name: string;
  color: string;
}

interface Props {
  open: boolean;
  players: PlayerSetting[];
  onClose: () => void;
  onSave: (players: PlayerSetting[]) => void;
}

export default function PlayerSettingsDialog({ open, players, onClose, onSave }: Props) {
  const [localPlayers, setLocalPlayers] = useState<PlayerSetting[]>(players);

  const handleNameChange = (i: number, name: string) => {
    setLocalPlayers(p => p.map((pl, idx) => idx === i ? { ...pl, name } : pl));
  };
  const handleColorChange = (i: number, color: string) => {
    setLocalPlayers(p => p.map((pl, idx) => idx === i ? { ...pl, color } : pl));
  };

  const handleSave = () => {
    onSave(localPlayers);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>הגדרות שחקנים</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          {localPlayers.map((player, i) => (
            <Stack key={i} direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: player.color }}>
                <Circle />
              </Avatar>
              <TextField
                label={`שם שחקן ${i + 1}`}
                value={player.name}
                onChange={e => handleNameChange(i, e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Stack direction="row" spacing={0.5}>
                {COLORS.map(color => (
                  <Button
                    key={color}
                    onClick={() => handleColorChange(i, color)}
                    sx={{ minWidth: 0, width: 28, height: 28, p: 0, borderRadius: '50%', border: color === player.color ? '2px solid #333' : 'none' }}
                  >
                    <span style={{ display: 'block', width: 20, height: 20, borderRadius: '50%', background: color }} />
                  </Button>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">ביטול</Button>
        <Button onClick={handleSave} variant="contained" color="primary">שמור</Button>
      </DialogActions>
    </Dialog>
  );
}
