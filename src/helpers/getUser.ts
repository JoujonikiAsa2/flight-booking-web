'use server';

import { AuthUser } from "@/types/global";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const getUser = async () => {
  // const token =  (await cookies()).get("accessToken")?.value as string
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpZCI6IjY3NGEwOGQ1ZTlkOGVhZWU1YWU4Mjk2MSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MzgxNjg0NCwiZXhwIjoxNzUzODIwNDQ0fQ._uYsnIrg3pyViEFPK9TvYuq9x7MhfN8L9gW9bFySTDo"
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
