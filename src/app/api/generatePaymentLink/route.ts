import Company from "@/models/company";
import StripeService from "@/services/stripe.service";
import { PlansEnum } from "@/utils/constants";
import { NextResponse } from "next/server";

const BASIC_PLAN_FEE_PRICEID = process.env.BASIC_PLAN_FEE_PRICEID;
const BASIC_PLAN_SUB_PRICEID = process.env.BASIC_PLAN_SUB_PRICEID;
const PRO_PLAN_FEE_PRICEID = process.env.PRO_PLAN_FEE_PRICEID;
const PRO_PLAN_SUB_PRICEID = process.env.PRO_PLAN_SUB_PRICEID;

export async function POST(req: Request) {
  const body: any = await req.json();

  const company = await Company.findByPk(body.companyId);
  if (!company) {
    return NextResponse.json({ message: "company not found!" }, { status: 404 });
  }
  const paymentPrices: any = {};
  switch (body.plan) {
    case PlansEnum.BASIC: {
      if (!company.regPaymentStatus) {
        paymentPrices.regPriceId = BASIC_PLAN_FEE_PRICEID;
      }
      paymentPrices.subPriceId = BASIC_PLAN_SUB_PRICEID;
      paymentPrices.subPlan = PlansEnum.BASIC;
      break;
    }
    case PlansEnum.PRO: {
      if (!company.regPaymentStatus) {
        paymentPrices.regPriceId = PRO_PLAN_FEE_PRICEID;
      }
      paymentPrices.subPriceId = PRO_PLAN_SUB_PRICEID;
      paymentPrices.subPlan = PlansEnum.PRO;
      break;
    }
  }

  const paymentLink = await StripeService.createLink(company.id!, paymentPrices);

  company.paymentLink = paymentLink;
  company.plan = body.plan;
  await company.save();
  return NextResponse.json({ url: paymentLink }, { status: 200 });
}
