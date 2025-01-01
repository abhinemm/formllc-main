import Steps from "@/models/steps";
import { NextResponse } from "next/server";

export async function GET() {
  const steps = await Steps.findAll({});
  return NextResponse.json(steps);
}