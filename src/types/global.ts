export type TFlights = {
  _id: string;
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
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
    name: string
    id:string
    role: string
    iat: string
    exp:string
}