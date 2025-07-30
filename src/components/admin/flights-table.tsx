"use client";
import { deleteFlightById } from "@/services/flights";
import { TFlight } from "@/types/global";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

interface FlightTableProps {
  allFlights: { flights: TFlight[] };
}

export function FlightsTable ({ allFlights }:FlightTableProps) {
  const [flights, setFlights] = React.useState(allFlights?.flights);
  const handleDelete = async (id: string) => {
    const res = await deleteFlightById(id);
    toast.success(res.message);
    const updated = flights?.filter((item:TFlight) => item._id !== id);
    setFlights(updated);
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
            <th className="px-4 py-3">time</th>
            <th className="px-4 py-3">Availability</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {flights?.map((flight) => (
            <tr key={flight._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{flight.airline}</td>
              <td className="px-4 py-3">{flight.flight_number}</td>
              <td className="px-4 py-3">{flight.origin}</td>
              <td className="px-4 py-3">{flight.destination}</td>
              <td className="px-4 py-3">{flight.date}</td>
              <td className="px-4 py-3">{flight.time}</td>
              <td className="px-4 py-3">{flight.availability ? "Available" : "Unavailable"}</td>
              <td className="px-4 py-3">
                <Link href={`/dashboard/admin/update-flight/${flight._id}`}>
                  <button className="text-blue-600 hover:underline mr-3">
                    Edit
                  </button>
                </Link>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(flight._id)}
                >
                  Delete
                </button>
              </td>{" "}
            </tr>
          ))}

          {flights.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                No flights available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

