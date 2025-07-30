"use server";
import { cookies } from "next/headers";

const removeTokenFromCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};

export default removeTokenFromCookie;