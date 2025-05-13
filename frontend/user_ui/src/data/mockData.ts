import { Restaurant, Reservation, Review, TimeSlot } from '../types';

// Mock Restaurants Data
export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    description: 'Experience authentic Italian cuisine in a charming rustic setting. Our menu features handmade pasta, wood-fired pizzas, and a carefully curated wine list.',
    cuisine: 'Italian',
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 324,
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 11:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '10:00 AM - 11:00 PM',
      sunday: '10:00 AM - 9:00 PM'
    },
    photos: [
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    bookingsToday: 42,
    phoneNumber: '(415) 555-1234',
    website: 'https://example.com/bellaitalia',
    features: ['Outdoor Seating', 'Full Bar', 'Private Dining', 'Wheelchair Accessible']
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    description: 'Fresh, innovative sushi and Japanese dishes in a modern atmosphere. Our sushi chefs have trained in Japan and provide an authentic experience.',
    cuisine: 'Japanese',
    priceRange: '$$',
    rating: 4.9,
    reviewCount: 268,
    address: {
      street: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA'
    },
    hours: {
      monday: 'Closed',
      tuesday: '12:00 PM - 10:00 PM',
      wednesday: '12:00 PM - 10:00 PM',
      thursday: '12:00 PM - 10:00 PM',
      friday: '12:00 PM - 11:00 PM',
      saturday: '12:00 PM - 11:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    photos: [
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/2098143/pexels-photo-2098143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    bookingsToday: 36,
    phoneNumber: '(415) 555-5678',
    website: 'https://example.com/sakurasushi',
    features: ['Takeout', 'Delivery', 'Vegetarian Options', 'Gluten-Free Options']
  },
  {
    id: '3',
    name: 'Harvest Table',
    description: 'Farm-to-table cuisine featuring seasonal ingredients and craft cocktails. Our chef works directly with local farmers to create a menu that changes with the seasons.',
    cuisine: 'American',
    priceRange: '$$',
    rating: 4.5,
    reviewCount: 193,
    address: {
      street: '789 Oak St',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94607',
      country: 'USA'
    },
    hours: {
      monday: '5:00 PM - 10:00 PM',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 11:00 PM',
      saturday: '10:00 AM - 11:00 PM',
      sunday: '10:00 AM - 3:00 PM'
    },
    photos: [
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    bookingsToday: 28,
    phoneNumber: '(510) 555-9012',
    website: 'https://example.com/harvesttable',
    features: ['Organic', 'Locally Sourced', 'Full Bar', 'Sunday Brunch']
  },
  {
    id: '4',
    name: 'Spice Route',
    description: 'Authentic Indian cuisine featuring regional specialties and traditional tandoor cooking. Our spices are imported directly from India.',
    cuisine: 'Indian',
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 156,
    address: {
      street: '101 Valencia St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'USA'
    },
    hours: {
      monday: '11:30 AM - 10:00 PM',
      tuesday: '11:30 AM - 10:00 PM',
      wednesday: '11:30 AM - 10:00 PM',
      thursday: '11:30 AM - 10:00 PM',
      friday: '11:30 AM - 10:30 PM',
      saturday: '11:30 AM - 10:30 PM',
      sunday: '11:30 AM - 9:30 PM'
    },
    photos: [
      'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    bookingsToday: 22,
    phoneNumber: '(415) 555-3456',
    website: 'https://example.com/spiceroute',
    features: ['Vegetarian Options', 'Vegan Options', 'Delivery', 'Catering']
  },
  {
    id: '5',
    name: 'Le Bistro',
    description: 'Classic French cuisine in an elegant setting. Our chef trained in Paris and brings authentic techniques to create a memorable dining experience.',
    cuisine: 'French',
    priceRange: '$$$$',
    rating: 4.8,
    reviewCount: 278,
    address: {
      street: '222 Pine St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
      country: 'USA'
    },
    hours: {
      monday: 'Closed',
      tuesday: '5:30 PM - 10:00 PM',
      wednesday: '5:30 PM - 10:00 PM',
      thursday: '5:30 PM - 10:00 PM',
      friday: '5:30 PM - 11:00 PM',
      saturday: '5:00 PM - 11:00 PM',
      sunday: '5:00 PM - 9:00 PM'
    },
    photos: [
      'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    bookingsToday: 34,
    phoneNumber: '(415) 555-7890',
    website: 'https://example.com/lebistro',
    features: ['Wine Pairing', 'Private Dining', 'Sommelier', 'Tasting Menu']
  },
  {
    id: '6',
    name: 'El Toro Taqueria',
    description: 'Authentic Mexican street food and craft margaritas in a vibrant, casual atmosphere. All of our tortillas are made in-house daily.',
    cuisine: 'Mexican',
    priceRange: '$',
    rating: 4.4,
    reviewCount: 312,
    address: {
      street: '333 Mission St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 11:00 PM',
      friday: '11:00 AM - 1:00 AM',
      saturday: '11:00 AM - 1:00 AM',
      sunday: '11:00 AM - 9:00 PM'
    },
    photos: [
      'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ],
    bookingsToday: 18,
    phoneNumber: '(415) 555-2345',
    website: 'https://example.com/eltoro',
    features: ['Happy Hour', 'Outdoor Seating', 'Full Bar', 'Late Night']
  }
];

// Mock Reservations for current user
export const mockUserReservations: Reservation[] = [
  {
    id: '101',
    restaurantId: '1',
    restaurantName: 'Bella Italia',
    userId: '1',
    date: '2025-05-15',
    time: '19:00',
    partySize: 2,
    status: 'confirmed',
    createdAt: '2025-05-10T14:30:00Z'
  },
  {
    id: '102',
    restaurantId: '3',
    restaurantName: 'Harvest Table',
    userId: '1',
    date: '2025-05-20',
    time: '18:30',
    partySize: 4,
    status: 'confirmed',
    createdAt: '2025-05-12T09:15:00Z'
  },
  {
    id: '103',
    restaurantId: '2',
    restaurantName: 'Sakura Sushi',
    userId: '1',
    date: '2025-04-25',
    time: '20:00',
    partySize: 3,
    status: 'completed',
    createdAt: '2025-04-20T18:45:00Z'
  },
  {
    id: '104',
    restaurantId: '5',
    restaurantName: 'Le Bistro',
    userId: '1',
    date: '2025-04-10',
    time: '19:30',
    partySize: 2,
    status: 'cancelled',
    createdAt: '2025-04-05T11:20:00Z'
  }
];

// Mock Reviews
export const mockReviews: Record<string, Review[]> = {
  '1': [
    {
      id: '201',
      restaurantId: '1',
      userId: '5',
      userName: 'Sarah J.',
      rating: 5,
      comment: 'Amazing experience! The pasta was authentic and the service was impeccable.',
      date: '2025-04-15'
    },
    {
      id: '202',
      restaurantId: '1',
      userId: '6',
      userName: 'Michael T.',
      rating: 4,
      comment: 'Great food and atmosphere. Slightly pricey but worth it for a special occasion.',
      date: '2025-04-10'
    },
    {
      id: '203',
      restaurantId: '1',
      userId: '7',
      userName: 'Jennifer L.',
      rating: 5,
      comment: 'Best Italian food in the city. The tiramisu is to die for!',
      date: '2025-04-05'
    }
  ],
  '2': [
    {
      id: '204',
      restaurantId: '2',
      userId: '8',
      userName: 'David C.',
      rating: 5,
      comment: 'Exceptional sushi. Fresh fish and creative rolls. Will definitely be back!',
      date: '2025-04-18'
    },
    {
      id: '205',
      restaurantId: '2',
      userId: '9',
      userName: 'Emily R.',
      rating: 5,
      comment: 'Amazing omakase experience. The chef was friendly and the fish was the freshest I\'ve had.',
      date: '2025-04-12'
    }
  ],
  '3': [
    {
      id: '206',
      restaurantId: '3',
      userId: '10',
      userName: 'Robert K.',
      rating: 4,
      comment: 'Loved the farm-to-table concept. The seasonal vegetables were delicious.',
      date: '2025-04-20'
    },
    {
      id: '207',
      restaurantId: '3',
      userId: '11',
      userName: 'Lisa M.',
      rating: 5,
      comment: 'Great atmosphere and even better food. The craft cocktails were exceptional.',
      date: '2025-04-15'
    }
  ]
};

// Mock Available Time Slots
export const getAvailableTimeSlots = (restaurantId: string, date: string): TimeSlot[] => {
  // In a real app, this would come from the backend based on the restaurant's availability
  return [
    { time: '17:00', available: true },
    { time: '17:30', available: true },
    { time: '18:00', available: true },
    { time: '18:30', available: restaurantId !== '5' },
    { time: '19:00', available: restaurantId !== '2' },
    { time: '19:30', available: restaurantId !== '3' },
    { time: '20:00', available: true },
    { time: '20:30', available: restaurantId !== '1' },
    { time: '21:00', available: restaurantId !== '4' }
  ];
};

// Mock Analytics Data for Admin Dashboard
export const mockAnalytics = {
  totalReservations: 156,
  totalRestaurants: 28,
  activeUsers: 523,
  reservationsByDay: [
    { date: '2025-04-01', count: 42 },
    { date: '2025-04-02', count: 38 },
    { date: '2025-04-03', count: 45 },
    { date: '2025-04-04', count: 62 },
    { date: '2025-04-05', count: 78 },
    { date: '2025-04-06', count: 54 },
    { date: '2025-04-07', count: 35 }
  ],
  popularRestaurants: [
    { id: '1', name: 'Bella Italia', reservations: 47 },
    { id: '5', name: 'Le Bistro', reservations: 32 },
    { id: '2', name: 'Sakura Sushi', reservations: 28 },
    { id: '3', name: 'Harvest Table', reservations: 23 },
    { id: '4', name: 'Spice Route', reservations: 18 }
  ],
  pendingApprovals: [
    {
      id: '101',
      name: 'Urban Grill',
      cuisine: 'American',
      submittedDate: '2025-04-10',
      ownerName: 'James Wilson'
    },
    {
      id: '102',
      name: 'Golden Dragon',
      cuisine: 'Chinese',
      submittedDate: '2025-04-12',
      ownerName: 'Lucy Chen'
    },
    {
      id: '103',
      name: 'Olive Garden',
      cuisine: 'Mediterranean',
      submittedDate: '2025-04-15',
      ownerName: 'Marco Romano'
    }
  ]
};

// Mock Restaurant Analytics for Restaurant Dashboard
export const mockRestaurantAnalytics: RestaurantAnalytics = {
  totalReservations: 124,
  averageRating: 4.7,
  popularTimeSlots: [
    { time: '19:00', count: 38 },
    { time: '18:30', count: 32 },
    { time: '20:00', count: 29 },
    { time: '18:00', count: 25 }
  ],
  reservationsByDay: [
    { date: '2025-04-01', count: 15 },
    { date: '2025-04-02', count: 12 },
    { date: '2025-04-03', count: 18 },
    { date: '2025-04-04', count: 22 },
    { date: '2025-04-05', count: 28 },
    { date: '2025-04-06', count: 20 },
    { date: '2025-04-07', count: 9 }
  ]
};