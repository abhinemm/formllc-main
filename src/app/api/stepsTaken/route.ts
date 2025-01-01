import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import StepsTaken from "@/models/stepsTaken";

export async function GET(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const where: any = {};
  searchParams.forEach((value, key) => {
    where[key] = value;
  });
  const stepsTaken = await StepsTaken.findAll(where);
  return NextResponse.json(stepsTaken);
}

export async function PATCH(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  const url = new URL(req.url);
  const id: any = url.searchParams.get("id");
  const body = await req.json();

  const stepsTaken = await StepsTaken.findOne({ where: { id: +id } });
  if (!stepsTaken) {
    return NextResponse.json(
      { message: "Steps Taken not Found" },
      { status: 404 }
    );
  }
  try {
    await StepsTaken.update(body, { where: { id } });
    return NextResponse.json(
      { message: "Step taken Updated successfukly" },
      { status: 200 }
    );
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
