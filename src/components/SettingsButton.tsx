import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface SettingsButtonProps {
  onClick: () => void;
}

export default function SettingsButton({ onClick }: SettingsButtonProps) {
  return (
    <Tooltip title="הגדרות">
      <IconButton onClick={onClick} color="primary">
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
}
