import { encryptURL } from "@/helpers/CryptoHelper";
import CheckoutSessions from "@/models/checkoutsessions";
import Company from "@/models/company";
import { PlansEnum } from "@/utils/constants";
import { client } from "@/utils/fanbasis";
import { NextResponse } from "next/server";

const Mexico = "https://www.fanbasis.com/agency-checkout/formllc/YE6Q9";

// const WyomingPrice = 29900;
// const MexicoPrice = 19900;

const WyomingPrice = 1;
const MexicoPrice = 1;

export async function POST(req: Request) {
  const body: any = await req.json();

  const company = await Company.findByPk(body.companyId);
  if (!company) {
    return NextResponse.json(
      { message: "company not found!" },
      { status: 404 }
    );
  }
  if (!body.plan) {
    return NextResponse.json({ message: "Plan is required!" }, { status: 400 });
  }
  let data = {
    companyId: body.companyId,
    type: body.sub ? "sub" : "oneTime",
    comapany: "formllc", //
  };

  const encryptData = encryptURL(JSON.stringify(data));
  let paymentLink: string = "";
  let response: any = null;

  const checkoutSessionsData = await CheckoutSessions.findOne({
    where: { companyId: body.companyId },
  });

  if (body.sub) {
    if (checkoutSessionsData?.subSessionLink) {
      return NextResponse.json(
        { url: `${checkoutSessionsData.subSessionLink}?uid=${encryptData}` },
        { status: 200 }
      );
    }

    try {
      const subscriptionLink = await client.checkoutSessions.create({
        product: {
          title: "FormLLC Subscription",
          description: `Subscription for ${company.registrationState} Business Mail Room Service`,
        },
        amount_cents: 100,
        type: "subscription",

        metadata: {
          companyId: `${body.companyId}`,
          type: body.sub ? "sub" : "oneTime",
        },
        subscription: {
          frequency_days: 5,
          initial_fee: 0,
          free_trial_days: null,
          initial_fee_days: 0,
          auto_expire_after_x_periods: null,
        },
        success_url: encryptData
          ? `https://formllc.io/payment-success?uid=${encryptData}`
          : `https://formllc.io/payment-success`,
      });
      response = subscriptionLink;

      if (response?.data?.payment_link) {
        paymentLink = response?.data?.payment_link;

        if (checkoutSessionsData) {
          checkoutSessionsData.subSessionId = subscriptionLink?.data
            ?.checkout_session_id
            ? Number(subscriptionLink?.data?.checkout_session_id)
            : null;
          checkoutSessionsData.subSessionLink = response?.data?.payment_link;
          await checkoutSessionsData.save();
        } else {
          await CheckoutSessions.create({
            companyId: body.companyId,
            subSessionId: subscriptionLink?.data?.checkout_session_id
              ? Number(subscriptionLink?.data?.checkout_session_id)
              : null,
            subSessionLink: response?.data?.payment_link,
          });
        }
        return NextResponse.json(
          { url: `${response?.data?.payment_link}?uid=${encryptData}` },
          { status: 200 }
        );
      }
    } catch (error) {
      response = error;
    }
  } else {
    if (checkoutSessionsData?.regSessionLink) {
      return NextResponse.json(
        { url: `${checkoutSessionsData.regSessionLink}?uid=${encryptData}` },
        { status: 200 }
      );
    }
    try {
      const subscriptionLink = await client.checkoutSessions.create({
        product: {
          title: `FormLLC ${company.registrationState} Registration Fee`,
          description: `Registration fee for ${company.registrationState}`,
        },
        amount_cents: body.plan == PlansEnum.BASIC ? MexicoPrice : WyomingPrice,
        type: "onetime_reusable",
        metadata: {
          companyId: `${body.companyId}`,
          type: body.sub ? "sub" : "oneTime",
        },
        success_url: encryptData
          ? `https://formllc.io/payment-success?uid=${encryptData}`
          : `https://formllc.io/payment-success`,
      });
      response = subscriptionLink;
      if (response?.data?.payment_link) {
        paymentLink = response?.data?.payment_link;

        if (checkoutSessionsData) {
          checkoutSessionsData.regSessionId = subscriptionLink?.data
            ?.checkout_session_id
            ? Number(subscriptionLink?.data?.checkout_session_id)
            : null;
          checkoutSessionsData.regSessionLink = response?.data?.payment_link;
          await checkoutSessionsData.save();
        } else {
          await CheckoutSessions.create({
            companyId: body.companyId,
            regSessionId: subscriptionLink?.data?.checkout_session_id
              ? Number(subscriptionLink?.data?.checkout_session_id)
              : null,
            regSessionLink: response?.data?.payment_link,
          });
        }
      }
      return NextResponse.json(
        { url: `${response?.data?.payment_link}?uid=${encryptData}` },
        { status: 200 }
      );
    } catch (error) {
      response = error;
    }
  }
  return NextResponse.json({ url: paymentLink }, { status: 200 });
}
