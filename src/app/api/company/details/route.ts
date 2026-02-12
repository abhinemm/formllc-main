import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { UserTypesEnum } from "@/utils/constants";
import sequelize from "@/lib/sequelize";
import { QueryTypes } from "sequelize";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");

  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  if (
    data.user.type == UserTypesEnum.customer ||
    data.user.type == UserTypesEnum.manager
  ) {
    return NextResponse.json(
      { message: "User don't have permission" },
      { status: 401 }
    );
  }
  if (!id) {
    return NextResponse.json(
      { message: "Company id is required" },
      { status: 400 }
    );
  }

  try {
    // const adminUser: any = await UserService.findOne({ type: "admin" });

    let companies: any;
    companies = await sequelize.query(
      `
        SELECT companies.*, users."firstName", users.email, users."middleName", users."lastName"
        FROM companies
        INNER JOIN users ON users.id = companies."userId"
        WHERE companies.id = ${id}
        ORDER BY companies.id DESC
      `,
      {
        type: QueryTypes.SELECT, // ✅ this now works
      }
    );

    return NextResponse.json(companies);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
