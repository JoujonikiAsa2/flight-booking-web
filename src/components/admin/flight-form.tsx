import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/input";
import type { TFlight, TSeat } from "@/types/global";

type TFlightFormFields = Pick<
  TFlight,
  | "airline"
  | "flight_number"
  | "origin"
  | "destination"
  | "date"
  | "time"
  | "price"
  | "availability"
  | "seats"
>;

interface FlightFormProps {
  defaultValues?: Partial<TFlightFormFields>;
  onSubmit: (data: TFlightFormFields) => void;
  isEditMode?: boolean;
  isLoading?: boolean;
}

const FlightForm: React.FC<FlightFormProps> = ({
  defaultValues,
  onSubmit,
  isEditMode = false,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TFlightFormFields>({
    defaultValues: {
      airline: "",
      flight_number: "",
      origin: "",
      destination: "",
      date: "",
      time: "",
      price: 0,
      seats: [],
      availability: true,
      ...defaultValues,
    },
  });

  const [seatInput, setSeatInput] = React.useState("");
  const [seats, setSeats] = React.useState<string[]>([]);

  const handleAddSeat = () => {
    setValue("seats", seats);
    const updatedSeats = [...seats, seatInput.toUpperCase()];
    setSeats(updatedSeats);
  };

  const handleRemoveSeat = (seat: string) => {
    const updatedSeats = seats?.filter((s: any) => s !== seat);
    setSeats(updatedSeats);
    setValue("seats", updatedSeats);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditMode ? "Update Flight" : "Create New Flight"}
      </h2>

      {[
        { label: "Airline", name: "airline", type: "text" },
        { label: "Flight Number", name: "flight_number", type: "text" },
        { label: "Origin", name: "origin", type: "text" },
        { label: "Destination", name: "destination", type: "text" },
        { label: "Date", name: "date", type: "date" },
        { label: "Time", name: "time", type: "time" },
        { label: "Price", name: "price", type: "number" },
      ].map(({ label, name, type }) => (
        <div key={name} className="flex flex-col gap-1">
          <label htmlFor={name} className="font-medium text-sm">
            {label}
          </label>
          <Input
            id={name}
            type={type}
            placeholder={`Enter ${label.toLowerCase()}`}
            {...register(name as keyof TFlightFormFields, { required: true })}
          />
          {errors[name as keyof TFlightFormFields] && (
            <span className="text-red-500 text-xs">{label} is required</span>
          )}
        </div>
      ))}

      {/* Availability */}
      <div className="flex items-center gap-2">
        <input
          id="availability"
          type="checkbox"
          {...register("availability")}
          className="w-5 h-5 border-gray-300 rounded"
        />
        <label
          htmlFor="availability"
          className="text-sm font-medium text-gray-700"
        >
          Available for Booking
        </label>
      </div>
      {/* Seats Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="seats" className="font-medium text-sm">
          Add Seats
        </label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={seatInput}
            onChange={(e) => setSeatInput(e.target.value)}
            placeholder="e.g. 1A"
          />
          <button
            type="button"
            onClick={handleAddSeat}
            className="px-3 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {seats?.map((seat: string) => (
            <span
              key={seat}
              className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
            >
              {seat}
              <button
                type="button"
                onClick={() => handleRemoveSeat(seat)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 bg-foreground text-white rounded hover:opacity-90 transition"
      >
        {isLoading ? (
          <span className="animate-pulse">Saving...</span>
        ) : (
          <span>{isEditMode ? "Update Flight" : "Create Flight"}</span>
        )}
      </button>
    </form>
  );
};

export default FlightForm;
