import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

export default function Events() {
  const [events, setEvents] = useState([
    { name: 'Spring Festival', date: '2026-03-21' },
    { name: 'Hackathon', date: '2026-04-15' },
  ]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '' });

  const addEvent = () => {
    if (newEvent.name.trim() && newEvent.date) {
      setEvents([...events, { ...newEvent }]);
      setNewEvent({ name: '', date: '' });
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Events Management
      </Typography>
      <Box display="flex" mb={2} gap={1}>
        <TextField
          label="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          size="small"
        />
        <TextField
          label="Date"
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={addEvent}>
          Add
        </Button>
      </Box>
      <List>
        {events.map((evt, idx) => (
          <ListItem key={idx} divider>
            <ListItemText primary={evt.name} secondary={evt.date} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}