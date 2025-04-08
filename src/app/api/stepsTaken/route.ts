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
    where[key] = Number(value) ? Number(value) : value;
  });
  const stepsTaken = await StepsTaken.findAll({ where: where });

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
  const searchParams = url.searchParams;
  const where: any = {};
  searchParams.forEach((value, key) => {
    where[key] = +value;
  });

  const body = await req.json();

  const stepsTaken = await StepsTaken.findOne({ where: where });
  if (!stepsTaken) {
    return NextResponse.json(
      { message: "Steps Taken not Found" },
      { status: 404 }
    );
  }
  const id: any = stepsTaken?.id;

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
