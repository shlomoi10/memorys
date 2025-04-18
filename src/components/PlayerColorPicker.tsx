import React, { useState, useRef, useEffect } from 'react';
import './PlayerColorPicker.css';

interface PlayerColorPickerProps {
  value: string;
  options: string[];
  onChange: (color: string) => void;
  ariaLabel: string;
}

export default function PlayerColorPicker({ value, options, onChange, ariaLabel }: PlayerColorPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="player-color-picker" ref={ref}>
      <div
        className={`player-color-circle selected`}
        style={{ background: value }}
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={() => setOpen(o => !o)}
      />
      {open && (
        <div className="player-color-palette">
          {options.map(color => (
            <div
              key={color}
              className={`player-color-circle${color === value ? ' selected' : ''}`}
              style={{ background: color }}
              tabIndex={0}
              aria-label={`בחר צבע ${color}`}
              onClick={() => { onChange(color); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
