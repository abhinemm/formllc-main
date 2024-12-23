import { NextResponse } from "next/server";
import User, { UserAttributes } from "../../../models/user";
import { createPassword } from "@/utils/helper";

export async function GET() {
  try {
    const users = await User.findAll();
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
