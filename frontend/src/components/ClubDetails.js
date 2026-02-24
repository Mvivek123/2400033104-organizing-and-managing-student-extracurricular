import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ClubDetails() {
  const { id } = useParams();
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Club Details ({id})
      </Typography>
      <Typography>Description, members, events etc. (stub)</Typography>
    </Box>
  );
}