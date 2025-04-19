import React from 'react';
import { Box, Container } from '@mui/material';

interface GameLayoutProps {
  sidePanel: React.ReactNode;
  children: React.ReactNode;
}

export default function GameLayout({ sidePanel, children }: GameLayoutProps) {
  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', pt: 6, alignItems: 'flex-start' }}>
      <Box sx={{
        flex: '0 0 320px',
        mr: 6,
        position: 'sticky',
        top: 40, // 40px = 4 ס"מ בערך במסך רגיל
        alignSelf: 'flex-start',
        zIndex: 100,
        height: 'fit-content',
        maxHeight: 'calc(100vh - 48px)',
      }}>{sidePanel}</Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children}
      </Box>
    </Container>
  );
}
