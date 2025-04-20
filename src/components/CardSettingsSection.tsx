import React from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';

interface CardSettingsSectionProps {
  orientation: 'portrait' | 'landscape';
  onChange: (value: 'portrait' | 'landscape') => void;
  cardNameMode: 'default' | 'none';
  onCardNameModeChange: (mode: 'default' | 'none') => void;
}

export default function CardSettingsSection({ orientation, onChange, cardNameMode, onCardNameModeChange }: CardSettingsSectionProps) {
  return (
    <Box sx={{ my: 2, p: 2, bgcolor: 'rgba(227,240,255,0.24)', borderRadius: 4, border: '1.5px solid #e3f0ff' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1976d2', mb: 1, fontFamily: 'Heebo, Varela Round, Arial, sans-serif', fontSize: 18 }}>
        הגדרות קלפים
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, flexDirection: 'row' }}>
        <Typography sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Heebo, Varela Round, Arial, sans-serif' }}>צורת קלף:</Typography>
        <ToggleButtonGroup
          value={orientation}
          exclusive
          onChange={(_, value) => value && onChange(value)}
          color="primary"
          sx={{ direction: 'rtl', gap: 1, bgcolor: 'transparent' }}
        >
          <ToggleButton value="portrait" sx={{
            fontWeight: 700,
            fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
            px: 4,
            py: 1.2,
            borderRadius: '0 99px 99px 0',
            fontSize: 16,
            border: '2px solid #e3f0ff',
            bgcolor: orientation === 'portrait' ? '#e3f0ff' : '#fff',
            color: orientation === 'portrait' ? '#1976d2' : '#1976d2',
            boxShadow: orientation === 'portrait' ? '0 2px 8px #1976d244' : 'none',
            mx: 0.5,
            transition: 'all 0.18s',
            '&:hover': { bgcolor: '#e3f0ff', borderColor: '#1976d2' },
          }}>
            אורך
          </ToggleButton>
          <ToggleButton value="landscape" sx={{
            fontWeight: 700,
            fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
            px: 4,
            py: 1.2,
            borderRadius: '99px 0 0 99px',
            fontSize: 16,
            border: '2px solid #e3f0ff',
            bgcolor: orientation === 'landscape' ? '#e3f0ff' : '#fff',
            color: orientation === 'landscape' ? '#1976d2' : '#1976d2',
            boxShadow: orientation === 'landscape' ? '0 2px 8px #1976d244' : 'none',
            mx: 0.5,
            transition: 'all 0.18s',
            '&:hover': { bgcolor: '#e3f0ff', borderColor: '#1976d2' },
          }}>
            רוחב
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, flexDirection: 'row' }}>
        <Typography sx={{ fontWeight: 700, fontSize: 16, fontFamily: 'Heebo, Varela Round, Arial, sans-serif' }}>שם מתחת לאימוג'י:</Typography>
        <ToggleButtonGroup
          value={cardNameMode}
          exclusive
          onChange={(_, value) => value && onCardNameModeChange(value)}
          color="primary"
          sx={{ direction: 'rtl', gap: 1, bgcolor: 'transparent' }}
        >
          <ToggleButton value="default" sx={{
            fontWeight: 700,
            fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
            px: 4,
            py: 1.2,
            borderRadius: '0 99px 99px 0',
            fontSize: 16,
            border: '2px solid #e3f0ff',
            bgcolor: cardNameMode === 'default' ? '#e3f0ff' : '#fff',
            color: cardNameMode === 'default' ? '#1976d2' : '#1976d2',
            boxShadow: cardNameMode === 'default' ? '0 2px 8px #1976d244' : 'none',
            mx: 0.5,
            transition: 'all 0.18s',
            '&:hover': { bgcolor: '#e3f0ff', borderColor: '#1976d2' },
          }}>
            ברירת מחדל
          </ToggleButton>
          <ToggleButton value="none" sx={{
            fontWeight: 700,
            fontFamily: 'Heebo, Varela Round, Arial, sans-serif',
            px: 4,
            py: 1.2,
            borderRadius: '99px 0 0 99px',
            fontSize: 16,
            border: '2px solid #e3f0ff',
            bgcolor: cardNameMode === 'none' ? '#e3f0ff' : '#fff',
            color: cardNameMode === 'none' ? '#1976d2' : '#1976d2',
            boxShadow: cardNameMode === 'none' ? '0 2px 8px #1976d244' : 'none',
            mx: 0.5,
            transition: 'all 0.18s',
            '&:hover': { bgcolor: '#e3f0ff', borderColor: '#1976d2' },
          }}>
            בלי שם
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
