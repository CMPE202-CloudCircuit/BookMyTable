import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to BookMyTable
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Find and book your perfect dining experience
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/restaurants')}
                sx={{ mr: 2 }}
              >
                Browse Restaurants
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <RestaurantIcon sx={{ fontSize: 120, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Discover amazing restaurants
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Book your table in advance and enjoy a seamless dining experience
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home; 