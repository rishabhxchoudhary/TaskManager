import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getData } from "@/controller/usercontroller";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const data = await getData(user.email);
    return NextResponse.json({ data: data?.data });
  } catch (error) {
    error;
    return NextResponse.json({ data: [error] });
  }
}

export const dynamic = "force-dynamic";
