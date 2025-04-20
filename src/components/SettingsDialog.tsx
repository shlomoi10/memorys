import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box } from '@mui/material';
import CardSettingsSection from './CardSettingsSection';
import PlayerColorPicker from './PlayerColorPicker';

interface SettingsDialogProps {
  open: boolean;
  settings: any;
  onChange: (settings: any) => void;
  onClose: () => void;
}

export default function SettingsDialog({ open, settings, onChange, onClose }: SettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings, open]);

  // עדכון הגדרת קלפים
  const handleCardOrientationChange = (value: 'portrait' | 'landscape') => {
    setLocalSettings((prev: any) => ({ ...prev, cardOrientation: value }));
  };
  const handleCardNameModeChange = (mode: 'default' | 'none') => {
    setLocalSettings((prev: any) => ({ ...prev, cardNameMode: mode }));
  };
  const handleSpacingModeChange = (mode: 'default' | 'compact') => {
    setLocalSettings((prev: any) => ({ ...prev, spacingMode: mode }));
  };
  const handleCardSizeModeChange = (mode: 'default' | 'small') => {
    setLocalSettings((prev: any) => ({ ...prev, cardSizeMode: mode }));
  };

  const handleSave = () => {
    if (JSON.stringify(localSettings) !== JSON.stringify(settings)) {
      onChange(localSettings);
    }
    onClose();
  };
  const handleCancel = () => {
    setLocalSettings(settings);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} dir="rtl">
      <DialogTitle sx={{ fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontWeight: 900, fontSize: 26, color: '#1976d2', textAlign: 'right', letterSpacing: 1, bgcolor: 'rgba(255,255,255,0.98)', borderBottom: '2px solid #e3f0ff' }}>
        הגדרות משחק
      </DialogTitle>
      <DialogContent>
        {/* אזור הגדרות קלפים */}
        <CardSettingsSection 
          orientation={localSettings.cardOrientation || 'portrait'}
          onChange={handleCardOrientationChange}
          cardNameMode={localSettings.cardNameMode || 'default'}
          onCardNameModeChange={handleCardNameModeChange}
          spacingMode={localSettings.spacingMode || 'default'}
          onSpacingModeChange={handleSpacingModeChange}
          cardSizeMode={localSettings.cardSizeMode || 'default'}
          onCardSizeModeChange={handleCardSizeModeChange}
        />
        {/* כאן אפשר להוסיף עוד אזורי הגדרות בעתיד */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary" variant="outlined">ביטול</Button>
        <Button onClick={handleSave} color="primary" variant="contained">שמור</Button>
      </DialogActions>
    </Dialog>
  );
}
