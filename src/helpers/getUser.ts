import { AuthUser } from "@/types/global";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"; // ✅ must be this

const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(token)
    }, 1000)
  )
};

export default getUser;
