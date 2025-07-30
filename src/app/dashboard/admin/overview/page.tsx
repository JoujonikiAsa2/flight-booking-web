import React from "react";
import Overview from "@/components/admin/overview";
import { getFlights } from "@/services/flights";
import { getBookings } from "@/services/bookings";

export default async function OverviewPage() {
  const flights = await getFlights();
  const bookings = await getBookings();
  return (
    <div>
      <Overview flights={flights.data} bookings={bookings.data}/>
    </div>
  );
}
