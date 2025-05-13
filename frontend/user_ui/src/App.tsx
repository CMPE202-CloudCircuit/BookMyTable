import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';

// Lazy-loaded pages
const SearchPage = lazy(() => import('./pages/customer/SearchPage'));
const RestaurantDetailPage = lazy(() => import('./pages/customer/RestaurantDetailPage'));
const BookingPage = lazy(() => import('./pages/customer/BookingPage'));
const ProfilePage = lazy(() => import('./pages/customer/ProfilePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const RestaurantDashboardPage = lazy(() => import('./pages/restaurant/RestaurantDashboardPage'));
const RestaurantEditPage = lazy(() => import('./pages/restaurant/RestaurantEditPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
// const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage'));

function App() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="large" /></div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="restaurant/:id" element={<RestaurantDetailPage />} />
          
          {/* Auth routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected customer routes */}
          <Route element={<ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login" />}>
            <Route path="booking/:restaurantId" element={<BookingPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          
          {/* Protected restaurant manager routes */}
          <Route 
            element={
              <ProtectedRoute 
                isAllowed={isAuthenticated && userRole === 'restaurant'} 
                redirectPath="/login" 
              />
            }
          >
            <Route path="restaurant-dashboard" element={<RestaurantDashboardPage />} />
            <Route path="restaurant-edit" element={<RestaurantEditPage />} />
          </Route>
          
          {/* Protected admin routes */}
          <Route 
            element={
              <ProtectedRoute 
                isAllowed={isAuthenticated && userRole === 'admin'} 
                redirectPath="/login" 
              />
            }
          >
            <Route path="admin" element={<AdminDashboardPage />} />
            {/* <Route path="admin/analytics" element={<AdminAnalyticsPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;