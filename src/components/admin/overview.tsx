"use client";
import React from "react";
import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Plane, Users } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { currentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { TBooking, TFlight } from "@/types/global";
import { current } from "@reduxjs/toolkit";

export default function Overview({
  flights,
  bookings,
}: {
  flights: { flights: TFlight[] };
  bookings: TBooking[];
}) {
  const user = useAppSelector(currentUser);
  const totalRevenue = bookings?.reduce((acc: number, current: TBooking) => {
  return current.paymentStatus === "Paid" ? acc + current.totalPrice : acc;
}, 0);

const currentDestication = Array.from(
  new Set(flights?.flights?.map((item) => item.destination))
);

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Flights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {flights?.flights?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Available destinations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Upcoming trips</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Destinations
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentDestication?.length}</div>
              <p className="text-xs text-muted-foreground">Cities available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue || 0}</div>
              <p className="text-xs text-muted-foreground">Total earn</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your flights and bookings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/dashboard/admin/flights">
                <Button className="w-full flex items-center justify-start border rounded bg-transparent">
                  <Plane className="mr-2 h-4 w-4" />
                  Browse Flights
                </Button>
              </Link>
              <Link href="/dashboard/admin/bookings">
                <Button className="w-full flex items-center justify-start border rounded bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  All Bookings
                </Button>
              </Link>
              {user?.role === "admin" && (
                <Link href="/admin">
                  <Button className="w-full flex items-center justify-start border rounded bg-transparent">
                    <Users className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest flight activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Flight to New York booked
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Check-in completed</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Seat upgraded</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
