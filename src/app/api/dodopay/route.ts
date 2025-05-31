import Company from "@/models/company";
import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

export const dodopayments = new DodoPayments({
  bearerToken:
    "gJOpKWeVmQ77THI2.kvWHBYtp4SNJJbPdpbyGTYDjy2mUqohRWI4pQPwmWzK1qQS2",
  environment: "live_mode",
});

export async function POST(req: Request) {
  const body: any = await req.json();

  const company = await Company.findByPk(body.companyId);
  if (!company) {
    return NextResponse.json(
      { message: "company not found!" },
      { status: 404 }
    );
  }
  if (!body.paymentId) {
    return NextResponse.json(
      { message: "paymentId is required!" },
      { status: 400 }
    );
  }
  try {
    const paymentDataResp = await dodopayments.payments.retrieve(
      body.paymentId
    );
    if (paymentDataResp.status === "succeeded") {
      company.regPaymentStatus = true;
      company.paymentLink = null as any;
      await company.save();
      return NextResponse.json({ isVerified: true }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ isVerified: false }, { status: 200 });
  }

  return NextResponse.json({ isVerified: false }, { status: 200 });
}
