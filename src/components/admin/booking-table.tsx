"use client";
import { deleteBookingById } from "@/services/bookings";
import { TBooking } from "@/types/global";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";

export function BookingTable({ allBookings }: { allBookings: TBooking[] }) {
    const user = useAppSelector(currentUser)
  const [bookings, setBookings] = React.useState(allBookings);
  const handleDelete = async (id: string) => {
    const res = await deleteBookingById(id);
    toast.success(res.message);
    const updated = bookings?.filter((item: TBooking) => item._id !== id);
    setBookings(updated);
  };
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white m-10">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Airline</th>
            <th className="px-4 py-3">Flight No</th>
            <th className="px-4 py-3">Origin</th>
            <th className="px-4 py-3">Destination</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Seats Booked</th>
            <th className="px-4 py-3">Total Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Payment</th>
            {user?.role === "ADMIN" && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {bookings?.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{booking?.flightId?.airline}</td>
              <td className="px-4 py-3">{booking?.flightId?.flight_number}</td>
              <td className="px-4 py-3">{booking?.flightId?.origin}</td>
              <td className="px-4 py-3">{booking?.flightId?.destination}</td>
              <td className="px-4 py-3">{booking?.flightId?.date}</td>
              <td className="px-4 py-3">{booking?.flightId?.time}</td>
              <td className="px-4 py-3">
                {booking?.seatsBooked.map((seat) => seat?.seatNumber).join(", ")}
              </td>
              <td className="px-4 py-3">${booking?.totalPrice}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    booking?.bookingStatus === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.bookingStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking?.bookingStatus}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    booking?.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : booking?.paymentStatus === "Unpaid"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking?.paymentStatus}
                </span>
              </td>
              {user?.role === "ADMIN" ? <td className="px-4 py-3 whitespace-nowrap">
                <Link href={`/dashboard/admin/update-booking/${booking?._id}`}>
                  <button className="text-blue-600 hover:underline mr-3">
                    Edit
                  </button>
                </Link>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(booking?._id)}
                >
                  Delete
                </button>
              </td> : ""}
            </tr>
          ))}

          {bookings?.length === 0 && (
            <tr>
              <td colSpan={11} className="px-4 py-6 text-center text-gray-500">
                No bookings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
