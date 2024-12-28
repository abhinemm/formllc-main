import { NextResponse } from "next/server";
import User, { UserAttributes } from "../../../models/user";
import { createPassword } from "@/utils/helper";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const where: any = {};
  try {
    if (id) {
      where.id = id;
    }
    const users = await User.findAll({ where });
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
  }: UserAttributes = await req.json();
  try {
    console.log("firstNamefirstName", firstName);

    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashed = await createPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      middleName,
      currency,
      email,
      type,
      password: hashed,
    });
    newUser.password = undefined;
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
