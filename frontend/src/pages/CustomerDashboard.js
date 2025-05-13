import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useAuth } from '../contexts/AuthContext';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    partySize: 2,
    specialRequests: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      setError('Failed to fetch restaurants');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/restaurants/search?query=${searchQuery}&date=${date.toISOString()}&time=${time.toISOString()}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      setError('Search failed');
    }
  };

  const handleBooking = async () => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: selectedRestaurant.id,
          date: date.toISOString(),
          time: time.toISOString(),
          partySize: bookingDetails.partySize,
          specialRequests: bookingDetails.specialRequests,
        }),
      });
      if (!response.ok) throw new Error('Booking failed');
      setSuccess('Booking successful!');
      setSelectedRestaurant(null);
      setBookingDetails({ partySize: 2, specialRequests: '' });
    } catch (error) {
      setError('Booking failed');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Find a Restaurant
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 3 }}>
          <form onSubmit={handleSearch}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Search restaurants"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Time"
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ height: '56px' }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Grid container spacing={3}>
          {restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{restaurant.name}</Typography>
                  <Typography color="textSecondary">{restaurant.cuisine}</Typography>
                  <Typography variant="body2">{restaurant.address}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => setSelectedRestaurant(restaurant)}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={Boolean(selectedRestaurant)}
          onClose={() => setSelectedRestaurant(null)}
        >
          <DialogTitle>Book a Table at {selectedRestaurant?.name}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              type="number"
              label="Party Size"
              value={bookingDetails.partySize}
              onChange={(e) =>
                setBookingDetails({
                  ...bookingDetails,
                  partySize: parseInt(e.target.value),
                })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Special Requests"
              value={bookingDetails.specialRequests}
              onChange={(e) =>
                setBookingDetails({
                  ...bookingDetails,
                  specialRequests: e.target.value,
                })
              }
              margin="normal"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedRestaurant(null)}>Cancel</Button>
            <Button onClick={handleBooking} variant="contained" color="primary">
              Confirm Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default CustomerDashboard; 