// app/api/send/route.ts
import { verifyJwtToken } from "@/lib/jwthadler";
import User from "@/models/user";
import { createPassword } from "@/utils/helper";
import { NextResponse } from "next/server";

type Body = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing token." },
        { status: 401 }
      );
    }
    const { valid, decoded, message } = verifyJwtToken(token);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: message },
        { status: 401 }
      );
    }
    if (!body.email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }
    if (!body.password) {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 }
      );
    }

    const userExist = await User.findOne({ where: { email: body.email } });
    if (!userExist) {
      return NextResponse.json({ error: "User not exist" }, { status: 404 });
    }
    if (decoded.id !== userExist.id) {
      return NextResponse.json(
        { success: false, error: "Password reset failed" },
        { status: 400 }
      );
    }

    const hashed = await createPassword(body.password);
    userExist.password = hashed;
    await userExist.save();
    return NextResponse.json(
      { success: true, message: "Your password has been reset successfully." },
      { status: 200 }
    );
  } catch (err: any) {
    // Return the error string so you can see why SMTP might fail
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
