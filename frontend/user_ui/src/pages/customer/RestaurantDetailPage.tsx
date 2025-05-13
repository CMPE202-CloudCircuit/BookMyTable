import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Phone, Globe, Clock, Users, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import { Restaurant, Review, TimeSlot } from '../../types';
import { mockRestaurants, mockReviews, getAvailableTimeSlots } from '../../data/mockData';

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const time = searchParams.get('time') || '19:00';
  const partySize = searchParams.get('party') || '2';
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedPartySize, setSelectedPartySize] = useState(partySize);
  
  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoading(true);
      
      // In a real app, these would be API calls
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!id) return;
      
      const foundRestaurant = mockRestaurants.find(r => r.id === id);
      const restaurantReviews = mockReviews[id] || [];
      const availableTimeSlots = getAvailableTimeSlots(id, selectedDate);
      
      setRestaurant(foundRestaurant || null);
      setReviews(restaurantReviews);
      setTimeSlots(availableTimeSlots);
      setLoading(false);
    };
    
    fetchRestaurantData();
  }, [id, selectedDate]);
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }
  
  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h2>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist or has been removed.</p>
          <Link to="/search" className="btn btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }
  
  // Function to navigate image gallery
  const goToNextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex < restaurant.photos.length - 1 ? prevIndex + 1 : 0
    );
  };
  
  const goToPrevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : restaurant.photos.length - 1
    );
  };
  
  // Generate date options for the next 14 days
  const dateOptions = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });
  
  return (
    <div className="bg-white">
      {/* Photo Gallery */}
      <div className="relative h-64 md:h-96 bg-gray-200">
        <img
          src={restaurant.photos[activeImageIndex]}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        
        <button 
          onClick={goToPrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button 
          onClick={goToNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {restaurant.photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`h-2 w-2 rounded-full ${
                index === activeImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-start md:justify-between">
          <div className="md:flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center text-accent-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-medium">{restaurant.rating}</span>
              </div>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-600">{restaurant.reviewCount} reviews</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-600">{restaurant.cuisine}</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-600">{restaurant.priceRange}</span>
            </div>
            
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state} {restaurant.address.zipCode}</span>
            </div>
            
            <div className="flex items-center mt-2 text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <span>{restaurant.phoneNumber}</span>
            </div>
            
            <div className="flex items-center mt-2 text-gray-600">
              <Globe className="h-5 w-5 mr-2" />
              <a 
                href={restaurant.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-500 hover:text-secondary-600"
              >
                Website
              </a>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-700">{restaurant.description}</p>
            </div>
          </div>
          
          {/* Reservation Card */}
          <div className="mt-6 md:mt-0 md:ml-8 md:w-80">
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Make a reservation</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="reservation-date" className="form-label flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Date
                  </label>
                  <select
                    id="reservation-date"
                    className="form-select"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    {dateOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="reservation-party" className="form-label flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Party Size
                  </label>
                  <select
                    id="reservation-party"
                    className="form-select"
                    value={selectedPartySize}
                    onChange={(e) => setSelectedPartySize(e.target.value)}
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5 people</option>
                    <option value="6">6 people</option>
                    <option value="7">7 people</option>
                    <option value="8">8 people</option>
                    <option value="9">9+ people</option>
                  </select>
                </div>
                
                <div>
                  <p className="form-label flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Available Times
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Link
                        key={slot.time}
                        to={`/booking/${restaurant.id}?date=${selectedDate}&time=${slot.time}&party=${selectedPartySize}`}
                        className={`btn text-center py-1 px-2 text-sm ${
                          slot.available 
                            ? 'btn-primary' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        aria-disabled={!slot.available}
                        onClick={(e) => {
                          if (!slot.available) e.preventDefault();
                        }}
                      >
                        {slot.time.split(':')[0] > '12' 
                          ? `${parseInt(slot.time.split(':')[0]) - 12}:${slot.time.split(':')[1]} PM` 
                          : `${slot.time} AM`}
                      </Link>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    Booked {restaurant.bookingsToday} times today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hours & Features */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <div className="space-y-2">
              {Object.entries(restaurant.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize font-medium text-gray-700">{day}</span>
                  <span className="text-gray-600">{hours}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {restaurant.features.map((feature) => (
                <div key={feature} className="flex items-center">
                  <span className="mr-2 text-accent-500">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Reviews */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h3>
          
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center text-accent-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{review.rating}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;