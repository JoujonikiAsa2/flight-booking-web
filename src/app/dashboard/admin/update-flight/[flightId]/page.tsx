import UpdateFlightPage from "@/components/admin/update-flight-form";
import { findFlightById } from "@/services/flights";
import React from "react";

export default async function UpdateFlight({
  params,
}: {
  params: { flightId: string };
}) {
  const awaitedParams = await Promise.resolve(params);
  const flight = await findFlightById(awaitedParams.flightId);
  console.log(flight)
  return (
    <div>
      <UpdateFlightPage flight={flight} />
    </div>
  );
}
