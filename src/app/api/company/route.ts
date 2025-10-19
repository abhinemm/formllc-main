import { NextResponse } from "next/server";
import Company, { CompanyWithUserAttributes } from "@/models/company";
import UserService from "@/services/user.model.service";
import CompanyService from "@/services/company.model.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  CompanyStatus,
  StepsTakenStatusEnum,
  UserTypesEnum,
} from "@/utils/constants";
import StepsTaken from "@/models/stepsTaken";
import Steps from "@/models/steps";
import sequelize from "@/lib/sequelize";
import { QueryTypes } from "sequelize";

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
    // const adminUser: any = await UserService.findOne({ type: "admin" });
    const where: any = {};
    // Add default where condition for userId if not admin
    if (
      data.user?.type === UserTypesEnum.customer ||
      data.user?.type === UserTypesEnum.member
    ) {
      where.userId = data.user.id;
    }
    // Dynamically add all query params to the where condition
    searchParams.forEach((value, key) => {
      where[key] = value;
    });
    let companies: any;
    if (
      data.user?.type === UserTypesEnum.customer ||
      data.user?.type === UserTypesEnum.member
    ) {
      companies = await Company.findAll({
        where: where,
        order: [["id", "desc"]],
      });
    } else {
      companies = await sequelize.query(
        `
        SELECT companies.*, users."firstName", users.email, users."middleName", users."lastName"
        FROM companies
        INNER JOIN users ON users.id = companies."userId"
        WHERE companies.status = ${where.status || 1}
        ORDER BY companies.id DESC
      `,
        {
          type: QueryTypes.SELECT, // ✅ this now works
        }
      );
    }

    if (where.id && companies?.length) {
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
    status,
    mailingAdress,
    phone,
    countryCode,
    stripeEmailId,
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
      status,
      mailingAdress,
      phone,
      countryCode,
      stripeEmailId: stripeEmailId ? stripeEmailId : companyEmail,
    });
    try {
      const steps = await Steps.findAll({ where: { status: 1 } });
      for (const step of steps) {
        if (step.position === 1 && status === CompanyStatus.active) {
          await StepsTaken.create({
            companyId: newCompany.id,
            status: StepsTakenStatusEnum.completed,
            stepId: step.id,
            userId: userExist.id,
          });
        } else {
          await StepsTaken.create({
            companyId: newCompany.id,
            status: StepsTakenStatusEnum.pending,
            stepId: step.id,
            userId: userExist.id,
          });
        }
      }
    } catch {}

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
  // || data.user.id !== adminUser?.id
  if (companyData?.userId !== data.user.id) {
    return NextResponse.json(
      {
        error: "User have no permission to do this operation!",
      },
      { status: 403 }
    );
  }
  const updatedCompany = await CompanyService.update(companyData.id!, body);
  try {
    const steps = await Steps.findAll({});
    const firstStep = steps.find((el) => el.position === 1);

    if (firstStep) {
      if (body.status === 1) {
        await StepsTaken.update(
          { status: StepsTakenStatusEnum.inReview },
          {
            where: {
              stepId: firstStep.id,
              userId: companyData.userId,
              companyId: companyData.id,
            },
          }
        );
      }
    }
  } catch {}
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
