import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Temporary mock data
const mockReservation = {
  id: 'RES-123456',
  restaurant: {
    name: 'The Gourmet Kitchen',
    location: '123 Main St, Downtown',
  },
  date: '2024-04-20',
  time: '19:00',
  guests: 4,
  status: 'confirmed',
};

function Reservation() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircleIcon
              sx={{ fontSize: 60, color: 'success.main', mb: 2 }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Reservation Confirmed
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Your reservation has been successfully booked
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Reservation Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Reservation ID
                </Typography>
                <Typography variant="body1">{mockReservation.id}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Restaurant
                </Typography>
                <Typography variant="body1">
                  {mockReservation.restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mockReservation.restaurant.location}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date & Time
                </Typography>
                <Typography variant="body1">
                  {new Date(mockReservation.date).toLocaleDateString()} at{' '}
                  {mockReservation.time}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Number of Guests
                </Typography>
                <Typography variant="body1">{mockReservation.guests}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Next Steps
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" paragraph>
                We've sent a confirmation email with all the details of your
                reservation. Please check your inbox.
              </Typography>
              <Typography variant="body1" paragraph>
                If you need to modify or cancel your reservation, please contact us
                at least 24 hours before your scheduled time.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RestaurantIcon />}
                  onClick={() => navigate('/restaurants')}
                  sx={{ mr: 2 }}
                >
                  Browse More Restaurants
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/profile')}
                >
                  View My Reservations
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default Reservation; 