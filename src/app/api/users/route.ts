import { NextResponse } from "next/server";
import User, { UserAttributes } from "../../../models/user";
import { createPassword } from "@/utils/helper";
import { UserTypesEnum } from "@/utils/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const user: any = url.searchParams.get("user");

  const where: any = {};
  try {
    if (user) {
      if (!UserTypesEnum[user]) {
        return NextResponse.json(
          { error: "Failed to fetch users" },
          { status: 500 }
        );
      }
    }
    if (id) {
      where.id = id;
    }
    if (user) {
      where.type = user;
    }
    const users = await User.findAll({ where, order: [["createdAt", "DESC"]] });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    middleName,
    email,
    currency,
    password,
    type,
    commission,
  }: UserAttributes = await req.json();
  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashed = await createPassword(password);
    let createObj: any = {
      firstName,
      lastName,
      middleName,
      currency,
      email,
      type,
      password: hashed,
    };
    if (type === UserTypesEnum.member) {
      createObj.commission = commission;
    }
    const newUser = await User.create(createObj);
    newUser.password = undefined;
    return NextResponse.json(newUser, { status: 201 });
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
  const userCheck = await User.findOne({ where: { email: data.user?.email } });
  if (!userCheck) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  if (
    userCheck?.type === UserTypesEnum.admin ||
    userCheck?.type === UserTypesEnum.manager
  ) {
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
    const updateUser = await User.findOne({ where: { id: id } });
    if (!updateUser) {
      return NextResponse.json(
        { message: "Failed to fetch users" },
        { status: 401 }
      );
    }
    const updatedUser = await User.update(body, { where: { id: id } });
    return NextResponse.json(
      {
        message: "Status updated successfully!",
        data: updatedUser,
      },
      { status: 200 }
    );
  }
  try {
  } catch (error) {

    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
