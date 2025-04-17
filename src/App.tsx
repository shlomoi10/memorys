import React, { useState } from 'react';
import GameLayout from './layout/GameLayout';
import GameSidebar from './components/GameSidebar';
import ResponsiveBoard from './components/ResponsiveBoard';

const BOARD_ROWS = 4;
const BOARD_COLS = 4;
const DEFAULT_CARD_SIZE = 120;

export default function App() {
  const [cardSize, setCardSize] = useState(DEFAULT_CARD_SIZE);
  const [currentPlayer] = useState('שחקן 1');
  const [timer] = useState('00:00');

  // דמו: קלפים ריקים
  const cards = Array.from({ length: BOARD_ROWS * BOARD_COLS }, (_, i) => (
    <div
      key={i}
      style={{
        width: cardSize,
        height: cardSize,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 1px 4px #e3eaf1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: cardSize * 0.45,
        fontWeight: 700,
        color: '#2196f3',
        userSelect: 'none',
      }}
    >
      ?
    </div>
  ));

  return (
    <GameLayout
      sidebar={
        <GameSidebar
          currentPlayer={currentPlayer}
          timer={timer}
          cardSize={cardSize}
          onCardSizeChange={setCardSize}
        />
      }
    >
      <ResponsiveBoard rows={BOARD_ROWS} cols={BOARD_COLS} cardSize={cardSize}>
        {cards}
      </ResponsiveBoard>
    </GameLayout>
  );
}
