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

  const handleSave = () => {
    onChange(localSettings);
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
        <CardSettingsSection orientation={localSettings.cardOrientation || 'portrait'} onChange={handleCardOrientationChange} />
        {/* כאן אפשר להוסיף עוד אזורי הגדרות בעתיד */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary" variant="outlined">ביטול</Button>
        <Button onClick={handleSave} color="primary" variant="contained">שמור</Button>
      </DialogActions>
    </Dialog>
  );
}
