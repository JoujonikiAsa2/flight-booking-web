import Image from "next/image";
import React from "react";
import heroImage from "@/assets/hero.jpg";
export default function HeroSection() {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50.6vw] -mr-[52vw] w-screen h-[400px]">
      <Image
        src={heroImage}
        alt="Hero Image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#000000] opacity-60"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center text-white z-10">
        <h2 className="text-3xl font-bold">
          Find the Best Flights, Every Time
        </h2>
        <p className="mb-4 md:mb-0">
          Compare prices, explore routes, and book your perfect flight in
          minutes.
        </p>
      </div>
    </div>
  );
}
