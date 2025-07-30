"use server";

import { AuthUser, TBooking } from "@/types/global";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getBookings = async () => {
  try {
const token = (await cookies()).get("accessToken")?.value as string;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch bookings");
      return { data: [] };
    }

    const result = await res.json();
    return { data: result?.data || [] };
  } catch (error) {
    console.error("Error in getBookings():", error);
    return { data: [] }; 
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

export const updateFlight = async (id: string, payload: Partial<TBooking>) => {
  try {
    const token = (await cookies()).get("accessToken")?.value as string;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const findFlightById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${id}`,
      {
        cache: "no-store",
      }
    );
    const json = await res.json();

    if (!res.ok) return null;
    return json.data;
  } catch {
    return null;
  }
};

export const deleteBookingById = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value as string;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    console.log(json);
    if (!res.ok) return null;
    return json;
  } catch {
    return null;
  }
};

export const getMyBookings = async() =>{
  try {
    const token = (await cookies()).get("accessToken")?.value as string;
     const user = jwtDecode<AuthUser>(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/user/${user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
