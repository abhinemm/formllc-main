import { NextResponse } from "next/server";
import Company from "@/models/company";
import UserService from "@/services/user.model.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserTypesEnum } from "@/utils/constants";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  let userData: any = null;
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  console.log("data.userdata.userdata.user", data.user);

  try {
    // const adminUser: any = await UserService.findOne({ type: "admin" });
    const where: any = {};
    // Add default where condition for userId if not admin
    if (
      data.user?.type === UserTypesEnum.admin ||
      data.user?.type === UserTypesEnum.member
    ) {
      userData = data.user;
      searchParams.forEach((value, key) => {
        where[key] = value;
      });
    } else {
      return NextResponse.json(
        { error: "Unauthorize to access" },
        { status: 500 }
      );
    }
    const id = url.searchParams.get("id");
    if (data.user?.type === UserTypesEnum.admin) {
      userData = await UserService.findOne({
        id: searchParams.get("referId"),
      });
    }
    console.log("userDatauserDatauserData", userData);

    // Dynamically add all query params to the where condition

    const companies = await Company.findAll({
      where: where,
      order: [["id", "desc"]],
    });

    const commissionAmount = userData?.commission;
    console.log("commissionAmountcommissionAmount", commissionAmount);

    let Obj: any = {
      totalCompanies: companies?.length,
      totalAmountCredit: Number(commissionAmount) * companies?.length,
      amountPerCompany: commissionAmount,
      companies: companies,
    };
    if (data.user?.type === UserTypesEnum.admin) {
      Obj.user = userData;
    }

    return NextResponse.json(Obj);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
