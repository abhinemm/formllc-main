// app/api/send/route.ts
export const runtime = "nodejs"; // Nodemailer needs Node, not Edge

import { getTransporter } from "@/lib/mail";
import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";
import { QueryTypes } from "sequelize";
import { encryptURL } from "@/helpers/CryptoHelper";
import { MexicoSub, WyomingLinkSub } from "@/constants/constants";
import { enqurieEmail, subscriptionRenewal } from "@/lib/emailTemplates";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import ContactUsService from "@/services/contactus.model.service";

type Body = {
  to: string;
  subject: string;
  content?: string;
  emailType?: string;
  id?: number;
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

    let text = "";
    let htmlTemp = "";
    switch (body.emailType) {
      case "subscription.renewal":
        if (!body.id) {
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
WHERE companies.id = ${body.id};`,
          {
            type: QueryTypes.SELECT,
          }
        );
        const companyDetails = companyDetail[0];
        const name: any = companyDetails.ownerFname
          ? `${companyDetails.ownerFname}`
          : companyDetails.firstName
          ? companyDetails.firstName
          : "User";
        const amount = "25$";
        const plan_name = `${companyDetails.registrationState} Mail room Fee`;
        const status = "Inactive";
        let data = {
          id: body.id,
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
      case "enquire.replay":
        const contactUs = await ContactUsService.findOne({
          id: body.id!,
        });
        const userName = contactUs?.subject || "User";
        const enquiryContent = body.content || "No content provided";
        htmlTemp = enqurieEmail({ content: enquiryContent, name: userName });
        text = "Enquiry Response";
        break;
      default:
        break;
    }

    if (htmlTemp) {
      const transporter = getTransporter();

      // ensure we have a reasonable plain-text fallback (helps deliverability)
      const stripHtml = (html: string) =>
        html
          .replace(/<\/?[^>]+(>|$)/g, "") // remove tags
          .replace(/&nbsp;|\s+/g, " ")
          .trim();

      const fullText = (text && text.length > 20) ? text : stripHtml(htmlTemp) || text || "";

      // build List-Unsubscribe header from FROM_EMAIL domain and optional BASE_URL
      const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || "no-reply@localhost";
      const fromDomain = fromEmail.includes("@") ? fromEmail.split("@")[1] : undefined;
      const mailtoUnsub = fromDomain ? `mailto:unsubscribe@${fromDomain}?subject=unsubscribe` : undefined;
      const urlUnsub = (process.env.BASE_URL || (fromDomain ? `https://${fromDomain}` : undefined))
        ? `${process.env.BASE_URL || `https://${fromDomain}`}/unsubscribe?email=${encodeURIComponent(body.to)}`
        : undefined;

      const listUnsubscribeParts = [] as string[];
      if (mailtoUnsub) listUnsubscribeParts.push(`<${mailtoUnsub}>`);
      if (urlUnsub) listUnsubscribeParts.push(`<${urlUnsub}>`);

      const headers: Record<string, string> = {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      };
      if (listUnsubscribeParts.length) {
        headers["List-Unsubscribe"] = listUnsubscribeParts.join(", ");
      }

      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: body.to,
        subject: body.subject,
        text: fullText || undefined,
        html: htmlTemp,
        replyTo: process.env.REPLY_TO || process.env.FROM_EMAIL,
        envelope: {
          from: process.env.SMTP_ENVELOPE_FROM || process.env.FROM_EMAIL,
          to: body.to,
        },  
        headers,
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
