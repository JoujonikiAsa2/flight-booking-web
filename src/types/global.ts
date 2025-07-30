export type TSeat = {
  _id: string;
  flightId: string;
  seatNumber: string;
  isBooked: boolean;
  bookedBy: string;
  reservedAt: string | null;
  __v: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type TFlight = {
  _id: string;
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  seats?: TSeat[] | string[];
  availability: boolean;
};

export type TFlightData = {
  flight: TFlight;
  seats?: TSeat[];
};

export type TFilterProps = {
  origin: string;
  destination: string;
  date: string;
  minPrice: number | null;
  maxPrice: number | null;
  airline: string;
  page: number | null;
  limit: number | null;
};

export type AuthUser = {
  name: string;
  id: string;
  role: string;
  iat: number;
  exp: number;
};

export type TBooking = {
  _id: string;
  userId: string;
  flightId: TFlight;
  numberOfSeats: number;
  totalPrice: number;
  bookingStatus: "Confirmed" | "Pending" | "Cancelled"; 
  seatsBooked: TSeat[];
  paymentStatus: "Paid" | "Unpaid" | "Refunded"; 
  cancellationDate: string | null;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}