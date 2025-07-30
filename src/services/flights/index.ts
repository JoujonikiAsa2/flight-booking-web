"use server";

import { TFlight } from "@/types/global";
import { cookies } from "next/headers";

export const getFlights = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights?limit=1000`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const filterFlights = async (params: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/search?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateFlight = async (id: string, payload: Partial<TFlight>) => {
  try {
    const token = (await cookies()).get("accessToken")?.value as string;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/${id}`,
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

export const deleteFlightById = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value as string;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/${id}`,
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
