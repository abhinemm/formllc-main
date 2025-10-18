// app/api/send/route.ts
export const runtime = "nodejs"; // Nodemailer needs Node, not Edge

import { getTransporter } from "@/lib/mail";
import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";
import { QueryTypes } from "sequelize";
import { encryptURL } from "@/helpers/CryptoHelper";
import { MexicoSub, WyomingLinkSub } from "@/constants/constants";
import { subscriptionRenewal } from "@/lib/emailTemplates";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

type Body = {
  to: string;
  subject: string;
  content?: string;
  emailType?: string;
  companyId?: number;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const data = (await getServerSession(authOptions)) as any;
    if (!data || !data.user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    if (!body.to || !body.subject) {
      return NextResponse.json(
        { ok: false, error: "Missing 'to' or 'subject'." },
        { status: 400 }
      );
    }
    if (!body.companyId) {
      return NextResponse.json(
        { ok: false, error: "Company Id is required" },
        { status: 400 }
      );
    }
    const companyDetail: any = await sequelize.query(
      `SELECT 
    companies.*, 
    users."firstName", 
    users."middleName", 
    users."lastName", 
    users.email
FROM companies
INNER JOIN users ON users.id = companies."userId"
WHERE companies.id = ${body.companyId};`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const companyDetails = companyDetail[0];
    let text = "";
    let htmlTemp = "";
    switch (body.emailType) {
      case "subscription.renewal":
        const name = companyDetails.ownerFname
          ? `${companyDetails.ownerFname}`
          : companyDetails.firstName
          ? companyDetails.firstName
          : "User";
        const amount = "25$";
        const plan_name = `${companyDetails.registrationState} Mail room Fee`;
        const status = "Inactive";
        let data = {
          companyId: body.companyId,
          type: "sub",
        };
        const encryptData = encryptURL(JSON.stringify(data));
        const paymentLink =
          companyDetails.plan == "PRO" ? WyomingLinkSub : MexicoSub;
        const finalLink = encryptData
          ? `${paymentLink}?uid=${encryptData}`
          : paymentLink;
        htmlTemp = subscriptionRenewal({
          name,
          amount,
          content: body.content!,
          plan_name,
          status,
          payment_link: finalLink,
        });
        text = "Subscription Expired";
        break;

      default:
        break;
    }

    if (htmlTemp) {
      const transporter = getTransporter();
      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: body.to,
        subject: body.subject,
        text: text || undefined,
        html: htmlTemp,
        headers: {
          "X-Entity-Ref-ID": crypto.randomUUID(),
        },
      });
      return NextResponse.json({ ok: true, messageId: info.messageId });
      // return NextResponse.json({ ok: true, messageId: "shgjsds" });
    }
    return NextResponse.json({ ok: false, messageId: "Email not send" });
  } catch (err: any) {
    // Return the error string so you can see why SMTP might fail
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
