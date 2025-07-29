"use client";
import { ArrowLeftRight, ArrowUpDown, Search } from "lucide-react";
import React from "react";
import Input from "../ui/input";
import { TFilterProps } from "@/types/global";
import { useRouter } from "next/navigation";

export default function FilterFlight() {
  const router = useRouter();
  const [filters, setFilters] = React.useState<TFilterProps>({
    origin: "",
    destination: "",
    date: "",
    minPrice: null,
    maxPrice: null,
    airline: "",
    page: null,
    limit: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    router.push(`/?${searchParams.toString()}`);
  };

  return (
<div className="md:mt-0 mt-10 w-full mx-auto flex flex-col 2xl:flex-row md:gap-2 bg-white border rounded-xl p-4 shadow-xl">
      <div className="flex flex-col md:flex-row gap-2">
        <div className=" w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Airline name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              name="airline"
              placeholder="Search flights by number, airline, or city..."
              onChange={(e) => handleChange(e)}
              className="pl-10"
            />
          </div>
        </div>

        <div className=" w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div>
            <Input
              type="date"
              name="date"
              placeholder="Search flights by number, airline, or city..."
              onChange={(e) => handleChange(e)}
              className=""
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <div className="relative flex flex-col md:flex-row items-center gap-2 md:gap-2">
          {/* Departure Input */}
          <Input
            name="origin"
            placeholder="Departure"
            onChange={(e) => handleChange(e)}
            className="w-full md:w-1/2"
          />

          {/* Arrow for desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-primary justify-center items-center hover:cursor-pointer">
            <ArrowLeftRight size={16} className="text-white" />
          </div>

          {/* Arrow for mobile */}
          <div className="absolute top-6 left-5/6 md:hidden w-8 h-8 rounded-full bg-primary flex justify-center items-center hover:cursor-pointer">
            <ArrowUpDown size={16} className="text-white" />
          </div>

          {/* Arrival Input */}
          <Input
            name="destination"
            placeholder="Arrival"
            onChange={(e) => handleChange(e)}
            className="w-full md:w-1/2 pl-4"
          />
        </div>
      </div>
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Input
            type="number"
            name="minPrice"
            value={Number(filters.minPrice)}
            onChange={(e) => handleChange(e)}
            placeholder="Min"
          />
          <Input
            type="number"
            name="maxPrice"
            value={Number(filters.maxPrice)}
            onChange={(e) => handleChange(e)}
            placeholder="Max"
          />
          <button
            className="w-full 2xl:w-fit h-10 p-2 rounded 2xl:mt-0 bg-primary text-white"
            onClick={handleFilter}
            type="submit"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
