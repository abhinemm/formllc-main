import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
export default class StripeService {
  static async createLink(
    id: number,
    priceIds: { regPriceId?: string; subPriceId?: string; subPlan?: string },
    redirecturl?: string,
    register?: boolean
  ) {
    const listItems: any[] = [];
    if (!priceIds.regPriceId && !priceIds.subPriceId) {
      return;
    }
    if (priceIds?.regPriceId) {
      listItems.push({ price: priceIds?.regPriceId, quantity: 1 });
    }
    if (priceIds?.subPriceId) {
      listItems.push({ price: priceIds?.subPriceId, quantity: 1 });
    }
    let type: any = null;
    if (priceIds.regPriceId && !priceIds.subPriceId) {
      type = "REG_ONLY";
    }
    if (!priceIds.regPriceId && priceIds.subPriceId) {
      type = "SUB_ONLY";
    }
    if (priceIds.regPriceId && priceIds.subPriceId) {
      type = "SUB_REG";
    }

    let subdata: any = {};
    if (type === "REG_ONLY") {
      subdata = {
        type,
        id,
        subPlan: priceIds.subPlan || null,
      };
    } else {
      subdata = {
        type,
        id,
        subPlan: priceIds.subPlan || null,
      };
    }
    let paymentData: any = {
      line_items: listItems,
      after_completion: {
        type: "redirect",
        redirect: {
          url: redirecturl
            ? redirecturl
            : `${process.env.FRONTENDURL}?id=${id}`,
        },
      },
    };
    if (register) {
      paymentData.metadata = subdata;
      paymentData.invoice_creation = {
        enabled: true,
      };
    } else {
      paymentData.subscription_data = {
        metadata: subdata,
      };
    }
    console.log(listItems);

    console.log(subdata);
    const paymentLink = await stripe.paymentLinks.create(paymentData);

    return paymentLink.url;
  }
  static async getInvoicePDF(invoiceId) {
    try {
      // Retrieve the invoice using the invoice ID
      const invoice = await stripe.invoices.retrieve(invoiceId);

      if (invoice.invoice_pdf) {
        return invoice.invoice_pdf;
        // You can use this URL to download or share the PDF
      } else {
        console.log("Invoice PDF is not available for this invoice.");
        return null;
      }
    } catch (error: any) {
      console.error("Error retrieving invoice PDF:", error.message);
      return null;
    }
  }
}
