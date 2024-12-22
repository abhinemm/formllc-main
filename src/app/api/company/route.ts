import { NextResponse } from "next/server";
import Company, {
  CompanyAttributes,
  CompanyWithUserAttributes,
} from "@/models/company";
import { useSession } from "next-auth/react";
import UserService from "@/services/user.model.service";
import CompanyService from "@/services/company.model.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const data = (await getServerSession(authOptions)) as any;
  console.log(data);
  if(!data || !data.user){
    
  }
  
  try {
    const companies = await Company.findAll();
    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { data: session, status } = (await getServerSession(authOptions)) as any;
  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  const {
    currency,
    registrationState,
    companyType,
  }: CompanyWithUserAttributes = await req.json();
  try {
    const userExist = await UserService.findOne({ email: session.user?.email });
    if (!userExist) {
      return NextResponse.json(
        { message: "User not existed" },
        { status: 404 }
      );
    }
    userExist.currency = currency;
    await userExist.save();

    const companyExisted = await CompanyService.findOne({
      userId: userExist.id,
    });
    if (companyExisted) {
      return NextResponse.json({ message: "Company exists!" }, { status: 400 });
    }

    const newCompany = await Company.create({
      registrationState,
      type: companyType,
      userId: userExist.id,
    });
    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
