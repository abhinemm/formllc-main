import FanbasisCheckout from "@fanbasis/checkout-sdk";

let _client: FanbasisCheckout | null = null;

export function getClient(): FanbasisCheckout {
  if (!_client) {
    if (!process.env.FORMLLC_API_KEY) {
      throw new Error("FORMLLC_API_KEY environment variable is not set");
    }
    _client = new FanbasisCheckout({
      apiKey: process.env.FORMLLC_API_KEY,
    });
  }
  return _client;
}

// Keep backward compatibility
export const client = {
  get checkoutSessions() {
    return getClient().checkoutSessions;
  },
};

