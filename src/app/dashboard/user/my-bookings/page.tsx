"use client"
import Link from "next/link";
import React from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/button";
import { getMyBookings } from "@/services/bookings";
import { BookingTable } from "@/components/admin/booking-table";

export default async function MyBookingPage() {
  const bookings = await getMyBookings();
  return (
    <div>
      <div className="m-10">
        <Link href="/dashboard/admin/create-flight">
          <Button className="bg-primary font-medium text-white flex items-center gap-2 hover:scale-110 hover:cursor-pointer">
            Add Flight <Plus />
          </Button>
        </Link>
      </div>
      <BookingTable allBookings={bookings.data} />
    </div>
  );
}
