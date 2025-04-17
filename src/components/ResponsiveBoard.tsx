import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ResponsiveBoardProps {
  rows: number;
  cols: number;
  cardSize: number;
  children: React.ReactNode; // Card components
}

const BoardGrid = styled(Box)<{ rows: number; cols: number; cardSize: number }>(({ rows, cols, cardSize, theme }) => ({
  display: 'grid',
  gridTemplateRows: `repeat(${rows}, ${cardSize}px)` ,
  gridTemplateColumns: `repeat(${cols}, ${cardSize}px)` ,
  gap: theme.spacing(2),
  justifyContent: 'center',
  alignContent: 'center',
  width: 'fit-content',
  minWidth: '100%',
  maxWidth: '100%',
  overflow: 'auto',
}));

export default function ResponsiveBoard({ rows, cols, cardSize, children }: ResponsiveBoardProps) {
  return (
    <Box sx={{ width: '100%', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BoardGrid rows={rows} cols={cols} cardSize={cardSize}>
        {children}
      </BoardGrid>
    </Box>
  );
}
