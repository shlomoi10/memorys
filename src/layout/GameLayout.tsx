import React from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from '../components/Sidebar';

interface GameLayoutProps {
  children: React.ReactNode;
  players: { name: string; color: string; score: number }[];
  currentPlayer: number;
  onSettings: () => void;
}

export default function GameLayout({ children, players, currentPlayer, onSettings }: GameLayoutProps) {
  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <Box display="flex" gap={3}>
        <Sidebar players={players} currentPlayer={currentPlayer} onSettings={onSettings} />
        <Box flexGrow={1}>{children}</Box>
      </Box>
    </Container>
  );
}
