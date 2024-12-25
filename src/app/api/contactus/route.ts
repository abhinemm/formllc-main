import { NextResponse } from "next/server";
import { ContactUsAttributes } from "@/models/contactus";
import ContactUsService from "@/services/contactus.model.service";

export async function GET() {
  try {
    const contactusList = await ContactUsService.findAll({});
    return NextResponse.json(contactusList);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch contact us list" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const data: ContactUsAttributes = await req.json();
  try {
    const contactus = await ContactUsService.create(data);

    return NextResponse.json(contactus, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const body = await req.json();
  if (!id) {
    return NextResponse.json(
      {
        error: "id is required!",
      },
      { status: 404 }
    );
  }
  const contactUs = await ContactUsService.findOne({
    id,
  });
  if (!contactUs) {
    return NextResponse.json(
      {
        error: "Contactus doesn't exist!",
      },
      { status: 400 }
    );
  }

  const updatedContactus = await ContactUsService.update(contactUs.id!, body);
  return NextResponse.json(
    {
      message: "Contact us updated successfully!",
      data: updatedContactus,
    },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      {
        error: "id is required!",
      },
      { status: 404 }
    );
  }
  const contactusData = await ContactUsService.findOne({
    id,
  });
  if (!contactusData) {
    return NextResponse.json(
      {
        error: "contactus doesn't exist!",
      },
      { status: 400 }
    );
  }
  await ContactUsService.delete(contactusData.id!);
  return NextResponse.json(
    {
      message: "Cointact us deleted successfully!",
      data: null,
    },
    { status: 200 }
  );
}
