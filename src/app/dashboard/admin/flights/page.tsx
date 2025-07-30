import { getFlights } from "@/services/flights";
import Link from "next/link";
import React from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/button";
import { FlightsTable } from "@/components/admin/flights-table";

export default async function DashboardFlightsPage() {
  const flights = await getFlights();
  return (
    <div>
      <div className="m-10">
        <Link href="/dashboard/admin/create-flight">
          <Button className="bg-primary font-medium text-white flex items-center gap-2 hover:scale-110 hover:cursor-pointer">
            Add Flight <Plus />
          </Button>
        </Link>
      </div>
      <FlightsTable allFlights={flights.data} />
    </div>
  );
}
