let _client: any = null;

async function getClient() {
  if (!_client) {
    const FanbasisCheckout = (await import("@fanbasis/checkout-sdk")).default;
    _client = new FanbasisCheckout({
      apiKey: process.env.FORMLLC_API_KEY || "",
    });
  }
  return _client;
}

// Backward-compatible async client
export const client = {
  get checkoutSessions() {
    return {
      create: async (...args: any[]) => {
        const c = await getClient();
        return c.checkoutSessions.create(...args);
      },
    };
  },
};
