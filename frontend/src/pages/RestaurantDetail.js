import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Rating,
  Chip,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import restaurantData from '../data/restaurants.json';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export default function RestaurantDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });

  // load Google Maps JS API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // find restaurant and compute derived fields
  useEffect(() => {
    const found = restaurantData.find(r => r.id === id);
    if (!found) return;
    const { averageRating, totalReviews } = calculateRatingAndReviews(found.reviews);
    const bookingsToday = calculateBookingsToday(found.table_layout);
    setRestaurant({
      ...found,
      rating: parseFloat(averageRating),
      num_reviews: totalReviews,
      bookings_today: bookingsToday,
    });
  }, [id]);

  function calculateRatingAndReviews(reviews) {
    const totalReviews = reviews.length;
    const averageRating = totalReviews
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : 0;
    return { averageRating, totalReviews };
  }

  function calculateBookingsToday(tableLayout) {
    return tableLayout.reduce((sum, slot) => sum + (slot.maxSeats - slot.available), 0);
  }

  const handleChange = e => {
    setReservationData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTimeSlotClick = slot => {
    setSelectedTime(slot);
    setReservationData(prev => ({ ...prev, time: slot.time }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Reservation attempt:', reservationData);
    navigate('/reservation');
  };

  const getCostRating = rating => '$'.repeat(rating);

  if (!restaurant) {
    return <Typography>Restaurant not found</Typography>;
  }
  if (loadError) {
    return <Typography color="error">Map failed to load</Typography>;
  }
  if (!isLoaded) {
    return <Typography>Loading map…</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4}>

          {/* Left: Details, Map, Slots, Reviews */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              {/* Header */}
              <Typography variant="h4" gutterBottom>
                {restaurant.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <Rating value={restaurant.rating} precision={0.5} readOnly />
                <Typography>
                  ({restaurant.rating}) • {restaurant.num_reviews} reviews
                </Typography>
                <Chip label={getCostRating(restaurant.cost_rating)} />
              </Box>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {restaurant.cuisine}
              </Typography>
              {/* Location and Bookings Today */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography>
                  {restaurant.location.city}, {restaurant.location.state} {restaurant.location.zip}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography>Bookings Today: {restaurant.bookings_today}</Typography>
              </Box>
              {/* Map */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Location
                </Typography>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: restaurant.coords.lat, lng: restaurant.coords.lng }}
                  zoom={15}
                >
                  <Marker
                    position={{ lat: restaurant.coords.lat, lng: restaurant.coords.lng }}
                    title={restaurant.name}
                  />
                </GoogleMap>
              </Box>
              {/* Time Slots */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Available Time Slots
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {restaurant.table_layout.map(slot => (
                    <Button
                      key={slot.time}
                      variant={selectedTime?.time === slot.time ? 'contained' : 'outlined'}
                      onClick={() => handleTimeSlotClick(slot)}
                      disabled={slot.available === 0}
                    >
                      {slot.time} ({slot.available})
                    </Button>
                  ))}
                </Box>
              </Box>
              {/* Reviews */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Reviews
                </Typography>
                {restaurant.reviews.map((review, idx) => (
                  <Card key={idx} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2">User: {review.user}</Typography>
                        <Rating value={review.rating} readOnly size="small" />
                      </Box>
                      <Collapse in={expandedReview === idx}>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {review.comment}
                        </Typography>
                      </Collapse>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() =>
                          setExpandedReview(expandedReview === idx ? null : idx)
                        }
                        sx={{
                          transform: expandedReview === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s',
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Right: Reservation form */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Make a Reservation
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="date"
                  name="date"
                  label="Date"
                  value={reservationData.date}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  type="time"
                  name="time"
                  label="Time"
                  value={reservationData.time}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  select
                  name="guests"
                  label="Number of Guests"
                  value={reservationData.guests}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  {[1,2,3,4,5,6,7,8].map(option => (
                    <MenuItem key={option} value={option}>
                      {option} {option === 1 ? 'Guest' : 'Guests'}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="specialRequests"
                  label="Special Requests"
                  value={reservationData.specialRequests}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Book Table
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
