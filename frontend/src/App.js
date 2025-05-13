import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import RoleBasedLayout from './layouts/RoleBasedLayout';
import Home from './pages/Home';
import theme from './theme';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import Reservation from './pages/Reservation';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Admin
import AdminDashboard from './pages/AdminDashboard';
import ManageRestaurants from './pages/admin/ManageRestaurants';
import ApproveRestaurants from './pages/admin/ApproveRestaurants';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import RestaurantManagerDashboard from './pages/RestaurantManagerDashboard';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard/*" element={<RoleBasedLayout />} />
            <Route path="/admin" element={<AdminDashboard />}>  
              <Route path="restaurants" element={<ManageRestaurants />} />
              <Route path="pending" element={<ApproveRestaurants />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
            </Route>
            <Route path="/restaurantManager" element={<RestaurantManagerDashboard />}>  
              {/* <Route path="restaurants" element={<ManageRestaurants />} />
              <Route path="pending" element={<ApproveRestaurants />} />
              <Route path="analytics" element={<AnalyticsDashboard />} /> */}
            </Route>
          </Routes>
          </Box>
          <Footer />
         </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 