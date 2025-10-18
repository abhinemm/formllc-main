// app/api/send/route.ts
export const runtime = "nodejs"; // Nodemailer needs Node, not Edge

import { generateOTP } from "@/helpers/helper";
import { forgotPasswordEmail } from "@/lib/emailTemplates";
import { getTransporter } from "@/lib/mail";
import User from "@/models/user";
import { NextResponse } from "next/server";

type Body = {
  email: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const subject = "FormLLC – Password Reset Code";
    const now = new Date();
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const userExist = await User.findOne({ where: { email: body.email } });
    if (!userExist) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }
    const currentCount = userExist.otpcount ?? 0;
    if (userExist.expireAt && now < new Date(userExist.expireAt)) {
      return NextResponse.json(
        {
          error:
            "You’ve reached the OTP request limit. Please try again after the cooldown period (24 hours).",
        },
        { status: 429 }
      );
    }
    if (currentCount > 4) {
      userExist.expireAt = new Date(now.getTime() + 23 * 60 * 60 * 1000);
      await userExist.save();
      return NextResponse.json(
        {
          error:
            "You’ve reached the maximum number of OTP requests. Please wait 24 hours before trying again.",
        },
        { status: 429 }
      );
    }
    if (userExist.expireAt) {
      userExist.expireAt = null;
    }
    let otp: any = null;
    otp = generateOTP();

    userExist.otp = Number(otp);
    userExist.otpcount = userExist.otpcount ? userExist.otpcount + 1 : 1;
    await userExist.save();

    const name = userExist?.firstName ? userExist?.firstName : "User";

    const htmlTemplate = forgotPasswordEmail({ name: name, otp, validFor: 10 });

    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL, // support@getllc.io
      to: body.email,
      subject: subject,
      text: "FormLLC – Password Reset Code",
      html: htmlTemplate,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    });

    return NextResponse.json(
      { ok: true, otpCount: userExist.otpcount },
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
