import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function EventDetails() {
  const { id } = useParams();
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Event Details ({id})
      </Typography>
      <Typography>Date/time/venue/organizer info goes here (stub).</Typography>
    </Box>
  );
}