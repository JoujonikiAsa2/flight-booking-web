"use client";
import React from "react";
import FlightCard from "../shared/flight-card";
import { TFlights } from "@/types/global";
import SectionTitle from "../shared/section-title";
import { useSearchParams } from "next/navigation";

export default function FlightLists({ flights }: { flights: TFlights[] }) {
  const searchParams = useSearchParams();
  console.log(searchParams);
  return (
    <div className="pt-8 md:pt-28">
      <SectionTitle title="Flights" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} />
        ))}
      </div>
    </div>
  );
}
