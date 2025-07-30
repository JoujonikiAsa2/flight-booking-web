"use client";

import React, { useEffect, useState } from "react";
import { getBookings } from "@/services/bookings";
import { BookingTable } from "@/components/admin/booking-table";

export default function DashboardBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getBookings();
        if (!res || !res.data) throw new Error("No bookings");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings");
      }
    })();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return <BookingTable allBookings={bookings} />;
}
