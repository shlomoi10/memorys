import React, { useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton, Paper, TextField, Fade, Divider, Avatar, InputAdornment, IconButton, Popover, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PaletteIcon from '@mui/icons-material/Palette';
import MemoryIcon from '@mui/icons-material/Memory';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Player } from '../core/BaseMemory';

const BOARD_SIZES = [
  { key: '4x4', label: 'קל (4x4)', value: 4 },
  { key: '6x6', label: 'בינוני (6x6)', value: 6 },
  { key: '8x8', label: 'קשה (8x8)', value: 8 },
];

const PLAYER_COLORS = [
  '#1976d2', '#4caf50', '#f44336', '#ff9800', '#9c27b0', '#009688', '#e91e63', '#3f51b5', '#ffc107', '#795548'
];

interface StartScreenProps {
  gameVariants: { key: string; name: string }[];
  defaultPlayers: Player[];
  onStart: (params: { selectedGame: string; boardSize: number; players: Player[] }) => void;
  onPlayersChange?: (players: Player[]) => void;
}

export default function StartScreen({
  gameVariants,
  onStart,
  defaultPlayers,
  onPlayersChange,
}: StartScreenProps) {
  const [selectedGame, setSelectedGame] = useState<string>(gameVariants[0].key);
  const [boardSize, setBoardSize] = useState<number>(4);
  const [players, setPlayers] = useState<Player[]>(defaultPlayers.slice(0, 2));
  const [editing, setEditing] = useState<number|null>(null);
  const [colorAnchor, setColorAnchor] = useState<null | HTMLElement>(null);
  const [colorIdx, setColorIdx] = useState<number|null>(null);

  const handlePlayerNameChange = (idx: number, value: string) => {
    setPlayers(players => {
      const updated = players.map((p, i) => i === idx ? { ...p, name: value } : p);
      if (onPlayersChange) onPlayersChange(updated);
      return updated;
    });
  };
  const handleColorClick = (event: React.MouseEvent<HTMLElement>, idx: number) => {
    setColorAnchor(event.currentTarget);
    setColorIdx(idx);
  };
  const handleColorSelect = (color: string) => {
    if (colorIdx !== null) {
      setPlayers(players => {
        const updated = players.map((p, i) => i === colorIdx ? { ...p, color } : p);
        if (onPlayersChange) onPlayersChange(updated);
        return updated;
      });
    }
    setColorAnchor(null);
    setColorIdx(null);
  };

  // בעת התחלת משחק, כל הסטטיסטיקות יתאפסו כי onStart תמיד יוצר מערך שחקנים חדש עם score=0
  const handleStart = () => {
    // אפס ניקוד לכל שחקן
    const resetPlayers = players.map(p => ({ ...p, score: 0 }));
    onStart({ selectedGame, boardSize, players: resetPlayers });
  };

  return (
    <Fade in timeout={800}>
      <Box dir="rtl" sx={{ minHeight: '100vh', bgcolor: 'radial-gradient(circle at 70% 30%, #1976d2 0%, #e3f0ff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, direction: 'rtl', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>
        <Paper elevation={20} sx={{ p: 5, minWidth: 440, borderRadius: 7, boxShadow: '0 8px 48px 0 #1976d299', mb: 4, mt: 8, position: 'relative', overflow: 'visible', bgcolor: 'rgba(255,255,255,0.98)', direction: 'rtl', textAlign: 'right', transition: 'box-shadow 0.3s', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>
            <Avatar sx={{ bgcolor: '#1976d2', width: 72, height: 72, mr: 2, boxShadow: '0 4px 24px #1976d244', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>
              <MemoryIcon sx={{ fontSize: 44 }} />
            </Avatar>
            <Box>
              <Typography variant="h2" sx={{ color: '#1976d2', fontWeight: 900, letterSpacing: 2, mb: 0.5, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', textShadow: '0 2px 16px #1976d255' }}>MEMORY PRO</Typography>
              <Typography variant="subtitle1" sx={{ color: '#1565c0', fontWeight: 600, letterSpacing: 1, fontSize: 22, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>משחק זיכרון עוצר נשימה</Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 3, bgcolor: '#1976d2', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }} />
          <Typography variant="h5" sx={{ mb: 2, color: '#222', fontWeight: 800, letterSpacing: 0.5, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>בחר סוג משחק:</Typography>
          <ToggleButtonGroup
            value={selectedGame}
            exclusive
            onChange={(_, val) => {
              // לא לאפשר לחיצה על משחקים לא זמינים
              if (val === 'classic' || val === 'cumulative') setSelectedGame(val);
            }}
            sx={{ mb: 3, display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: 99, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', boxShadow: '0 2px 12px #1976d244' }}
          >
            {gameVariants.map((g: { key: string; name: string }, idx) => {
              const isDisabled = g.key !== 'classic' && g.key !== 'cumulative';
              return (
                <ToggleButton
                  key={g.key}
                  value={g.key}
                  disabled={isDisabled}
                  sx={{
                    fontSize: 20,
                    px: 3,
                    borderRadius:
                      idx === 0
                        ? '0 99px 99px 0'
                        : idx === gameVariants.length - 1
                        ? '99px 0 0 99px'
                        : '0',
                    boxShadow: 'none',
                    bgcolor: selectedGame === g.key ? 'linear-gradient(90deg,#1976d2 60%,#64b5f6 100%)' : '#fff',
                    color: selectedGame === g.key ? '#fff' : '#1565c0',
                    fontWeight: selectedGame === g.key ? 900 : 600,
                    transition: 'all 0.2s',
                    border: 'none',
                    fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important',
                    textTransform: 'none',
                    minWidth: 120,
                    boxSizing: 'border-box',
                    zIndex: selectedGame === g.key ? 2 : 1,
                    opacity: isDisabled ? 0.55 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    position: 'relative',
                  }}
                >
                  <SportsEsportsIcon sx={{ mr: 1, fontSize: 26 }} />
                  {g.name}
                  {/* טול־טיפ "בבנייה" */}
                  {isDisabled && (
                    <Box sx={{
                      position: 'absolute',
                      top: 5,
                      left: 0,
                      right: 0,
                      mx: 'auto',
                      width: '80%',
                      bgcolor: '#fffbe7',
                      color: '#e65100',
                      borderRadius: 2,
                      fontWeight: 800,
                      fontSize: 15,
                      py: 0.3,
                      textAlign: 'center',
                      boxShadow: '0 1.5px 6px #ff980022',
                      border: '1.5px solid #ffe0b2',
                      pointerEvents: 'none',
                      letterSpacing: 0.5,
                    }}>
                      בבנייה
                    </Box>
                  )}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
          <Typography variant="h5" sx={{ mb: 1, color: '#222', fontWeight: 800, letterSpacing: 0.5, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>בחר רמת קושי:</Typography>
          <ToggleButtonGroup
            value={boardSize}
            exclusive
            onChange={(_, val) => val && setBoardSize(val)}
            sx={{ mb: 3, display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: 99, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', boxShadow: '0 2px 12px #1976d244' }}
          >
            {BOARD_SIZES.map((size, idx) => (
              <ToggleButton
                key={size.key}
                value={size.value}
                sx={{
                  fontSize: 18,
                  px: 2.5,
                  borderRadius:
                    idx === 0
                      ? '0 99px 99px 0'
                      : idx === BOARD_SIZES.length - 1
                      ? '99px 0 0 99px'
                      : '0',
                  boxShadow: 'none',
                  bgcolor: boardSize === size.value ? 'linear-gradient(90deg,#1976d2 60%,#64b5f6 100%)' : '#fff',
                  color: boardSize === size.value ? '#fff' : '#1565c0',
                  fontWeight: boardSize === size.value ? 900 : 600,
                  border: 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important',
                  textTransform: 'none',
                  minWidth: 100,
                  boxSizing: 'border-box',
                  zIndex: boardSize === size.value ? 2 : 1,
                }}
              >
                <EmojiEventsIcon sx={{ mr: 1, fontSize: 22 }} />
                {size.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Typography variant="h5" sx={{ mb: 1, color: '#222', fontWeight: 800, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>שחקנים:</Typography>
          <Box sx={{ mb: 2, display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>
            {players.map((p: Player, idx: number) => (
              <Paper key={idx} elevation={3} sx={{ p: 2, minWidth: 140, borderRadius: 3, bgcolor: '#e3f2fd', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px #1976d244', border: `2px solid ${p.color}`, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>
                <IconButton onClick={e => handleColorClick(e, idx)} sx={{ bgcolor: p.color, width: 44, height: 44, mb: 1, fontWeight: 900, fontSize: 22, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', color: '#fff', '&:hover': { bgcolor: p.color } }}>
                  <PaletteIcon />
                </IconButton>
                {editing === idx ? (
                  <TextField
                    value={p.name}
                    onChange={e => handlePlayerNameChange(idx, e.target.value)}
                    onBlur={() => setEditing(null)}
                    onKeyDown={e => { if (e.key === 'Enter') setEditing(null); }}
                    size="small"
                    autoFocus
                    sx={{ fontWeight: 700, color: p.color, mb: 0.5, fontSize: 18, textAlign: 'center', bgcolor: '#fff', borderRadius: 1, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}
                    inputProps={{ style: { textAlign: 'center', fontWeight: 700, fontFamily: 'Heebo, Varela Round, Arial, sans-serif' } }}
                  />
                ) : (
                  <Typography
                    sx={{ fontWeight: 700, color: p.color, mb: 0.5, fontSize: 18, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', cursor: 'pointer', transition: 'color 0.2s' }}
                    onClick={() => setEditing(idx)}
                  >
                    {p.name} <IconButton size="small" sx={{ color: p.color, ml: 1, verticalAlign: 'middle', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}><EditIcon fontSize="small" /></IconButton>
                  </Typography>
                )}
              </Paper>
            ))}
            <Popover
              open={!!colorAnchor}
              anchorEl={colorAnchor}
              onClose={() => setColorAnchor(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              PaperProps={{ sx: { p: 2, borderRadius: 3 } }}
            >
              <Stack direction="row" spacing={1}>
                {PLAYER_COLORS.map((color, i) => (
                  <IconButton key={color} onClick={() => handleColorSelect(color)} sx={{ bgcolor: color, width: 32, height: 32, border: '2px solid #fff', boxShadow: '0 2px 8px #0002', '&:hover': { border: '2px solid #1976d2', opacity: 0.9 }, transition: 'all 0.15s' }}>
                  </IconButton>
                ))}
              </Stack>
            </Popover>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 3, fontSize: 22, fontWeight: 800, borderRadius: 99, boxShadow: '0 2px 12px #1976d255', py: 1.5, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}
            onClick={handleStart}
          >
            התחל משחק
          </Button>
        </Paper>
        <Typography variant="body2" sx={{ color: '#b0b0b0', mt: 2, mb: 2, letterSpacing: 1, fontSize: 16, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>
          פיתוח: Cascade AI | עיצוב: מותאם אישית עבורך
        </Typography>
      </Box>
    </Fade>
  );
}
