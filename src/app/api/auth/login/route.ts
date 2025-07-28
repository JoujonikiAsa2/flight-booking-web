import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
 try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const response = await res.json();
    console.log(response.data.token);
    (await cookies()).set("accessToken", response.data.token);

    return NextResponse.json(response, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}