import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardSizeSelector from './CardSizeSelector';

interface GameSidebarProps {
  currentPlayer: string;
  timer: string;
  cardSize: number;
  onCardSizeChange: (size: number) => void;
}

export default function GameSidebar({ currentPlayer, timer, cardSize, onCardSizeChange }: GameSidebarProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700} align="center">
        לוח בקרה
      </Typography>
      <Divider />
      <Typography variant="subtitle1" align="center" color="primary">
        תור: {currentPlayer}
      </Typography>
      <Typography variant="subtitle2" align="center" color="secondary">
        זמן: {timer}
      </Typography>
      <Divider />
      <CardSizeSelector value={cardSize} onChange={onCardSizeChange} />
      {/* כאן יתווספו עוד הגדרות/סטטיסטיקות בהמשך */}
    </Stack>
  );
}
