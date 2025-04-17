import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { memoryVariants } from './variants';

function App() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
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
