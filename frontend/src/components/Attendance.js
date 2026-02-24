import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Attendance() {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Attendance Tracking
      </Typography>
      <Typography>Mark attendance, view history, download reports (stub).</Typography>
    </Box>
  );
}