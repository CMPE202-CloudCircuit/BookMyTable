import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Box, Container, Typography } from '@mui/material';
import CustomerDashboard from '../pages/CustomerDashboard';
import RestaurantManagerDashboard from '../pages/RestaurantManagerDashboard';
import AdminDashboard from '../pages/AdminDashboard';

const RoleBasedLayout = () => {
  const { role } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case 'customer':
        return <CustomerDashboard />;
      case 'restaurant_manager':
        return <RestaurantManagerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <Container>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h4">Please log in to access your dashboard</Typography>
            </Box>
          </Container>
        );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {renderDashboard()}
    </Box>
  );
};

export default RoleBasedLayout; 