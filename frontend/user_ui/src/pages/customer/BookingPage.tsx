import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, CreditCard, Mail, Phone, Check } from 'lucide-react';
import { Restaurant } from '../../types';
import { mockRestaurants } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const BookingPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const time = searchParams.get('time') || '19:00';
  const partySize = searchParams.get('party') || '2';
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  
  // Form state
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Credit card (for demo purposes only - in real app, use a secure payment gateway)
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  
  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (!restaurantId) return;
      
      const foundRestaurant = mockRestaurants.find(r => r.id === restaurantId);
      setRestaurant(foundRestaurant || null);
      setLoading(false);
    };
    
    fetchRestaurantData();
  }, [restaurantId]);
  
  const formatTime = (timeString: string) => {
    const hour = parseInt(timeString.split(':')[0]);
    const minute = timeString.split(':')[1];
    return hour > 12 
      ? `${hour - 12}:${minute} PM` 
      : hour === 12 
        ? `12:${minute} PM` 
        : `${hour}:${minute} AM`;
  };
  
  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep(2);
    window.scrollTo(0, 0);
  };
  
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to create a reservation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random confirmation number
    const confirmationNum = Math.random().toString(36).substring(2, 10).toUpperCase();
    setConfirmationNumber(confirmationNum);
    
    setLoading(false);
    setBookingComplete(true);
    window.scrollTo(0, 0);
  };
  
  if (loading && !bookingComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }
  
  if (!restaurant && !bookingComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h2>
          <p className="text-gray-600 mb-4">The restaurant you're trying to book doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/search')}
            className="btn btn-primary"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }
  
  // Booking Confirmation Screen
  if (bookingComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center scale-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success-500 text-white mb-6">
            <Check className="h-8 w-8" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your reservation at {restaurant?.name} has been confirmed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">Reservation Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Restaurant</p>
                <p className="font-medium">{restaurant?.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Confirmation Number</p>
                <p className="font-medium">{confirmationNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {formatTime(time)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Party Size</p>
                <p className="font-medium">{partySize} {parseInt(partySize) === 1 ? 'person' : 'people'}</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            A confirmation email has been sent to {email}.
            {phone && ` You will also receive a text message at ${phone}.`}
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <button
              onClick={() => navigate('/profile')}
              className="btn btn-primary"
            >
              View My Reservations
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              bookingStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <span className="mt-1 text-xs">Details</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${bookingStep >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              bookingStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className="mt-1 text-xs">Payment</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${bookingStep >= 3 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              bookingStep >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <span className="mt-1 text-xs">Confirmation</span>
          </div>
        </div>
      </div>
      
      {/* Booking Form */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Reservation Summary */}
        <div className="p-6 bg-gray-50 border-b">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {bookingStep === 1 ? 'Complete your reservation' : 'Confirm and pay'}
          </h1>
          
          <div className="flex items-start">
            <img
              src={restaurant?.photos[0]}
              alt={restaurant?.name}
              className="h-20 w-20 rounded-md object-cover mr-4"
            />
            
            <div>
              <h2 className="font-bold text-lg">{restaurant?.name}</h2>
              
              <div className="flex items-center mt-1 text-gray-700">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatTime(time)}</span>
                <span className="mx-2">•</span>
                <Users className="h-4 w-4 mr-1" />
                <span>{partySize} {parseInt(partySize) === 1 ? 'person' : 'people'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 1: Contact Information */}
        {bookingStep === 1 && (
          <div className="p-6">
            <form onSubmit={handleSubmitDetails}>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="form-label flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    Email <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Confirmation will be sent to this email</p>
                </div>
                
                <div>
                  <label htmlFor="phone" className="form-label flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-input"
                    placeholder="(123) 456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">For reservation updates (optional)</p>
                </div>
                
                <div>
                  <label htmlFor="special-requests" className="form-label">
                    Special Requests
                  </label>
                  <textarea
                    id="special-requests"
                    className="form-input h-24"
                    placeholder="Any special requests or occasions? (Birthday, Anniversary, etc.)"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    We'll do our best to accommodate, but special requests cannot be guaranteed.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Step 2: Payment Information */}
        {bookingStep === 2 && (
          <div className="p-6">
            <form onSubmit={handleSubmitPayment}>
              <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
              <p className="text-sm text-gray-600 mb-4">
                We require a credit card to secure your reservation. No charges will be made unless you fail to show up.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="card-name" className="form-label">
                    Name on Card <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    className="form-input"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="card-number" className="form-label flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Card Number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    className="form-input"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="card-expiry" className="form-label">
                      Expiration Date <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="card-expiry"
                      className="form-input"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="card-cvc" className="form-label">
                      CVC <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="card-cvc"
                      className="form-input"
                      placeholder="123"
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3"
                >
                  Complete Reservation
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline w-full"
                  onClick={() => setBookingStep(1)}
                >
                  Back
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this reservation, you agree to the BookTable <a href="#" className="text-secondary-500">Terms of Use</a> and <a href="#" className="text-secondary-500">Privacy Policy</a>.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;