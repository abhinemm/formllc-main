import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Dynamic imports to prevent build-time execution
  const { default: Payments }: any = await import("@/models/payments.model");
  const { default: StripeService }: any = await import("@/services/stripe.service");

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

