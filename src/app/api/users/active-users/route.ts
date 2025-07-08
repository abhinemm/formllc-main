import { NextResponse } from "next/server";
import User, { UserAttributes } from "../../../../models/user";

import { UserTypesEnum } from "@/utils/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const url = new URL(req.url);
  // const data = (await getServerSession(authOptions)) as any;
  // if (!data || !data.user) {
  //   return NextResponse.json(
  //     { message: "User not authenticated" },
  //     { status: 401 }
  //   );
  // }
  const where: any = {
    status: 1,
    type: UserTypesEnum.customer,
  };
  console.log("wherewherewherewhere", where);

  try {
    const users = await User.findAll({
      where,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "firstName",
        "middleName",
        "lastName",
        "email",
        "type",
      ],
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log("errorerrorerrorerror", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
