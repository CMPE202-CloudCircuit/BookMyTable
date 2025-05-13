// src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  // detect admin / manager paths
  const isAdminView = location.pathname.startsWith('/admin');
  const isManagerView = location.pathname.startsWith('/restaurantManager');
  const hideStandardLinks = isAdminView || isManagerView;

  // active link detection
  const isRestaurants = location.pathname.startsWith('/restaurants');
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    navigate('/restaurants');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <RestaurantIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookMyTable
          </Typography>

          {!hideStandardLinks ? (
            <Box>
              <Button
                color="inherit"
                variant={isRestaurants ? 'outlined' : 'text'}
                onClick={() => navigate('/restaurants')}
                sx={{ ml: 1 }}
              >
                Restaurants
              </Button>
              <Button
                color="inherit"
                variant={isLogin ? 'outlined' : 'text'}
                onClick={() => navigate('/login')}
                sx={{ ml: 1 }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                variant={isRegister ? 'outlined' : 'text'}
                onClick={() => navigate('/register')}
                sx={{ ml: 1 }}
              >
                Register
              </Button>
            </Box>
          ) : (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                title="Profile Menu"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled>
                  <Typography variant="subtitle1">Hi Admin</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}