import { NextResponse } from "next/server";
import CompanyService from "@/services/company.model.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import Steps from "@/models/steps";
import CompanyDocuments, {
  CompanyDocumentsAttributes,
} from "@/models/companyDocuments";
import Company from "@/models/company";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const where: any = {};
    // Dynamically add all query params to the where condition
    searchParams.forEach((value, key) => {
      where[key] = value;
    });

    const companiesDocs = await CompanyDocuments.findAll({
      where: where,
    });

    return NextResponse.json(companiesDocs);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  const payload: CompanyDocumentsAttributes = await req.json();
  const step = await Steps.findByPk(payload.stepId);
  if (!step) {
    return NextResponse.json({ error: "Step not found!" }, { status: 404 });
  }
  const company = await Company.findByPk(payload.companyId);
  if (!company) {
    return NextResponse.json({ error: "Company not found!" }, { status: 404 });
  }
  try {
    const createdCompanyDocument = await CompanyDocuments.create(payload);
    return NextResponse.json(createdCompanyDocument, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    // return NextResponse.json(
    //   { message: "User not authenticated" },
    //   { status: 401 }
    // );
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const body: any = await req.json();
  if (!id) {
    return NextResponse.json(
      {
        error: "id is required!",
      },
      { status: 404 }
    );
  }
  const companyDoc = await CompanyDocuments.findByPk(+id);

  if (!companyDoc) {
    return NextResponse.json(
      {
        error: "CompanyDocument doesn't exist!",
      },
      { status: 400 }
    );
  }

  const updatedCompanyDoc = await CompanyDocuments.update(body, {
    where: { id },
  });

  return NextResponse.json(
    {
      message: "CompanyDocument updated successfully!",
      data: updatedCompanyDoc,
    },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    // return NextResponse.json(
    //   { message: "User not authenticated" },
    //   { status: 401 }
    // );
  }

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
  const companyDoc = await CompanyDocuments.findByPk(id);
  if (!companyDoc) {
    return NextResponse.json(
      {
        error: "companyDocument doesn't exist!",
      },
      { status: 400 }
    );
  }

  await CompanyService.delete(companyDoc.id!);
  return NextResponse.json(
    {
      message: "Company deleted successfully!",
      data: null,
    },
    { status: 200 }
  );
}
