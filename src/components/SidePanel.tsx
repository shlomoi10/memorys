import React from 'react';
import { Player } from '../core/BaseMemory';
import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

interface SidePanelProps {
  players: Player[];
  currentPlayer: number;
  gameName: string;
  rules: string;
}

export default function SidePanel({ players, currentPlayer, gameName, rules }: SidePanelProps) {
  return (
    <Box sx={{ width: 300, bgcolor: '#f5f5f5', p: 3, borderRadius: 3, boxShadow: 2, minHeight: 400 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>{gameName}</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>שחקנים:</Typography>
      <List dense>
        {players.map((p, i) => (
          <ListItem key={p.name} sx={{ bgcolor: i === currentPlayer ? '#e3f2fd' : undefined, borderRadius: 2 }}>
            <ListItemText primary={p.name + (i === currentPlayer ? ' (בתור)' : '')} secondary={`ניקוד: ${p.score}`} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>חוקי המשחק:</Typography>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{rules}</Typography>
    </Box>
  );
}
