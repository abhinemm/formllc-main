import FanbasisCheckout from "@fanbasis/checkout-sdk";

export const client = new FanbasisCheckout({
  apiKey: process.env.FORMLLC_API_KEY!,
});
