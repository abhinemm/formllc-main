import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { Op, QueryTypes } from "sequelize";
import Payments from "@/models/payments.model";
import { UserTypesEnum } from "@/utils/constants";
import sequelize from "@/lib/sequelize";

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

  if (
    data?.user?.type === UserTypesEnum.admin ||
    data?.user?.type === UserTypesEnum.manager
  ) {
    const typeFilter = searchParams.get("type");

    let sql = `
  SELECT 
    payments.*, 
    companies."companyName", 
    companies."type" AS "ctype"
  FROM 
    payments
  INNER JOIN 
    companies 
  ON 
    companies.id = payments."companyId"
`;

    const replacements: Record<string, any> = {};

    if (typeFilter) {
      sql += ` WHERE payments."type" = :typeFilter`;
      replacements.typeFilter = typeFilter;
    }

    const payments = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements,
    });
    return NextResponse.json(payments);
  }

  try {
    // const adminUser: any = await UserService.findOne({ type: "admin" });
    const where: any = {};

    // Add default where condition for userId if not admin
    // if (adminUser?.id !== data.user.id) {
    //   const companies = await Company.findAll({
    //     where: { userId: data.user.id },
    //   });
    //   if (companies?.length) {
    //     where.companyId = {
    //       [Op.in]: companies.map((el) => el.id),
    //     };
    //   }
    // }
    searchParams.forEach((value, key) => {
      where[key] = value;
    });

    const payments = await Payments.findAll({
      where: where,
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
