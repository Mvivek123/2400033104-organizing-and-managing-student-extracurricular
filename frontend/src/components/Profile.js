import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Profile() {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Typography>Personal details, clubs, events, attendance (stub).</Typography>
    </Box>
  );
}