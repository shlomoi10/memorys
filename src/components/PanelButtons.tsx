import React from 'react';

interface PanelButtonsProps {
  onRestart: () => void;
  onSettings: () => void;
  onInfo: () => void;
  onBackToHome: () => void;
  timer?: string;
  pairsFound?: number;
  totalPairs?: number;
}

export default function PanelButtons({ onRestart, onSettings, onInfo, onBackToHome, timer, pairsFound, totalPairs }: PanelButtonsProps) {
  const [fixed, setFixed] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const BUTTONS_HEIGHT = 56;

  React.useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 0 && !fixed) {
          setFixed(true);
          setExpanded(false);
        } else if (entry.intersectionRatio > 0 && fixed) {
          setFixed(false);
          setExpanded(true);
        }
      },
      { threshold: [0] }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fixed]);

  return (
    <>
      <div ref={sentinelRef} style={{ height: 0, width: '100%' }} />
      {fixed && (
        <div style={{ height: expanded ? BUTTONS_HEIGHT : 14 }} />
      )}
      <div
        ref={ref}
        className={`panel-buttons-sticky-top${expanded ? ' expanded' : ''}${fixed ? ' fixed' : ''}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => { if (fixed) setExpanded(false); }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          background: 'none',
          border: 'none',
          boxShadow: 'none',
          padding: 0,
          position: fixed ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          transition: 'box-shadow 0.2s, opacity 0.25s, min-height 0.3s, max-height 0.3s',
        }}
      >
        <div className="panel-buttons-inner-wrapper"
          style={{
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
            transition: 'box-shadow 0.2s, opacity 0.25s, min-height 0.3s, max-height 0.3s',
          }}
        >
          <button className="game-btn primary" onClick={onRestart}>התחל מחדש</button>
          <button className="game-btn" onClick={onSettings} type="button">הגדרות</button>
          <button className="game-btn" onClick={onInfo} type="button">מידע וחוקים</button>
          <button className="game-btn" onClick={onBackToHome} type="button">חזרה לדף הבית</button>
        </div>
        {/* הצגת טיימר וכמות זוגות */}
        {/* נמחק לבקשת המשתמש */}
      </div>
    </>
  );
}
