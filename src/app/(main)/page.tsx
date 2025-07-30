// app/page.tsx
import FilterFlight from "@/components/flight/filter-flight";
import FlightLists from "@/components/flight/flight-lists";
import HeroSection from "@/components/home/hero-section";
import { filterFlights, getFlights } from "@/services/flights";
import { TFilterProps } from "@/types/global";
import React from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Partial<TFilterProps>;
}) {
  let flights;

  if (Object.keys(searchParams).length > 0) {
    const query = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, String(value));
      }
    });

    flights = await filterFlights(query.toString());
  } else {
    flights = await getFlights();
  }

  return (
    <div className="bg-secondary">
      <div className="relative">
          <HeroSection />
        <div className="w-[calc(100%-10vw)] mx-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <FilterFlight />
        </div>
      </div>
      <div className="px-[5vw] bg-secondary pb-12">
        <FlightLists flights={flights.data.flights} />
      </div>
    </div>
  );
}
