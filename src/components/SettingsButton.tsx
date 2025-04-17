import React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  onClick: () => void;
}

export default function SettingsButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick} size="large" sx={{ position: 'absolute', top: 18, left: 18 }} aria-label="הגדרות">
      <SettingsIcon fontSize="inherit" />
    </IconButton>
  );
}
