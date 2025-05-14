import { NextResponse } from "next/server";
import Company, { CompanyWithUserAttributes } from "@/models/company";
import UserService from "@/services/user.model.service";
import CompanyService from "@/services/company.model.service";
import { getServerSession } from "next-auth";

import {
  CompanyStatus,
  StepsTakenStatusEnum,
  UserTypesEnum,
} from "@/utils/constants";
import StepsTaken from "@/models/stepsTaken";
import Steps from "@/models/steps";

import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const data = (await getServerSession(authOptions)) as any;

  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  if (
    data.user.type != UserTypesEnum.admin ||
    data.user.type != UserTypesEnum.manager
  ) {
    return NextResponse.json(
      { message: "User does not have permission to perform this action" },
      { status: 403 }
    );
  }
  const {
    userId,
    type,
    registrationState,
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
    countryCode,
    phone,
    plan,
    subsriptionPaymentStatus,
    regPaymentStatus,
    status,
  }: CompanyWithUserAttributes = await req.json();
  try {
    const userExist = await UserService.findOne({ id: Number(userId) });
    if (!userExist) {
      return NextResponse.json(
        { message: "User not existed" },
        { status: 404 }
      );
    }

    const newCompany = await Company.create({
      registrationState,
      type,
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
      plan,
      subsriptionPaymentStatus,
      regPaymentStatus,
      phone,
      countryCode,
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
