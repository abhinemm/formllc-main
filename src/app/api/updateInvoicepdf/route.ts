import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Dynamically import the handler to ensure NO top-level code runs at build time
  // Using Node.js runtime for PDF generation
  const { POST: handler } = await import("./handler");
  return handler(req);
}
