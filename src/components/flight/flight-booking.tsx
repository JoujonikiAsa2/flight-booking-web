"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Input from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard, Timer, CheckCircle, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import { AuthUser, TFlightData, TSeat } from "@/types/global";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";

export default function BookingPage({
  flight,
}: {
  flight: TFlightData | null;
}) {
  const [state, setState] = useState({
    selectedSeat: [] as string[],
    selectedSeatNumber: [] as string[],
    reservationTimer: 0,
    isReserved: false,
    isConfirmed: false,
    showPaymentDialog: false,
    bookedSeats: [] as string[],
  });
const user = useAppSelector(currentUser)
  useEffect(() => {
    if (state.reservationTimer <= 0) return;

    const interval = setInterval(() => {
      setState((prev) => {
        const newTime = prev.reservationTimer - 1;

        if (newTime <= 0) {
          toast.warning("Your seat reservation has expired.");
          return {
            ...prev,
            reservationTimer: 0,
            isReserved: false,
            selectedSeat: [],
            selectedSeatNumber: [],
          };
        }

        return {
          ...prev,
          reservationTimer: newTime,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.reservationTimer]);

  const data = {
    flightId: flight?.flight?._id,
    seatIds: state.selectedSeat,
  };

  const handleSeatSelection = (seat: string, seatNumber: string) => {
    setState((prev) => ({
      ...prev,
      selectedSeat: [...state.selectedSeat, seat],
      selectedSeatNumber: [...state.selectedSeatNumber, seatNumber],
      isReserved: true,
      reservationTimer: 120,
    }));
    toast.success(`Seat ${seatNumber} reserved for 2 minutes.`);
  };

  const confirmBooking = async () => {
    const res = await fetch(`/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.ok) {
      toast.success(response.message);
      setState((prev) => ({ ...prev, showPaymentDialog: true }));
    } else {
      toast.warning(response.message);
    }
  };

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/bookings/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isConfirmed: true,
        bookedSeats: [...state.bookedSeats, ...state.selectedSeat],
        isReserved: false,
        selectedSeat: [],
        selectedSeatNumber: [],
        reservationTimer: 0,
        showPaymentDialog: false,
      }));
      if (response.ok) {
        toast.success(response.message);
        setState((prev) => ({ ...prev, showPaymentDialog: true }));
      } else {
        toast.warning(response.message);
      }
    }, 1500);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (!flight)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className=" w-60">
          <CardHeader>
            <CardTitle>Flight Not Found</CardTitle>
            <CardDescription>
              The requested flight could not be found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/flights">
              <Button>Back to Flights</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );

  if (state.isConfirmed)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full md:w-80">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
            <CardDescription>
              Your flight has been successfully booked
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Flight:</span>
                <span>{flight.flight.flight_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Seat:</span>
                <span>{state.selectedSeatNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Route:</span>
                <span>
                  {flight.flight.origin} → {flight.flight.destination}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{flight.flight.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span className="font-bold text-primary">${flight.flight.price}</span>
              </div>
            </div>
            <Link href="/dashboard/user/my-bookings">
              <Button className="w-full bg-primary text-white">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-screen py-8 px-4">
      {/*Flight Details and Seat Selection */}
      <div className="md:flex-1 space-y-6">
        {/* Flight Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Flight Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium">{flight.flight.origin}</div>
                  <div className="text-sm text-gray-600">
                    {flight.flight.time} • {flight.flight.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium">{flight.flight.destination}</div>
                  <div className="text-sm text-gray-600">
                    {flight.flight.time} • {flight.flight.date}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seat Selection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Select Your Seat
              </span>
              {state.isReserved && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Timer className="h-3 w-3" />
                  {formatTime(state.reservationTimer)}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Choose your preferred seat. Reserved seats are shown in red.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span>Booked</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
              {flight.seats?.map((seat: TSeat) => {
                const isBooked = state.bookedSeats.includes(seat._id);
                const isSelected = state.selectedSeat.includes(seat._id);

                return (
                  <button
                    key={seat._id}
                    onClick={() =>
                      handleSeatSelection(seat._id, seat.seatNumber)
                    }
                    className={`w-8 h-8 text-xs font-medium rounded border-2 transition-colors hover:cursor-pointer
                        ${
                          isBooked
                            ? "bg-red-100 border-red-300 text-red-700 cursor-not-allowed"
                            : isSelected
                            ? "bg-blue-100 border-blue-300 bg-blue-700 text-white"
                            : "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                        }
                      `}
                    title={seat.seatNumber}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Summary  */}
      <div className="w-full md:w-72">
        <Card className="md:sticky top-4">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Flight:</span>
                <span className="font-medium">
                  {flight.flight.flight_number}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Airline:</span>
                <span>{flight.flight.airline || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>Route:</span>
                <span>
                  {flight.flight.origin} → {flight.flight.destination}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{flight.flight.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Seat:</span>
                <span className="font-medium">
                  {state.selectedSeatNumber.join(",") || "None"}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  $
                  {state.isReserved
                    ? flight.flight.price * state.selectedSeat.length
                    : 0}
                </span>
              </div>
            </div>

            {state.isReserved && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Seat reserved for {formatTime(state.reservationTimer)}
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={confirmBooking}
              disabled={!state.selectedSeat || !state.isReserved}
              className="w-full bg-primary text-white hover:cursor-pointer"
            >
              {state.selectedSeat.length === 0
                ? "Select a Seat"
                : "Confirm Booking"}
            </Button>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={state.showPaymentDialog}
        onOpenChange={() =>
          setState((prev) => ({ ...prev, showPaymentDialog: false }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Payment Details
            </DialogTitle>
            <DialogDescription>
              Complete your payment to confirm your booking
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePayment} className="space-y-4">
            <Input placeholder="Card Number" required />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="MM/YY" required />
              <Input placeholder="CVV" required />
            </div>
            <Input placeholder="Cardholder Name" required />
            <div className="bg-gray-50 p-4 rounded-lg flex justify-end font-medium">
              <span>Total: &nbsp;</span>
              <span className="text-primary">${flight.flight.price}</span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() =>
                  setState((prev) => ({ ...prev, showPaymentDialog: false }))
                }
                className="bg-foreground text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className=" bg-primary text-white">
                Pay Now
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
