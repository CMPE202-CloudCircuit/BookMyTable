import { Link } from 'react-router-dom';
import { Search, CalendarClock, Users, MapPin, Star, Clock, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const HomePage = () => {
  const [searchDate, setSearchDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchTime, setSearchTime] = useState<string>('19:00');
  const [searchPartySize, setSearchPartySize] = useState<string>('2');
  const [searchLocation, setSearchLocation] = useState<string>('');
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)', 
            backgroundPosition: 'center',
            filter: 'brightness(40%)' 
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find your table for any occasion
            </h1>
            <p className="text-xl text-white mb-8">
              Book tables at the best restaurants for lunch, dinner or any special moment.
            </p>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 scale-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="date" className="form-label flex items-center">
                    <CalendarClock className="h-4 w-4 mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="form-input"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="form-label flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Time
                  </label>
                  <select
                    id="time"
                    className="form-select"
                    value={searchTime}
                    onChange={(e) => setSearchTime(e.target.value)}
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
                  <label htmlFor="party-size" className="form-label flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Party Size
                  </label>
                  <select
                    id="party-size"
                    className="form-select"
                    value={searchPartySize}
                    onChange={(e) => setSearchPartySize(e.target.value)}
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
                  <label htmlFor="location" className="form-label flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="City, State or Zip"
                    className="form-input"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Link 
                  to={{
                    pathname: '/search',
                    search: `?date=${searchDate}&time=${searchTime}&party=${searchPartySize}&location=${searchLocation}`
                  }}
                  className="btn btn-primary w-full py-3"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Find a Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Restaurants</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our most popular dining destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Restaurant 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Bella Italia"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">Bella Italia</h3>
                  <div className="flex items-center text-accent-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.7</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Italian • $$$ • Downtown</p>
                <p className="text-gray-700 mb-4">
                  Experience authentic Italian cuisine in a charming rustic setting.
                </p>
                <Link to="/restaurant/1" className="btn btn-primary w-full">
                  Reserve Now
                </Link>
              </div>
            </div>
            
            {/* Featured Restaurant 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Sakura Sushi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">Sakura Sushi</h3>
                  <div className="flex items-center text-accent-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Japanese • $$ • Midtown</p>
                <p className="text-gray-700 mb-4">
                  Fresh, innovative sushi and Japanese dishes in a modern atmosphere.
                </p>
                <Link to="/restaurant/2" className="btn btn-primary w-full">
                  Reserve Now
                </Link>
              </div>
            </div>
            
            {/* Featured Restaurant 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Harvest Table"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">Harvest Table</h3>
                  <div className="flex items-center text-accent-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.5</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">American • $$ • Riverside</p>
                <p className="text-gray-700 mb-4">
                  Farm-to-table cuisine featuring seasonal ingredients and craft cocktails.
                </p>
                <Link to="/restaurant/3" className="btn btn-primary w-full">
                  Reserve Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How BookTable Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Book your next dining experience in 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-500 mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Search</h3>
              <p className="text-gray-600">
                Find restaurants by location, cuisine, or availability for your desired date and time.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-500 mb-4">
                <CalendarClock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Book</h3>
              <p className="text-gray-600">
                Reserve your table with instant confirmation – no phone calls needed.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-500 mb-4">
                <ThumbsUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy</h3>
              <p className="text-gray-600">
                Arrive at the restaurant and enjoy your meal – your table will be waiting!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to make a reservation?</h2>
            <p className="text-xl text-white/90 mb-8">
              Find and book your perfect table in seconds.
            </p>
            <Link to="/search" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-lg">
              Find a Table Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;