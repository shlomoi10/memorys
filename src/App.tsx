import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { memoryVariants } from './variants';
import PlayerSettingsDialog, { PlayerSetting } from './components/PlayerSettingsDialog';
import SettingsButton from './components/SettingsButton';

const defaultPlayers: PlayerSetting[] = [
  { name: 'שחקן 1', color: '#2196f3' },
  { name: 'שחקן 2', color: '#43a047' }
];

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [players, setPlayers] = useState<PlayerSetting[]>(defaultPlayers);

  return (
    <Container maxWidth="sm" sx={{ py: 6, position: 'relative' }}>
      <SettingsButton onClick={() => setSettingsOpen(true)} />
      <PlayerSettingsDialog
        open={settingsOpen}
        players={players}
        onClose={() => setSettingsOpen(false)}
        onSave={setPlayers}
      />
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          משחקי זיכרון
        </Typography>
        <Typography color="text.secondary" fontSize={20}>
          בחרו משחק מהרשימה:
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {memoryVariants.map(variant => (
          <Button
            key={variant.id}
            variant="contained"
            color="primary"
            sx={{ fontSize: 20, borderRadius: 3, py: 2 }}
            // onClick={() => ...}
            disabled
          >
            {variant.name}
          </Button>
        ))}
      </Box>
      <Box mt={6} textAlign="center">
        <Typography color="text.secondary" fontSize={14}>
          גרסה ראשונית - בקרוב כל משחק יופעל!
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
