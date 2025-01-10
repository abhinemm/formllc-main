import Steps from "@/models/steps";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const steps = await Steps.findAll({});
  return NextResponse.json(steps);
}

export async function POST(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  const body = await req.json();
  if (body.position) {
    const step = await Steps.findOne({ where: { position: body.position } });
    if (step) {
      return NextResponse.json(
        { message: "Step with this position already exist!" },
        { status: 400 }
      );
    }
  }
  const createdStep = await Steps.create(body);
  return NextResponse.json(createdStep);
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
  const step = await Steps.findByPk(+id);
  if (!step) {
    return NextResponse.json(
      { message: "Step not found with!" },
      { status: 404 }
    );
  }
  const body = await req.json();

  const updatedStep = await Steps.update(body, {
    where: { id: +id },
    returning: true,
  });
  return NextResponse.json(updatedStep);
}

export async function DELETE(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  const url = new URL(req.url);
  const id: any = url.searchParams.get("id");
  const step = await Steps.findByPk(+id);
  if (!step) {
    return NextResponse.json(
      { message: "Step not found with!" },
      { status: 404 }
    );
  }

  await Steps.destroy({
    where: { id: +id },
  });
  return NextResponse.json(
    { message: "Step successfully deleted!" },
    { status: 204 }
  );
}
