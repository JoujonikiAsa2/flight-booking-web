"use client"

import { cookies } from "next/headers";

export const getBookings = async () => {
  try {
    const token =  (await cookies()).get("accessToken")?.value as string
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const bookFlight = async (payload: {
  paylaod: { flightId: string; seats: string[] };
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
