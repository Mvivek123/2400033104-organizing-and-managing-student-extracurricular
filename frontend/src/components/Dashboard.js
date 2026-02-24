import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuth();
  const username = auth.user?.name || '';

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {username}!
      </Typography>
      <Typography gutterBottom>Here&apos;s what&apos;s happening with your extracurricular activities</Typography>
      <Grid container spacing={2} mt={2}>
        {[
          { title: 'Joined Clubs', value: 0 },
          { title: 'Upcoming Events', value: 3 },
          { title: 'Notifications', value: 2 },
          { title: 'Badges Earned', value: 0 },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper sx={{ p: 2, textAlign: 'center' }} elevation={1}>
              <Typography variant="subtitle1">{card.title}</Typography>
              <Typography variant="h5" color="primary">
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" gap={2} flexWrap="wrap">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/clubs')}
        >
          Explore Clubs
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/events')}
        >
          View Events
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/profile')}
        >
          My Profile
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/notifications')}
        >
          Notifications
        </Button>
      </Box>
    </Box>
  );
}