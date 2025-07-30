"use client";

import FlightForm from "@/components/admin/flight-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { TFlight } from "@/types/global";

export default function CreateFlightPage() {
  const router = useRouter();

  const handleCreate = async (data: Omit<TFlight, "_id" | "seats">) => {
     const payload = {
      ...data,
      price: Number(data.price), 
    };
    try {
      // Send to API or your handler
      const res = await fetch("/api/flights", {
        method: "POST",
        body: JSON.stringify(payload),
      });
console.log(res)
      router.push("/dashboard/admin/flights");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6">
      <FlightForm onSubmit={handleCreate} />
    </div>
  );
}
