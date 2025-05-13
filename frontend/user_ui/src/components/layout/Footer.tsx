import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">BookTable</span>
            </Link>
            <p className="mt-2 text-gray-400 text-sm">
              Find the perfect table at your favorite restaurants. BookTable makes
              dining out easier with instant reservations.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white text-sm">
                  Find Restaurants
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Popular Locations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Featured Restaurants
                </a>
              </li>
            </ul>
          </div>
          
          {/* For Restaurants */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">For Restaurants</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Join BookTable
                </a>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white text-sm">
                  Restaurant Login
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Business Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">support@booktable.example.com</p>
            <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BookTable. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;