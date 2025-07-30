import { TFlight, TFlightData } from "@/types/global";
import getUser from "@/helpers/getUser";
import FlightBooking from "@/components/flight/flight-booking";

async function findFlightById(id: string): Promise<TFlightData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/${id}`,
      {
        cache: "no-store",
      }
    );
    const json = await res.json();

    if (!res.ok) return null;
    console.log(json);
    return json.data;
  } catch {
    return null;
  }
}

export default async function BookingPage({
  params,
}: {
  params: { flightId: string };
}) {
  let flight: TFlightData | null = null;

  const awaitedParams = await Promise.resolve(params);
  flight = await findFlightById(awaitedParams.flightId);

  const user = await getUser();
  return <FlightBooking flight={flight} user={user} />;
}
