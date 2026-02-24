import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

export default function Clubs() {
  const [clubs, setClubs] = useState(['Art Club', 'Coding Circle', 'Drama Society']);
  const [newClub, setNewClub] = useState('');

  const addClub = () => {
    if (newClub.trim()) {
      setClubs([...clubs, newClub.trim()]);
      setNewClub('');
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Clubs Management
      </Typography>
      <Box display="flex" mb={2}>
        <TextField
          label="New Club"
          value={newClub}
          onChange={(e) => setNewClub(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={addClub} sx={{ ml: 1 }}>
          Add
        </Button>
      </Box>
      <List>
        {clubs.map((club, idx) => (
          <ListItem key={idx} divider>
            <ListItemText primary={club} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}