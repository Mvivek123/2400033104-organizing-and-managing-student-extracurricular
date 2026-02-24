import React from 'react';
import { Box, Typography } from '@mui/material';

export default function EventsOverview() {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <Typography>Calendar view, register/unregister, filter (stub).</Typography>
    </Box>
  );
}