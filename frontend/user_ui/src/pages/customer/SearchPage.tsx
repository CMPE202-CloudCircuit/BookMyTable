import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Search, Filter, X } from 'lucide-react';
import { Restaurant } from '../../types';
import { mockRestaurants } from '../../data/mockData';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get search params from URL
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const time = searchParams.get('time') || '19:00';
  const partySize = searchParams.get('party') || '2';
  const location = searchParams.get('location') || '';
  
  // Filter states
  const [cuisineFilter, setCuisineFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<string>('');
  
  // Load restaurants data
  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call with all the filters
      // For demo, we'll use our mock data and filter it client-side
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter restaurants based on search params
      let filteredRestaurants = [...mockRestaurants];
      
      if (location) {
        const locationLower = location.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(
          restaurant => 
            restaurant.address.city.toLowerCase().includes(locationLower) ||
            restaurant.address.state.toLowerCase().includes(locationLower) ||
            restaurant.address.zipCode.includes(location)
        );
      }
      
      if (cuisineFilter) {
        filteredRestaurants = filteredRestaurants.filter(
          restaurant => restaurant.cuisine.toLowerCase() === cuisineFilter.toLowerCase()
        );
      }
      
      if (priceFilter) {
        filteredRestaurants = filteredRestaurants.filter(
          restaurant => restaurant.priceRange.length === priceFilter.length
        );
      }
      
      if (ratingFilter) {
        const minRating = parseInt(ratingFilter);
        filteredRestaurants = filteredRestaurants.filter(
          restaurant => restaurant.rating >= minRating
        );
      }
      
      setRestaurants(filteredRestaurants);
      setLoading(false);
    };
    
    loadRestaurants();
  }, [location, cuisineFilter, priceFilter, ratingFilter]);
  
  // Update search params
  const updateSearchParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setCuisineFilter('');
    setPriceFilter('');
    setRatingFilter('');
  };
  
  // Get available cuisines from restaurants for filter dropdown
  const availableCuisines = [...new Set(mockRestaurants.map(r => r.cuisine))];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label htmlFor="search-date" className="form-label">Date</label>
            <input
              type="date"
              id="search-date"
              className="form-input"
              value={date}
              onChange={(e) => updateSearchParams('date', e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="search-time" className="form-label">Time</label>
            <select
              id="search-time"
              className="form-select"
              value={time}
              onChange={(e) => updateSearchParams('time', e.target.value)}
            >
              <option value="17:00">5:00 PM</option>
              <option value="17:30">5:30 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="18:30">6:30 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="19:30">7:30 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="20:30">8:30 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="search-party" className="form-label">Party Size</label>
            <select
              id="search-party"
              className="form-select"
              value={partySize}
              onChange={(e) => updateSearchParams('party', e.target.value)}
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
            <label htmlFor="search-location" className="form-label">Location</label>
            <input
              type="text"
              id="search-location"
              placeholder="City, State or Zip"
              className="form-input"
              value={location}
              onChange={(e) => updateSearchParams('location', e.target.value)}
            />
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline w-full flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Additional Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Additional Filters</h3>
              <button 
                onClick={resetFilters}
                className="text-sm text-primary-500 hover:text-primary-600 flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Reset Filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="cuisine-filter" className="form-label">Cuisine</label>
                <select
                  id="cuisine-filter"
                  className="form-select"
                  value={cuisineFilter}
                  onChange={(e) => setCuisineFilter(e.target.value)}
                >
                  <option value="">All Cuisines</option>
                  {availableCuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="price-filter" className="form-label">Price Range</label>
                <select
                  id="price-filter"
                  className="form-select"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="$">$ (Inexpensive)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (Expensive)</option>
                  <option value="$$$$">$$$$ (Very Expensive)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="rating-filter" className="form-label">Minimum Rating</label>
                <select
                  id="rating-filter"
                  className="form-select"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results count and sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          {loading ? 'Searching...' : `${restaurants.length} restaurants available`}
        </h1>
        
        <div className="flex items-center">
          <span className="text-sm mr-2">Sort by:</span>
          <select className="form-select text-sm max-w-xs">
            <option>Recommended</option>
            <option>Highest Rated</option>
            <option>Most Booked</option>
          </select>
        </div>
      </div>
      
      {/* Results */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-600 mb-4">Try changing your search criteria or filters</p>
          <button 
            onClick={resetFilters}
            className="btn btn-primary"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Restaurant Image */}
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:h-full md:w-56"
                    src={restaurant.photos[0]}
                    alt={restaurant.name}
                  />
                </div>
                
                {/* Restaurant Details */}
                <div className="p-6 md:p-4 lg:p-6 flex-1">
                  <div className="md:flex justify-between items-start">
                    <div>
                      <Link 
                        to={`/restaurant/${restaurant.id}`}
                        className="block text-xl font-bold text-gray-900 hover:text-primary-500"
                      >
                        {restaurant.name}
                      </Link>
                      
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-accent-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{restaurant.reviewCount} reviews</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{restaurant.cuisine}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{restaurant.priceRange}</span>
                      </div>
                      
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{restaurant.address.city}, {restaurant.address.state}</span>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                        {restaurant.description}
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <span className="text-primary-600 font-medium">
                          Booked {restaurant.bookingsToday} times today
                        </span>
                      </div>
                    </div>
                    
                    {/* Time slots */}
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Available times:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {['18:00', '19:00', '20:00'].map((timeSlot) => (
                          <Link
                            key={timeSlot}
                            to={`/booking/${restaurant.id}?date=${date}&time=${timeSlot}&party=${partySize}`}
                            className="btn btn-primary text-sm py-1 px-2"
                          >
                            {timeSlot.split(':')[0] > '12' 
                              ? `${parseInt(timeSlot.split(':')[0]) - 12}:${timeSlot.split(':')[1]} PM` 
                              : `${timeSlot} AM`}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;