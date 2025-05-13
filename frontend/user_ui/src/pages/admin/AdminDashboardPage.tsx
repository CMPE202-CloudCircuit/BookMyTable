import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Store, Clock, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { mockAnalytics } from '../../data/mockData';

const AdminDashboardPage = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-gray-600">Monitor and manage restaurant listings and reservations</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/admin/analytics" className="btn btn-primary">
            View Detailed Analytics
          </Link>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Reservations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-primary-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Reservations</h3>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalReservations}</p>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </div>
          </div>
        </div>
        
        {/* Active Users */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.activeUsers}</p>
              <p className="text-sm text-gray-600">Currently registered</p>
            </div>
          </div>
        </div>
        
        {/* Total Restaurants */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Store className="h-8 w-8 text-primary-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Restaurants</h3>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalRestaurants}</p>
              <p className="text-sm text-gray-600">Active listings</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Restaurants */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Restaurants</h2>
            <div className="space-y-4">
              {mockAnalytics.popularRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{restaurant.name}</p>
                      <p className="text-sm text-gray-500">{restaurant.reservations} reservations</p>
                    </div>
                  </div>
                  <Link 
                    to={`/restaurant/${restaurant.id}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Restaurant Approvals</h2>
            <div className="space-y-4">
              {mockAnalytics.pendingApprovals.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{restaurant.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{restaurant.cuisine}</span>
                      <span className="mx-2">•</span>
                      <span>Submitted by {restaurant.ownerName}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn btn-outline text-sm flex items-center text-success-500 hover:text-success-600">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </button>
                    <button className="btn btn-outline text-sm flex items-center text-error-500 hover:text-error-600">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reservation Trends */}
      <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Reservation Trends</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`btn text-sm ${
                  timeRange === 'week' 
                    ? 'btn-primary' 
                    : 'btn-outline'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`btn text-sm ${
                  timeRange === 'month' 
                    ? 'btn-primary' 
                    : 'btn-outline'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`btn text-sm ${
                  timeRange === 'year' 
                    ? 'btn-primary' 
                    : 'btn-outline'
                }`}
              >
                Year
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {mockAnalytics.reservationsByDay.map((day, index) => (
              <div
                key={day.date}
                className="flex-1 bg-primary-100 hover:bg-primary-200 transition-colors rounded-t"
                style={{ 
                  height: `${(day.count / Math.max(...mockAnalytics.reservationsByDay.map(d => d.count))) * 100}%`,
                }}
              >
                <div className="p-2 text-center">
                  <span className="text-xs font-medium text-primary-700">{day.count}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            {mockAnalytics.reservationsByDay.map((day) => (
              <div key={day.date} className="text-center">
                <span>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;