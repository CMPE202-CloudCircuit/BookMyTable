import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Users, Check, X, Clock } from 'lucide-react';
import { Reservation } from '../../types';
import { mockUserReservations } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call to get the user's reservations
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setReservations(mockUserReservations);
      setLoading(false);
    };
    
    fetchReservations();
  }, []);
  
  const upcomingReservations = reservations.filter(
    res => res.status === 'confirmed' && new Date(res.date) >= new Date()
  );
  
  const pastReservations = reservations.filter(
    res => res.status !== 'confirmed' || new Date(res.date) < new Date()
  );
  
  const formatTime = (timeString: string) => {
    const hour = parseInt(timeString.split(':')[0]);
    const minute = timeString.split(':')[1];
    return hour > 12 
      ? `${hour - 12}:${minute} PM` 
      : hour === 12 
        ? `12:${minute} PM` 
        : `${hour}:${minute} AM`;
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const cancelReservation = async (reservationId: string) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) {
      return;
    }
    
    // In a real app, this would be an API call to cancel the reservation
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Update local state to reflect the cancellation
    setReservations(prev => 
      prev.map(res => 
        res.id === reservationId 
          ? { ...res, status: 'cancelled' } 
          : res
      )
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reservations</h1>
          <p className="mt-1 text-gray-600">Manage your upcoming and past dining experiences</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/search" className="btn btn-primary">
            Find New Restaurants
          </Link>
        </div>
      </div>
      
      {/* User Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{currentUser?.name}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{currentUser?.email}</p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 px-1 text-sm font-medium ${
              activeTab === 'upcoming'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upcoming Reservations ({upcomingReservations.length})
          </button>
          
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-4 px-1 text-sm font-medium ${
              activeTab === 'past'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Past Reservations ({pastReservations.length})
          </button>
        </div>
      </div>
      
      {/* Reservations List */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : activeTab === 'upcoming' ? (
        upcomingReservations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming reservations</h3>
            <p className="text-gray-600 mb-4">You don't have any confirmed reservations.</p>
            <Link to="/search" className="btn btn-primary">
              Make a Reservation
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {upcomingReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex md:justify-between md:items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        <Link to={`/restaurant/${reservation.restaurantId}`} className="hover:text-primary-500">
                          {reservation.restaurantName}
                        </Link>
                      </h3>
                      
                      <div className="flex items-center mt-2">
                        <div className="flex items-center text-gray-700">
                          <CalendarClock className="h-4 w-4 mr-1" />
                          <span>{formatDate(reservation.date)}</span>
                        </div>
                        <span className="mx-2 text-gray-500">•</span>
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatTime(reservation.time)}</span>
                        </div>
                        <span className="mx-2 text-gray-500">•</span>
                        <div className="flex items-center text-gray-700">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{reservation.partySize} {reservation.partySize === 1 ? 'person' : 'people'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check className="h-3 w-3 mr-1" />
                          Confirmed
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex space-x-3">
                      <Link 
                        to={`/restaurant/${reservation.restaurantId}`}
                        className="btn btn-outline text-sm"
                      >
                        View Restaurant
                      </Link>
                      
                      <button 
                        onClick={() => cancelReservation(reservation.id)}
                        className="btn btn-outline text-sm bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        pastReservations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No past reservations</h3>
            <p className="text-gray-600">Your past dining experiences will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pastReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="md:flex md:justify-between md:items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        <Link to={`/restaurant/${reservation.restaurantId}`} className="hover:text-primary-500">
                          {reservation.restaurantName}
                        </Link>
                      </h3>
                      
                      <div className="flex items-center mt-2">
                        <div className="flex items-center text-gray-700">
                          <CalendarClock className="h-4 w-4 mr-1" />
                          <span>{formatDate(reservation.date)}</span>
                        </div>
                        <span className="mx-2 text-gray-500">•</span>
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatTime(reservation.time)}</span>
                        </div>
                        <span className="mx-2 text-gray-500">•</span>
                        <div className="flex items-center text-gray-700">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{reservation.partySize} {reservation.partySize === 1 ? 'person' : 'people'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        {reservation.status === 'completed' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <Check className="h-3 w-3 mr-1" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <X className="h-3 w-3 mr-1" />
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      {reservation.status === 'completed' && (
                        <Link 
                          to={`/restaurant/${reservation.restaurantId}`}
                          className="btn btn-outline text-sm"
                        >
                          Leave a Review
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ProfilePage;