import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Camera, Clock, Trash } from 'lucide-react';
import { Restaurant } from '../../types';
import { mockRestaurants } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const RestaurantEditPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [priceRange, setPriceRange] = useState<'$' | '$$' | '$$$' | '$$$$'>('$$');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  
  // Address state
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  
  // Hours state
  const [hours, setHours] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  });
  
  // Features state
  const [features, setFeatures] = useState<string[]>([]);
  
  useEffect(() => {
    const loadRestaurantData = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call to get the restaurant data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo, use the first restaurant's data
      const restaurant = mockRestaurants[0];
      
      setName(restaurant.name);
      setDescription(restaurant.description);
      setCuisine(restaurant.cuisine);
      setPriceRange(restaurant.priceRange);
      setPhoneNumber(restaurant.phoneNumber);
      setWebsite(restaurant.website);
      setPhotos(restaurant.photos);
      
      setStreet(restaurant.address.street);
      setCity(restaurant.address.city);
      setState(restaurant.address.state);
      setZipCode(restaurant.address.zipCode);
      
      setHours(restaurant.hours);
      setFeatures(restaurant.features);
      
      setLoading(false);
    };
    
    loadRestaurantData();
  }, []);
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    
    // In a real app, this would be an API call to update the restaurant
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaving(false);
    navigate('/restaurant-dashboard');
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would handle file uploads
    console.log('Photo upload:', e.target.files);
  };
  
  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Restaurant Profile</h1>
          <p className="mt-1 text-gray-600">Update your restaurant's information and settings</p>
        </div>
      </div>
      
      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">Restaurant Name</label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                rows={4}
                className="form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cuisine" className="form-label">Cuisine Type</label>
                <input
                  type="text"
                  id="cuisine"
                  className="form-input"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="price-range" className="form-label">Price Range</label>
                <select
                  id="price-range"
                  className="form-select"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as '$' | '$$' | '$$$' | '$$$$')}
                  required
                >
                  <option value="$">$ (Inexpensive)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (Expensive)</option>
                  <option value="$$$$">$$$$ (Very Expensive)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="website" className="form-label">Website</label>
                <input
                  type="url"
                  id="website"
                  className="form-input"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="street" className="form-label">Street Address</label>
                  <input
                    type="text"
                    id="street"
                    className="form-input"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    id="city"
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="form-label">State</label>
                  <input
                    type="text"
                    id="state"
                    className="form-input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="form-label">ZIP Code</label>
                  <input
                    type="text"
                    id="zip"
                    className="form-input"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hours */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Business Hours</h2>
          
          <div className="space-y-4">
            {Object.entries(hours).map(([day, time]) => (
              <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label htmlFor={`hours-${day}`} className="capitalize font-medium text-gray-700">
                  {day}
                </label>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    id={`hours-${day}`}
                    className="form-input"
                    value={time}
                    onChange={(e) => setHours(prev => ({ ...prev, [day]: e.target.value }))}
                    placeholder="e.g., 11:00 AM - 10:00 PM"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Photos */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Photos</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo}
                  alt={`Restaurant photo ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            <label className="relative block h-48 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 hover:text-primary-500">
                <Camera className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Add Photo</span>
              </div>
            </label>
          </div>
        </div>
        
        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Restaurant Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Outdoor Seating',
              'Full Bar',
              'Private Dining',
              'Wheelchair Accessible',
              'Takeout',
              'Delivery',
              'Vegetarian Options',
              'Vegan Options',
              'Gluten-Free Options',
              'Happy Hour',
              'Live Music',
              'Wine List'
            ].map((feature) => (
              <label key={feature} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/restaurant-dashboard')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantEditPage;