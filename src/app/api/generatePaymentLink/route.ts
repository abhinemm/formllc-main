import Company from "@/models/company";
import StripeService from "@/services/stripe.service";
import { PlansEnum } from "@/utils/constants";
import { NextResponse } from "next/server";

const BASIC_PLAN_FEE_PRICEID = process.env.BASIC_PLAN_FEE_PRICEID;
const BASIC_PLAN_SUB_PRICEID = process.env.BASIC_PLAN_SUB_PRICEID;
const PRO_PLAN_FEE_PRICEID = process.env.PRO_PLAN_FEE_PRICEID;
const PRO_PLAN_SUB_PRICEID = process.env.PRO_PLAN_SUB_PRICEID;

const BASIC_PLAN_DODO_PAYLINK = `https://checkout.dodopayments.com/buy/pdt_561m2wwjPAeq8u9tUj3VV?quantity=1&country=United+States&addressLine=245+Market+ST&city=San+Francisco+&zipCode=94105&state=California&disableAddressLine=true&disableState=true&disableCity=true&disableZipCode=true&redirect_url=${process.env.NEXTAUTH_URL}%2Fpayment-success/`;
const PRO_PLAN_DODO_PAYLINK = `https://checkout.dodopayments.com/buy/pdt_SmaZ2En8Lrmim6uwN7Njs?quantity=1&country=United+States&addressLine=245+Market+ST&city=San+Francisco+&zipCode=94105&state=California&disableAddressLine=true&disableState=true&disableCity=true&disableZipCode=true&redirect_url=${process.env.NEXTAUTH_URL}%2Fpayment-success/`;

// export async function POST(req: Request) {
//   const body: any = await req.json();

//   const company = await Company.findByPk(body.companyId);
//   if (!company) {
//     return NextResponse.json(
//       { message: "company not found!" },
//       { status: 404 }
//     );
//   }
//   if (!body.plan) {
//     return NextResponse.json({ message: "Plan is required!" }, { status: 400 });
//   }
//   const paymentPrices: any = {};
//   switch (body.plan) {
//     case PlansEnum.BASIC: {
//       if (body.register) {
//         paymentPrices.regPriceId = BASIC_PLAN_FEE_PRICEID;
//       }
//       if (body.sub) {
//         paymentPrices.subPriceId = BASIC_PLAN_SUB_PRICEID;
//       }

//       paymentPrices.subPlan = PlansEnum.BASIC;
//       break;
//     }
//     case PlansEnum.PRO: {
//       if (body.register) {
//         paymentPrices.regPriceId = PRO_PLAN_FEE_PRICEID;
//       }
//       if (body.sub) {
//         paymentPrices.subPriceId = PRO_PLAN_SUB_PRICEID;
//       }

//       paymentPrices.subPlan = PlansEnum.PRO;
//       break;
//     }
//   }
//   if (body?.sub) {
//     body.redirecturl = `${process.env.BASEURL}/user?status=success`;
//   }

//   const paymentLink = await StripeService.createLink(
//     company.id!,
//     paymentPrices,
//     body.redirecturl ? body.redirecturl : null,
//     body.register ? true : false
//   );

//   company.paymentLink = paymentLink;
//   company.plan = body.plan;
//   await company.save();
//   return NextResponse.json({ url: paymentLink }, { status: 200 });
// }

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
  let paymentLink: string = "";

  switch (body.plan) {
    case PlansEnum.BASIC: {
      paymentLink = BASIC_PLAN_DODO_PAYLINK + `${body.companyId}`;
      break;
    }
    case PlansEnum.PRO: {
      paymentLink = PRO_PLAN_DODO_PAYLINK + `${body.companyId}`;
      break;
    }
  }

  // company.paymentLink = paymentLink;
  company.plan = body.plan;
  await company.save();
  return NextResponse.json({ url: paymentLink }, { status: 200 });
}
