import Company from "@/models/company";
import Payments from "@/models/payments.model";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { log } from "console";
import { message } from "antd";
import { generateFixedTransactionId } from "@/helpers/helper";
import { RegistrationStation } from "@/constants/constants";
import { PlansEnum } from "@/utils/constants";
import EmailService from "@/services/email.service";
import User from "@/models/user";
import {
  paymentSuccessEmail,
  subscriptionCancelled,
  subscriptionCreated,
  subscriptionRenewed,
} from "@/lib/emailTemplates";
import { Check } from "lucide-react";
import CheckoutSessions from "@/models/checkoutsessions";
import { client } from "@/utils/fanbasis";
import { encryptURL } from "@/helpers/CryptoHelper";

const crypto = require("crypto");

export async function POST(req: NextRequest) {
  const body: any = await req.json(); 
  console.log("bodybodybodybody", body);
  console.log("body?.typebody?.type", body?.type);

  // const signature = req.headers.get("x-webhook-signature") || "";
  // const payload = JSON.stringify(body);
  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.WEBHOOK_SECRET!)
  //   .update(payload)
  //   .digest("hex");
  // const tokenStatus = crypto.timingSafeEqual(
  //   Buffer.from(signature),
  //   Buffer.from(expectedSignature)
  // );

  // if (!tokenStatus) {
  //   return NextResponse.json({ message: "Invalid signature" });
  // }
  if (!body) {
    return NextResponse.json({ message: "Body not required" });
  }

  try {
    switch (body?.type) {
      case "subscription.created": {
        console.log("subscription.created");

        const companyId = body?.data?.api_metadata?.data?.companyId;
        if (!companyId) return NextResponse.json({ received: true });

        const company: any = await Company.findByPk(Number(companyId));
        if (!company) return NextResponse.json({ received: true });

        const userData = await User.findByPk(company.userId);
        const transId = generateFixedTransactionId();

        const paymentData: any = {
          companyId: Number(companyId),
          paymentId: body?.data?.payment_id,
          transactionID: transId,
          paymentDate: new Date(),
          plan:
            company.plan ||
            (company.registrationState === RegistrationStation.mexico_state
              ? PlansEnum.PRO
              : PlansEnum.BASIC),
          registrationState: company.registrationState || "",
          status: body?.data?.status === "succeeded" ? "paid" : "failed",
          description: body?.data?.item?.title || "",
          amountPaid: Number(body?.data?.amount),
          type: body?.data?.api_metadata?.data?.type || "oneTime",
          currency: body?.data?.currency || "USD",
          webhookId: body?.id,
          buyerInfo: body?.data?.buyer
            ? JSON.stringify(body?.data?.buyer)
            : null,
        };

        const existingPayments = await Payments.findAll({
          where: { paymentId: body?.data?.payment_id },
        });

        if (existingPayments.length === 0) {
          await Payments.create(paymentData);

          if (paymentData.type === "sub") {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            company.subsriptionPaymentStatus = true;
            company.paymentStatus = 1;
            company.nextPayment = date;
          } else {
            company.regPaymentStatus = true;
            company.paymentStatus = 1;
          }
          await company.save();

          if (userData) {
            const htmlTemp = subscriptionCreated({
              name: userData.firstName || body.data?.buyer?.name || "User",
              plan_name: company.registrationState
                ? `${company.registrationState} Mailroom Fee`
                : "",
              next_billing_date: company.nextPayment
                ? company.nextPayment.toDateString()
                : "",
              amount: `$${Number(body?.data?.amount)}`,
              company_name:
                company.companyName && company.type
                  ? `${company.companyName} ${company.type}`
                  : "Your Company",
            });

            await EmailService.send({
              subject:
                "Subscription Created – Your Mail Room Service is Active",
              to: userData.email,
              htmlTemp,
            });
          }
        }

        return NextResponse.json({ received: true });
      }

      case "subscription.renewed": {
        console.log("subscription.renewed");

        const companyId = body?.data?.api_metadata?.data?.companyId;
        if (!companyId) return NextResponse.json({ received: true });

        const company: any = await Company.findByPk(Number(companyId));
        console.log("companycompanycompany", company);

        if (!company) return NextResponse.json({ received: true });

        const userData = await User.findByPk(company.userId);
        const transId = generateFixedTransactionId();

        const paymentData: any = {
          companyId: Number(companyId),
          paymentId: body?.data?.payment_id,
          transactionID: transId,
          paymentDate: new Date(),
          plan:
            company.plan ||
            (company.registrationState === RegistrationStation.mexico_state
              ? PlansEnum.PRO
              : PlansEnum.BASIC),
          registrationState: company.registrationState || "",
          status: body?.data?.status === "succeeded" ? "paid" : "failed",
          description: body?.data?.item?.title || "",
          amountPaid: Number(body?.data?.amount),
          type: body?.data?.api_metadata?.data?.type || "oneTime",
          currency: body?.data?.currency || "USD",
          webhookId: body?.id,
          buyerInfo: body?.data?.buyer
            ? JSON.stringify(body?.data?.buyer)
            : null,
        };

        const existingPayments = await Payments.findAll({
          where: { paymentId: body?.data?.payment_id },
        });

        if (existingPayments.length === 0) {
          await Payments.create(paymentData);

          if (paymentData.type === "sub") {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            company.subsriptionPaymentStatus = true;
            company.paymentStatus = 1;
            company.nextPayment = date;
          } else {
            company.regPaymentStatus = true;
            company.paymentStatus = 1;
          }
          await company.save();

          if (userData) {
            const htmlTemp = subscriptionRenewed({
              name: userData.firstName || body.data?.buyer?.name || "User",
              plan_name: company.registrationState
                ? `${company.registrationState} Mailroom Fee`
                : "",
              next_billing_date: company.nextPayment
                ? company.nextPayment.toDateString()
                : "",
              amount: `$${Number(body?.data?.amount)}`,
              company_name:
                company.companyName && company.type
                  ? `${company.companyName} ${company.type}`
                  : "Your Company",
            });

            await EmailService.send({
              subject:
                "Subscription Renewed – Your Mail Room Service is Active",
              to: userData.email,
              htmlTemp,
            });
          }
        }

        return NextResponse.json({ received: true });
      }

      case "payment.succeeded": {
        const companyId = body?.data?.api_metadata?.data?.companyId;
        if (!companyId) return NextResponse.json({ received: true });

        const company: any = await Company.findByPk(Number(companyId));
        if (!company) return NextResponse.json({ received: true });

        const userData = await User.findByPk(company.userId);
        const transId = generateFixedTransactionId();

        const paymentData: any = {
          companyId: Number(companyId),
          paymentId: body?.data?.payment_id,
          transactionID: transId,
          paymentDate: new Date(),
          plan:
            company.plan ||
            (company.registrationState == RegistrationStation.mexico_state
              ? PlansEnum.BASIC
              : PlansEnum.PRO),
          registrationState: company.registrationState || "",
          status: body?.data?.status === "succeeded" ? "paid" : "failed",
          description: body?.data?.item?.title || "",
          amountPaid: Number(body?.data?.amount),
          type: body?.data?.api_metadata?.data?.type || "oneTime",
          currency: body?.data?.currency || "USD",
          webhookId: body?.id,
          buyerInfo: body?.data?.buyer
            ? JSON.stringify(body?.data?.buyer)
            : null,
        };

        const existingPayments = await Payments.findAll({
          where: { paymentId: body?.data?.payment_id },
        });

        if (existingPayments.length === 0) {
          await Payments.create(paymentData);

          if (paymentData.type === "sub") {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            company.subsriptionPaymentStatus = true;
            company.paymentStatus = 1;
            company.nextPayment = date;
          } else {
            company.regPaymentStatus = true;
            company.paymentStatus = 1;
          }
          await company.save();

          if (userData) {
            const htmlTemp = paymentSuccessEmail({
              name: userData.firstName || body.data?.buyer?.name || "User",
              registation_state: company.registrationState || "",
              amount: `$${Number(body?.data?.amount)}`,
            });

            await EmailService.send({
              subject:
                "Payment Received – Your Company Registration with FormLLC",
              to: userData.email,
              htmlTemp,
              link: "https://formllc.io/user",
            });
          }
        }

        return NextResponse.json({ received: true });
      }

      case "subscription.canceled": {
        console.log("subscription.canceled");

        const companyId = body?.data?.api_metadata?.data?.companyId;
        if (!companyId) return NextResponse.json({ received: true });

        const company: any = await Company.findByPk(Number(companyId));
        const userData = await User.findByPk(company.userId);
        if (!company || !userData) return NextResponse.json({ received: true });

        try {
          let link = "";
          let session = await CheckoutSessions.findOne({
            where: { companyId },
          });

          if (!session?.subSessionLink) {
            const data = { companyId, type: "sub" };
            const encryptData = encryptURL(JSON.stringify(data));

            const subLink = await client.checkoutSessions.create({
              product: {
                title: "FormLLC Subscription",
                description: `Subscription for ${company.registrationState} Business Mail Room Service`,
              },
              amount_cents: 100,
              type: "subscription",
              metadata: { companyId: `${companyId}`, type: "sub" },
              subscription: {
                frequency_days: 30,
                initial_fee: 0,
                free_trial_days: null,
                initial_fee_days: 0,
                auto_expire_after_x_periods: null,
              },
              success_url: `https://formllc.io/payment-success?uid=${encryptData}`,
            });

            if (subLink?.data?.payment_link) {
              link = subLink.data.payment_link;
              if (session) {
                session.subSessionId = Number(subLink.data.checkout_session_id);
                session.subSessionLink = subLink.data.payment_link;
                await session.save();
              } else {
                await CheckoutSessions.create({
                  companyId,
                  subSessionId: Number(subLink.data.checkout_session_id),
                  subSessionLink: subLink.data.payment_link,
                });
              }
            }
          } else {
            link = session.subSessionLink;
          }

          const htmlTemp = subscriptionCancelled({
            company_name:
              company.companyName && company.type
                ? `${company.companyName} ${company.type}`
                : "Your Company",
            reactivate_link: link,
          });

          await EmailService.send({
            subject: "Subscription Cancelled – Reactivate Anytime",
            to: userData.email!,
            htmlTemp,
          });

          company.subsriptionPaymentStatus = false;
          company.paymentStatus = 0;
          await company.save();
        } catch (err) {
          console.error("Cancel webhook error:", err);
        }

        return NextResponse.json({ received: true });
      }

      default:
        return NextResponse.json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.log("error---------------", error);

    return NextResponse.json({ received: true });
  }
}
