"use client";
import React from "react";
import { TFlight } from "@/types/global";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FlightCard({ flight }: { flight: TFlight }) {
  return (
    <motion.div
      className="w-full bg-card shadow-md rounded-2xl p-6 flex flex-col gap-4 w-full border border-gray-100"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {flight.airline}
          </h2>
          <p className="text-sm text-gray-500">
            Flight No: {flight.flight_number}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-sm">{flight.date}</p>
          <p className="text-gray-600 text-sm">{flight.time}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-lg font-medium text-gray-700">{flight.origin}</p>
          <p className="text-xs text-gray-500">Departure</p>
        </div>

        <div className="text-gray-400 text-2xl">→</div>

        <div>
          <p className="text-lg font-medium text-gray-700">
            {flight.destination}
          </p>
          <p className="text-xs text-gray-500">Arrival</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold text-primary">${flight.price}</p>
        <Link href={`/flight-booking/${flight._id}`}>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:scale-110 hover:cursor-pointer text-sm">
            Book Now
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
