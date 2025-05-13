export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  photos: string[];
  bookingsToday: number;
  phoneNumber: string;
  website: string;
  features: string[];
}

export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  userId: string;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'restaurant' | 'admin';
}

export interface RestaurantAnalytics {
  totalReservations: number;
  averageRating: number;
  popularTimeSlots: {
    time: string;
    count: number;
  }[];
  reservationsByDay: {
    date: string;
    count: number;
  }[];
}