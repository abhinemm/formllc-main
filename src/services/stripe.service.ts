import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
export default class StripeService {
  static async createLink(
    id: number,
    priceIds: { regPriceId?: string; subPriceId?: string; subPlan?: string }
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
    console.log(listItems);

    console.log(subdata);
    const paymentLink = await stripe.paymentLinks.create({
      line_items: listItems,
      metadata: subdata,
      // ...subdata,
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${process.env.FRONTENDURL}?id=${id}`,
        },
      },
      invoice_creation: {
        enabled: true,
      },
    });
    console.log("paymentLinkpaymentLinkpaymentLinkpaymentLink", paymentLink);

    return paymentLink.url;
  }
}
