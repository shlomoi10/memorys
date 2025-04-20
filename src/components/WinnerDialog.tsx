import React from 'react';
import './WinnerDialog.css';

interface PlayerScore {
  name: string;
  score: number;
}

interface WinnerDialogProps {
  open: boolean;
  winner: PlayerScore | null;
  loser: PlayerScore | null;
  onRestart: () => void;
  onHome: () => void;
}

function Trophy() {
  return <span className="trophy-emoji" role="img" aria-label="Trophy">🏆</span>;
}

function Confetti() {
  return <span className="confetti" role="img" aria-label="Confetti">🎉</span>;
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1.5px 3px #1976d244)' }}><path d="M3 11.5L12 5l9 6.5"/><path d="M5 10.5V19a2 2 0 0 0 2 2h2.5a1 1 0 0 0 1-1v-4.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V20a1 1 0 0 0 1 1H17a2 2 0 0 0 2-2v-8.5"/></svg>
  );
}

function RestartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6"/><path d="M3.51 9a9 9 0 1 1-2.13 5"/></svg>
  );
}

export default function WinnerDialog({ open, winner, loser, onRestart, onHome }: WinnerDialogProps) {
  if (!open) return null;
  return (
    <div>
      <div className="winner-dialog-overlay" />
      <div className="winner-dialog-root" role="dialog" aria-modal="true" dir="rtl">
        <div className="winner-dialog-header">
          <Trophy />
          <h2 className="winner-dialog-title">סיום המשחק</h2>
        </div>
        <div className="winner-dialog-body">
          <Confetti />
          <div className="winner-dialog-winner-row">
            <span className="winner-name">{winner?.name || '—'}</span>
            <span className="winner-score">{winner?.score ?? '—'}</span>
            <span className="winner-label">מנצח/ת</span>
          </div>
          <div className="winner-dialog-vs-row">
            <span className="vs-label">ניקוד</span>
            <span className="vs-sep">|</span>
            <span className="vs-label">ניקוד</span>
          </div>
          <div className="winner-dialog-loser-row">
            <span className="loser-name">{loser?.name || '—'}</span>
            <span className="loser-score">{loser?.score ?? '—'}</span>
            <span className="loser-label">מפסיד/ה</span>
          </div>
        </div>
        <div className="winner-dialog-actions-row">
          <button className="winner-dialog-icon-btn" title="חזרה לבית" onClick={onHome}><HomeIcon /></button>
          <button className="winner-dialog-icon-btn" title="התחל משחק חדש" onClick={onRestart}><RestartIcon /></button>
        </div>
      </div>
    </div>
  );
}
