import React from 'react';

interface PanelButtonsProps {
  onRestart: () => void;
  onSettings: () => void;
  onInfo: () => void;
  onBackToHome: () => void;
}

export default function PanelButtons({ onRestart, onSettings, onInfo, onBackToHome }: PanelButtonsProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
      marginTop: 0,
      marginBottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(227,240,255,0.24)',
      border: '1.5px solid #e3f0ff',
      borderRadius: 8,
      boxShadow: '0 2px 8px #1976d211',
      padding: 12,
      boxSizing: 'border-box',
      width: 'auto',
      minWidth: 0,
    }}>
      <button className="game-btn primary" onClick={onRestart}>התחל מחדש</button>
      <button className="game-btn" onClick={onSettings} type="button">הגדרות</button>
      <button className="game-btn" onClick={onInfo} type="button">מידע וחוקים</button>
      <button className="game-btn" onClick={onBackToHome} type="button">חזרה לדף הבית</button>
    </div>
  );
}
