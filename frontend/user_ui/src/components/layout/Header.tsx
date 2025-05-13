import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChefHat, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">BookTable</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">
              Find Restaurants
            </Link>
            
            {isAuthenticated && userRole === 'restaurant' && (
              <Link to="/restaurant-dashboard" className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">
                Restaurant Dashboard
              </Link>
            )}
            
            {isAuthenticated && userRole === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">
                Admin Dashboard
              </Link>
            )}
          </nav>
          
          {/* User menu (desktop) */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-500">
                  <User className="h-5 w-5" />
                  <span>{currentUser?.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg p-2 invisible group-hover:visible">
                  {userRole === 'customer' && (
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      My Reservations
                    </Link>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="btn btn-outline text-sm">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary text-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/search"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Restaurants
            </Link>
            
            {isAuthenticated && userRole === 'restaurant' && (
              <Link 
                to="/restaurant-dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Restaurant Dashboard
              </Link>
            )}
            
            {isAuthenticated && userRole === 'admin' && (
              <Link 
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            
            {isAuthenticated ? (
              <>
                {userRole === 'customer' && (
                  <Link 
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Reservations
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 flex flex-col space-y-3">
                <Link 
                  to="/login" 
                  className="btn btn-outline text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;