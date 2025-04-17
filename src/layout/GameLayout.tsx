import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface GameLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse', // RTL sidebar right
  width: '100vw',
  height: '100vh',
  background: theme.palette.background.default,
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 320,
  minWidth: 240,
  maxWidth: 360,
  background: theme.palette.background.paper,
  boxShadow: '0 2px 8px #e3eaf1',
  padding: theme.spacing(3, 2),
  position: 'sticky',
  top: 0,
  height: '100vh',
  overflowY: 'auto',
  zIndex: 10,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const Main = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  padding: theme.spacing(4, 0),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function GameLayout({ sidebar, children }: GameLayoutProps) {
  return (
    <LayoutRoot>
      <Sidebar>{sidebar}</Sidebar>
      <Main>{children}</Main>
    </LayoutRoot>
  );
}
