import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import UserService from "@/services/user.model.service";
import Company from "@/models/company";
import { Op } from "sequelize";
import Payments from "@/models/payments.model";

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
    const adminUser: any = await UserService.findOne({ type: "admin" });
    const where: any = {};

    // Add default where condition for userId if not admin
    if (adminUser?.id !== data.user.id) {
      const companies = await Company.findAll({
        where: { userId: data.user.id },
      });
      if (companies?.length) {
        where.companyId = {
          [Op.in]: companies.map((el) => el.id),
        };
      }
    }

    // Dynamically add all query params to the where condition
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
