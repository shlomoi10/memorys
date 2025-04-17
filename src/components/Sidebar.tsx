import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import SettingsButton from './SettingsButton';

interface SidebarProps {
  players: { name: string; color: string; score: number }[];
  currentPlayer: number;
  onSettings: () => void;
}

export default function Sidebar({ players, currentPlayer, onSettings }: SidebarProps) {
  return (
    <Box sx={{ width: 220, bgcolor: '#f6fafd', p: 2, borderRadius: 3, boxShadow: 1, minHeight: 360 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">שחקנים</Typography>
        <SettingsButton onClick={onSettings} />
      </Box>
      <Divider sx={{ my: 1 }} />
      {players.map((player, idx) => (
        <Box key={idx} display="flex" alignItems="center" mb={1}>
          <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: player.color, mr: 1, border: idx === currentPlayer ? '2px solid #222' : '1px solid #bbb' }} />
          <Typography variant="body1" sx={{ fontWeight: idx === currentPlayer ? 'bold' : 'normal' }}>{player.name}</Typography>
          <Box flexGrow={1} />
          <Typography variant="body2" color="text.secondary">{player.score}</Typography>
        </Box>
      ))}
    </Box>
  );
}
