import React from 'react';
import { Player } from '../core/BaseMemory';
import { Box, Typography, Divider, Avatar, Stack, Chip, Tooltip, LinearProgress } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojisDialog from './EmojisDialog';
import { useAutoScaleToViewport } from './useAutoScaleToViewport';
import './SidePanel.css';

interface SidePanelProps {
  players: Player[];
  currentPlayer: number;
  gameName: string;
  rules: string;
  timer: string; // פורמט 00:00
  pairsFound: number;
  totalPairs: number;
  moves: number;
  cards?: import('../core/BaseMemory').Card[];
}

export default function SidePanel({ players, currentPlayer, gameName, rules, timer, pairsFound, totalPairs, moves, cards }: SidePanelProps) {
  const [showEmojis, setShowEmojis] = React.useState(false);
  const [scaleRef, scale] = useAutoScaleToViewport(40);

  return (
    <Box
      ref={scaleRef as any}
      sx={{
        width: 290,
        bgcolor: 'rgba(255,255,255,0.98)',
        p: 2.2,
        pt: 5.5,
        pb: 5.5,
        borderRadius: 4,
        boxShadow: '0 4px 18px #1976d222',
        minHeight: 320,
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important',
        fontWeight: 500,
        letterSpacing: 0.5,
        transition: 'box-shadow 0.3s, transform 0.25s cubic-bezier(.4,2,.6,1)',
        backdropFilter: 'blur(1.5px)',
        border: '2px solid #e3f0ff',
        position: 'sticky',
        top: 20,
        alignSelf: 'flex-start',
        zIndex: 100,
        height: 'fit-content',
        maxHeight: 'none',
        overflow: 'visible',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', zIndex: 2, marginTop: '-36px', marginBottom: '2px' }}>
        <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56, boxShadow: '0 4px 24px #1976d244', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', border: '3px solid #fff' }}>
          <SportsEsportsIcon sx={{ fontSize: 34 }} />
        </Avatar>
      </div>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, justifyContent: 'center', mt: 3 }}>
        <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 900, letterSpacing: 1, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', fontSize: 28 }}>{gameName}</Typography>
      </Stack>
      <Divider sx={{ mb: 2, bgcolor: '#1976d2', height: 3, borderRadius: 99, opacity: 0.18 }} />
      {/* רשימת שחקנים מעוצבת */}
      <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, color: '#222', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', fontSize: 19 }}>
        <GroupsIcon sx={{ verticalAlign: 'middle', mr: 0.5, color: '#1976d2', fontSize: 22 }} /> שחקנים
      </Typography>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {players.map((p, i) => (
          <Box key={p.name} sx={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: i === currentPlayer ? 'rgba(25, 118, 210, 0.04)' : 'rgba(245, 250, 255, 1)',
            borderRadius: 99,
            px: 2, py: 1,
            boxShadow: i === currentPlayer ? '0 0 0 2px #1976d2' : '0 1.5px 8px #1976d211',
            border: i === currentPlayer ? '2px solid #1976d2' : '2px solid #e3f0ff',
            transition: 'all 0.2s',
            minHeight: 54,
            fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important',
            gap: 2,
          }}>
            <Chip
              icon={<EmojiEventsOutlinedIcon sx={{ color: i === currentPlayer ? '#1565c0' : '#b0b0b0', fontSize: 20 }} />}
              label={p.score}
              sx={{ bgcolor: i === currentPlayer ? '#1976d2' : '#f6fafd', color: i === currentPlayer ? '#fff' : '#1976d2', fontWeight: 700, fontSize: 16, px: 2, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', borderRadius: 2, boxShadow: '0 2px 8px #1976d244' }}
            />
            <Typography sx={{ fontWeight: 800, color: p.color, fontSize: 20, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', flex: 1, textAlign: 'right', px: 1 }}>{p.name}</Typography>
            <Avatar sx={{ bgcolor: p.color, color: '#fff', fontWeight: 900, width: 38, height: 38, fontSize: 22, border: i === currentPlayer ? '2.5px solid #1976d2' : '2px solid #fff', boxShadow: '0 2px 8px #1976d244', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>{i+1}</Avatar>
          </Box>
        ))}
      </Stack>
      <Divider sx={{ my: 2, bgcolor: '#1976d2', height: 2, borderRadius: 99, opacity: 0.12 }} />
      <Stack direction="row" spacing={4} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
        <Tooltip title="טיימר משחק">
          <Chip icon={<AccessTimeOutlinedIcon sx={{ color: '#1976d2' }} />} label={timer} sx={{ fontWeight: 700, fontSize: 16, px: 1.5, bgcolor: '#e3f2fd', color: '#1976d2', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', boxShadow: '0 2px 8px #1976d244', borderRadius: 2 }} />
        </Tooltip>
        <Box sx={{ width: 24 }} />
        <Tooltip title="מספר מהלכים">
          <Chip icon={<ReplayOutlinedIcon sx={{ color: '#1976d2' }} />} label={moves} sx={{ fontWeight: 700, fontSize: 16, px: 1.5, bgcolor: '#e3f2fd', color: '#1976d2', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', boxShadow: '0 2px 8px #1976d244', borderRadius: 2 }} />
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={1.5} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
        <Tooltip title="זוגות שנמצאו">
          <Chip
            icon={<EmojiEventsOutlinedIcon sx={{ color: '#1976d2' }} />}
            label={`${pairsFound} / ${totalPairs}`}
            sx={{ fontWeight: 700, fontSize: 16, px: 1.5, bgcolor: '#e3f2fd', color: '#1976d2', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', boxShadow: '0 2px 8px #1976d244', borderRadius: 2 }}
          />
        </Tooltip>
        <Box sx={{ flex: 1, ml: 1, mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={totalPairs ? (100 * pairsFound / totalPairs) : 0}
            sx={{ height: 8, borderRadius: 99, bgcolor: '#e3e3e3', '& .MuiLinearProgress-bar': { bgcolor: '#1976d2' } }}
          />
        </Box>
      </Stack>
      <Divider sx={{ my: 2, bgcolor: '#1976d2', height: 2, borderRadius: 99, opacity: 0.12 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, color: '#222', fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important', fontSize: 18 }}>חוקי המשחק:</Typography>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#444', fontWeight: 500, fontSize: 15, fontFamily: 'Heebo, Varela Round, Arial, sans-serif !important' }}>{rules}</Typography>
      {/* כפתור קלפים משתתפים */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <button
          className="game-btn"
          style={{ fontWeight: 800, fontSize: 18, borderRadius: 99, padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 8, background: '#e3f0ff', color: '#1976d2', border: 'none', boxShadow: '0 2px 8px #1976d244', cursor: 'pointer', transition: 'background 0.2s' }}
          onClick={() => setShowEmojis(true)}
        >
          <EmojiEmotionsIcon sx={{ fontSize: 28, mr: 1 }} /> קלפים משחקים
        </button>
      </Box>
      {cards && (
        <EmojisDialog open={showEmojis} onClose={() => setShowEmojis(false)} cards={cards} />
      )}
    </Box>
  );
}
