import Payments from "@/models/payments.model";
import StripeService from "@/services/stripe.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: any = await req.json();

  const payment = await Payments.findOne({ where: { id: body.paymentId } });
  if (!payment) {
    return NextResponse.json(
      { message: "payment not found!" },
      { status: 404 }
    );
  }

  const invoicePdf = await StripeService.getInvoicePDF(payment.invoice);
  if (!invoicePdf) {
    return NextResponse.json({ message: "PDF not generated" }, { status: 400 });
  }

  payment.invoicePDF = invoicePdf;
  await payment.save();
  return NextResponse.json(
    { message: "success", url: invoicePdf },
    { status: 200 }
  );
}
