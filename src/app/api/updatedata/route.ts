import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { updateData } from "@/controller/usercontroller";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { data } = body;
    const session = await getServerSession(authOptions);
    await updateData(session.user.email, data);
    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({ data: [] });
  }
}

export const dynamic = "force-dynamic";
