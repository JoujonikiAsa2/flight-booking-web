"use server";

export const getFlights = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const filterFlights = async(params:string) =>{
    try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/search?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
