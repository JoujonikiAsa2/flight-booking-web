"use client";

import FlightForm from "@/components/admin/flight-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { TFlight, TFlightData } from "@/types/global";
import { updateFlight } from "@/services/flights";

export default function UpdateFlightPage({ flight }: { flight: TFlightData | null }) {
    console.log(flight)
  const router = useRouter();


  const handleUpdate = async (data: Omit<TFlight, "_id" | "seats">) => {
    try {
      const res = await updateFlight(flight?.flight?._id as string, data)
      if(res.ok){
        toast.success("Flight updated!");
      router.push("/dashboard/admin/flights");
      }
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  return (
    <div className="p-6">
      <FlightForm
        defaultValues={{
          airline: flight?.flight?.airline,
          flight_number: flight?.flight?.flight_number,
          origin: flight?.flight?.origin,
          destination: flight?.flight?.destination,
          date: flight?.flight?.date,
          time: flight?.flight?.time,
          price: flight?.flight?.price,
          availability: flight?.flight?.availability,
        }}
        onSubmit={handleUpdate}
        isEditMode
      />
    </div>
  );
}
