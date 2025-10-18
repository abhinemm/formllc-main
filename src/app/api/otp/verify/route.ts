// app/api/send/route.ts
import { createJwtToken } from "@/lib/jwthadler";
import User from "@/models/user";
import { NextResponse } from "next/server";

type Body = {
  email: string;
  otp: number;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (!body.email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }
    if (!body.otp) {
      return NextResponse.json(
        { success: false, error: "OTP is required" },
        { status: 400 }
      );
    }

    const userExist = await User.findOne({ where: { email: body.email } });
    if (!userExist) {
      return NextResponse.json({ error: "User not exist" }, { status: 404 });
    }
    if (userExist.otp == body.otp) {
      const token = createJwtToken(userExist.id!);
      userExist.otp = null;
      userExist.otpcount = 0;
      userExist.expireAt = null;
      await userExist.save();
      return NextResponse.json(
        { isVerified: true, token: token },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid Otp" },
      { status: 400 }
    );
  } catch (err: any) {
    // Return the error string so you can see why SMTP might fail
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
