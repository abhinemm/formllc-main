import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  // Dynamically import Stripe and Models inside the handler
  // This prevents build-time execution of any DB or SDK logic
  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

  // Late import models to avoid Sequelize auto-init
  const { default: Company } = await import("@/models/company");
  const { default: Payments } = await import("@/models/payments.model");
  const { PlansEnum } = await import("@/utils/constants");

  let event: Stripe.Event;

  try {
    // Get the raw body
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    // Validate and parse the event
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  // switch (event.type) {
  //   case "invoice.payment_succeeded": {
  //     const invoice = event.data.object;
  //     const metaData: any = invoice?.subscription_details?.metadata;
  //     const companyId = Number(metaData?.id);
  //     const company = await Company.findByPk(companyId);
  //     const paymentId: any = invoice?.subscription;
  //     if (company && paymentId) {
  //       switch (metaData?.subPlan) {
  //         case PlansEnum.BASIC: {
  //           await Payments.create({
  //             invoice: paymentId as string,
  //             paymentDate: new Date() as any,
  //             plan: "subscription",
  //             status: invoice.status as any,
  //             companyId: company.id,
  //             invoicePDF: invoice.invoice_pdf ? invoice.invoice_pdf : undefined,
  //             amountPaid: invoice?.amount_paid
  //               ? invoice?.amount_paid / 100
  //               : undefined,
  //             description: `Mail room subscription completed`,
  //           });
  //           company.regPaymentStatus = true;
  //           company.paymentLink = null as any;
  //           await company.save();
  //           break;
  //         }
  //         case PlansEnum.PRO: {
  //           await Payments.create({
  //             invoice: paymentId as string,
  //             paymentDate: new Date() as any,
  //             plan: "subscription",
  //             status: invoice.status as any,
  //             companyId: company.id,
  //             invoicePDF: invoice.invoice_pdf ? invoice.invoice_pdf : undefined,
  //             amountPaid: invoice?.amount_paid
  //               ? invoice?.amount_paid / 100
  //               : undefined,
  //             description: `Mail room subscription completed`,
  //           });
  //           company.subsriptionPaymentStatus = true;
  //           company.paymentLink = null as any;
  //           await company.save();
  //           break;
  //         }
  //       }
  //     }
  //     break;
  //     // const invoice = event.data.object;

  //     // const company = await Company.findByPk(
  //     //   invoice.subscription_details?.metadata?.id
  //     // );
  //     // if (company) {
  //     // const pricids = invoice.lines.data.map((el) => el.price?.id);
  //     // switch (invoice.subscription_details?.metadata?.subPlan) {
  //     //   case PlansEnum.BASIC: {
  //     //     await Payments.create({
  //     //       invoice: invoice.subscription as string,
  //     //       paymentDate: new Date() as any,
  //     //       plan: invoice.subscription_details?.metadata?.subPlan,
  //     //       status: invoice.status as any,
  //     //       companyId: company.id,
  //     //       invoicePDF: invoice.invoice_pdf as any,
  //     //       amountPaid: invoice.amount_paid
  //     //         ? invoice.amount_paid / 100
  //     //         : undefined,
  //     //       description: `${invoice.subscription_details?.metadata?.subPlan} fee payment completed`,
  //     //     });
  //     //     if (pricids.find((el) => el === BASIC_PLAN_FEE_PRICEID)) {
  //     //       company.regPaymentStatus = true;
  //     //       await Payments.create({
  //     //         invoice: invoice.subscription as string,
  //     //         paymentDate: new Date() as any,
  //     //         plan: invoice.subscription_details?.metadata?.subPlan,
  //     //         status: invoice.status as any,
  //     //         companyId: company.id,
  //     //         invoicePDF: invoice.invoice_pdf as any,
  //     //         amountPaid: invoice.amount_paid
  //     //           ? invoice.amount_paid / 100
  //     //           : undefined,
  //     //         description: `${invoice.subscription_details?.metadata?.subPlan} fee payment completed`,
  //     //       });
  //     //     }
  //     //     if (pricids.find((el) => el === BASIC_PLAN_SUB_PRICEID)) {
  //     //       await Payments.create({
  //     //         invoice: invoice.subscription as string,
  //     //         paymentDate: new Date() as any,

  //     //         plan: invoice.subscription_details?.metadata?.subPlan,
  //     //         status: invoice.status as any,
  //     //         companyId: company.id,
  //     //         invoicePDF: invoice.invoice_pdf as any,
  //     //         amountPaid: invoice.amount_paid
  //     //           ? invoice.amount_paid / 100
  //     //           : undefined,
  //     //         description: `${invoice.subscription_details?.metadata?.subPlan} subscription payment completed`,
  //     //       });
  //     //       company.subsriptionPaymentStatus = true;
  //     //     }
  //     //     company.paymentLink = null as any;
  //     //     await company.save();
  //     //     break;
  //     //   }
  //     //   case PlansEnum.PRO: {
  //     //     if (pricids.find((el) => el === PRO_PLAN_FEE_PRICEID)) {
  //     //       company.regPaymentStatus = true;
  //     //       await Payments.create({
  //     //         invoice: invoice.subscription as string,
  //     //         paymentDate: new Date() as any,

  //     //         plan: invoice.subscription_details?.metadata?.subPlan,
  //     //         status: invoice.status as any,
  //     //         companyId: company.id,
  //     //         invoicePDF: invoice.invoice_pdf as any,
  //     //         amountPaid: invoice.amount_paid
  //     //           ? invoice.amount_paid / 100
  //     //           : undefined,

  //     //         description: `${invoice.subscription_details?.metadata?.subPlan} fee payment completed`,
  //     //       });
  //     //     }
  //     //     if (pricids.find((el) => el === PRO_PLAN_SUB_PRICEID)) {
  //     //       await Payments.create({
  //     //         invoice: invoice.subscription as string,
  //     //         paymentDate: new Date() as any,

  //     //         plan: invoice.subscription_details?.metadata?.subPlan,
  //     //         status: invoice.status as any,
  //     //         companyId: company.id,
  //     //         invoicePDF: invoice.invoice_pdf as any,
  //     //         amountPaid: invoice.amount_paid
  //     //           ? invoice.amount_paid / 100
  //     //           : undefined,

  //     //         description: `${invoice.subscription_details?.metadata?.subPlan} subscription payment completed`,
  //     //       });
  //     //       company.subsriptionPaymentStatus = true;
  //     //     }
  //     //     company.paymentLink = null as any;
  //     //     await company.save();

  //     //     break;
  //     //   }
  //     // }
  //     // }

  //     break;
  //   }
  //   case "checkout.session.completed": {
  //     const invoice = event.data.object;
  //     const metaData = invoice?.metadata;
  //     const companyId = Number(invoice?.metadata?.id);
  //     const company = await Company.findByPk(companyId);
  //     const paymentId: any = invoice?.payment_intent;
  //     if (company && paymentId) {
  //       let invoiceDetails: any = null;
  //       const invoiceId: any = invoice.invoice;
  //       if (invoiceId) {
  //         invoiceDetails = await stripe.invoices.retrieve(invoiceId);
  //       }
  //       switch (metaData?.subPlan) {
  //         case PlansEnum.BASIC: {
  //           await Payments.create({
  //             invoice: invoice.invoice as string,
  //             paymentDate: new Date() as any,
  //             plan: metaData?.subPlan,
  //             status: invoice.payment_status as any,
  //             companyId: company.id,
  //             invoicePDF: invoiceDetails?.invoice_pdf
  //               ? invoiceDetails?.invoice_pdf
  //               : null,
  //             amountPaid: invoice?.amount_total
  //               ? invoice?.amount_total / 100
  //               : undefined,
  //             description: `${metaData?.subPlan} fee payment completed`,
  //           });
  //           company.regPaymentStatus = true;
  //           company.paymentLink = null as any;
  //           await company.save();
  //           break;
  //         }
  //         case PlansEnum.PRO: {
  //           await Payments.create({
  //             invoice: invoice.invoice as string,
  //             paymentDate: new Date() as any,
  //             plan: metaData?.subPlan,
  //             status: invoice.payment_status as any,
  //             companyId: company.id,
  //             invoicePDF: invoiceDetails?.invoice_pdf
  //               ? invoiceDetails?.invoice_pdf
  //               : null,
  //             amountPaid: invoice?.amount_total
  //               ? invoice?.amount_total / 100
  //               : undefined,
  //             description: `${metaData?.subPlan} fee payment completed`,
  //           });
  //           company.regPaymentStatus = true;
  //           company.paymentLink = null as any;
  //           await company.save();
  //           break;
  //         }
  //       }
  //     }
  //     break;
  //   }
  //   case "invoice.payment_failed":
  //   case "customer.subscription.deleted": {
  //     const invoice: any = event.data.object; // Stripe invoice object

  //     const company = await Company.findByPk(
  //       invoice.subscription_details?.metadata?.id
  //     );
  //     if (company) {
  //       const pricids = invoice.lines.data.map((el) => el.price?.id);
  //       switch (invoice.subscription_details?.metadata?.subPlan) {
  //         case PlansEnum.BASIC: {
  //           if (pricids.find((el) => el === BASIC_PLAN_FEE_PRICEID)) {
  //             company.regPaymentStatus = false;
  //             await Payments.create({
  //               invoice: invoice.subscription as string,

  //               plan: invoice.subscription_details?.metadata?.subPlan,
  //               status: "failed",
  //               companyId: company.id,
  //               description: `${invoice.subscription_details?.metadata?.subPlan} fee payment failed`,
  //             });
  //           }
  //           if (pricids.find((el) => el === BASIC_PLAN_SUB_PRICEID)) {
  //             await Payments.create({
  //               invoice: invoice.subscription as string,

  //               plan: invoice.subscription_details?.metadata?.subPlan,
  //               status: "failed",

  //               companyId: company.id,
  //               description: `${invoice.subscription_details?.metadata?.subPlan} subscription payment failed`,
  //             });
  //             company.subsriptionPaymentStatus = false;
  //             await company.save();
  //           }
  //           break;
  //         }
  //         case PlansEnum.PRO: {
  //           if (pricids.find((el) => el === PRO_PLAN_FEE_PRICEID)) {
  //             company.regPaymentStatus = false;
  //             await Payments.create({
  //               invoice: invoice.subscription as string,

  //               plan: invoice.subscription_details?.metadata?.subPlan,
  //               status: "failed",

  //               companyId: company.id,
  //               description: `${invoice.subscription_details?.metadata?.subPlan} fee payment failed`,
  //             });
  //           }
  //           if (pricids.find((el) => el === PRO_PLAN_SUB_PRICEID)) {
  //             await Payments.create({
  //               invoice: invoice.subscription as string,

  //               plan: invoice.subscription_details?.metadata?.subPlan,
  //               status: invoice.status as any,
  //               companyId: company.id,
  //               description: `${invoice.subscription_details?.metadata?.subPlan} subscription payment failed`,
  //             });
  //             company.subsriptionPaymentStatus = false;
  //             await company.save();
  //           }
  //           break;
  //         }
  //       }
  //     }

  //     break;
  //   }
  //   default:
  //     console.log(`Unhandled event type: ${event.type}`);
  // }

  // Respond to Stripe to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
