import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

interface CardSizeSelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function CardSizeSelector({ value, min = 80, max = 180, onChange }: CardSizeSelectorProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={600}>גודל קלף</Typography>
      <Slider
        value={value}
        min={min}
        max={max}
        step={2}
        onChange={(_, v) => onChange(typeof v === 'number' ? v : v[0])}
        valueLabelDisplay="auto"
        marks={[{ value: min, label: 'קטן' }, { value: max, label: 'גדול' }]}
        sx={{ mx: 2 }}
      />
    </Stack>
  );
}
