import { NextResponse } from "next/server";
import Company, { CompanyWithUserAttributes } from "@/models/company";
import UserService from "@/services/user.model.service";
import CompanyService from "@/services/company.model.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Op } from "sequelize";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const adminUser: any = await UserService.findOne({ type: "admin" });
    const where: any = {};
    if (adminUser?.id !== data.user.id) {
      where.userId = data.user.id;
    }
    if (id) {
      where.id = id;
    }
    const companies = await Company.findAll({
      where: where,
    });
    if (id && companies?.length) {
      try {
        companies[0].user = (await UserService.findOne({
          id: companies[0].userId,
        })) as any;
      } catch {}
    }
    return NextResponse.json(companies);
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
  const {
    currency,
    registrationState,
    companyType,
    document,
    ownerFname,
    ownerLname,
    companyName,
    companyEmail,
    streetAddress,
    city,
    state,
    zipCode,
    country,
  }: CompanyWithUserAttributes = await req.json();
  try {
    const userExist = await UserService.findOne({ email: data.user?.email });
    if (!userExist) {
      return NextResponse.json(
        { message: "User not existed" },
        { status: 404 }
      );
    }
    userExist.currency = currency;
    await userExist.save();

    // const companyExisted = await CompanyService.findOne({
    //   userId: userExist.id,
    // });
    // if (companyExisted) {
    //   return NextResponse.json({ message: "Company exists!" }, { status: 400 });
    // }

    const newCompany = await Company.create({
      registrationState,
      type: companyType,
      userId: userExist.id,
      document,
      ownerFname,
      ownerLname,
      companyName,
      companyEmail,
      streetAddress,
      city,
      state,
      zipCode,
      country,
    });
    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  const adminUser: any = await UserService.findOne({ type: "admin" });

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
  const companyData = await CompanyService.findOne({
    id,
  });
  if (!companyData) {
    return NextResponse.json(
      {
        error: "Company doesn't exist!",
      },
      { status: 400 }
    );
  }
  if (companyData?.userId !== data.user.id || data.user.id !== adminUser?.id) {
    return NextResponse.json(
      {
        error: "User have no permission to do this operation!",
      },
      { status: 403 }
    );
  }
  const updatedCompany = await CompanyService.update(companyData.id!, body);
  return NextResponse.json(
    {
      message: "Company updated successfully!",
      data: updatedCompany,
    },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  const adminUser: any = await UserService.findOne({ type: "admin" });

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
  const companyData = await CompanyService.findOne({
    id,
  });
  if (!companyData) {
    return NextResponse.json(
      {
        error: "Company doesn't exist!",
      },
      { status: 400 }
    );
  }
  if (companyData?.userId !== data.user.id || data.user.id !== adminUser?.id) {
    return NextResponse.json(
      {
        error: "User have no permission to do this operation!",
      },
      { status: 403 }
    );
  }
  await CompanyService.delete(companyData.id!);
  return NextResponse.json(
    {
      message: "Company deleted successfully!",
      data: null,
    },
    { status: 200 }
  );
}
