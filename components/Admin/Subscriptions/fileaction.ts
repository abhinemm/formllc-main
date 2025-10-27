"use server";

interface SubscriptionData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerID: string;
  productTitle: string;
  productPrice: string;
  subScriptionId: number;
  subscriptionStatus: string;
}

export async function downloadSubscriptionsAsCSV(data: SubscriptionData[]) {
  try {
    // Fetch all subscriptions from your database

    // CSV headers
    const headers = [
      "ID",
      "Customer Name",
      "Customer Email",
      "Customer Phone",
      "Customer ID",
      "Product Title",
      "Product Price",
      "Subscription ID",
      "Subscription Status",
    ];

    // Convert data to CSV format
    const rows = data.map((sub) => [
      escapeCSV(sub.id),
      escapeCSV(sub.customerName),
      escapeCSV(sub.customerEmail),
      escapeCSV(sub.customerPhone),
      escapeCSV(sub.customerID),
      escapeCSV(sub.productTitle),
      escapeCSV(sub.productPrice),
      escapeCSV(sub.subScriptionId),
      escapeCSV(sub.subscriptionStatus),
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return { success: true, csv: csvContent };
  } catch (error) {
    console.error("Error generating CSV:", error);
    return { success: false, error: "Failed to generate CSV" };
  }
}

// Helper function to escape CSV values
function escapeCSV(value: string | number): string {
  if (value === null || value === undefined) return "";

  const stringValue = String(value);

  // If contains comma, quotes, or newlines, wrap in quotes and escape inner quotes
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

// Implement this based on your database (Prisma, MongoDB, etc.)
async function fetchAllSubscriptionsFromDB(): Promise<SubscriptionData[]> {
  // Example with Prisma:
  // const subscriptions = await prisma.subscription.findMany();

  // Example with MongoDB:
  // const subscriptions = await db.collection('subscriptions').find({}).toArray();

  // Replace with your actual database query
  return [];
}
