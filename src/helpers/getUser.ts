'use server';

import { AuthUser } from "@/types/global";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const getUser = async () => {
  const token =  (await cookies()).get("accessToken")?.value as string
  if (!token) {
    return null; 
  }

  try {
    const user = jwtDecode<AuthUser>(token);
    console.log(user)
    return user;
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return null;
  }
};

export default getUser;
