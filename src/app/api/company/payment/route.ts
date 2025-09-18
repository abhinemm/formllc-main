import Company from "@/models/company";
import { NextResponse } from "next/server";
import Payments from "@/models/payments.model";
// import { paymentStatus } from "@/utils/constants";
// import { generateFixedTransactionId } from "@/helpers/helper";

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
    // const transId = generateFixedTransactionId();
    const paymentInfo = {
      customer: { email: body.name },
    };
    // const requestData = {
    //   invoice: body.paymentId as string,
    //   paymentDate: new Date() as any,
    //   transactionID: transId,
    //   plan: company.registrationState,
    //   status: paymentStatus?.paid as any,
    //   companyId: company.id,
    //   amountPaid: body?.amount ? body?.amount / 100 : undefined,
    //   description: "",
    //   type: body.type,
    //   currency: "USD",
    //   paymentInfo: JSON.stringify(paymentInfo),
    // };

    const where = {
      invoice: body.paymentId,
    };
    const payments = await Payments.findAll({
      where: where,
    });

    if (!payments?.length) {
    //   await Payments.create(requestData);
      if (body.type === "sub") {
        const date: any = new Date();
        date.setDate(date.getDate() + 30);
        company.subsriptionPaymentStatus = true;
        company.paymentStatus = 1;
        // company.nextPayment = date;
        await company.save();
      }
      if (body.type === "oneTime") {
        company.regPaymentStatus = true;
        company.paymentStatus = 1;
        await company.save();
      }
    }
    return NextResponse.json({ isVerified: true }, { status: 200 });

    // if (paymentDataResp.status === "succeeded") {
    //   company.regPaymentStatus = true;
    //   company.paymentLink = null as any;
    //   await company.save();
    // }
  } catch (error) {
    return NextResponse.json({ isVerified: false }, { status: 200 });
  }
}
