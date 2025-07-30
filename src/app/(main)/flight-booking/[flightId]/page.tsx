import { TFlight, TFlightData } from "@/types/global";
import getUser from "@/helpers/getUser";
import FlightBooking from "@/components/flight/flight-booking";
import { findFlightById } from "@/services/flights";

export default async function BookingPage({
  params,
}: {
  params: { flightId: string };
}) {
  let flight: TFlightData | null = null;

  const awaitedParams = await Promise.resolve(params);
  flight = await findFlightById(awaitedParams.flightId);

  return <FlightBooking flight={flight} />;
}
