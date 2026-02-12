import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import CompanyService from "@/services/company.model.service";
import UserService from "@/services/user.model.service";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  // Authenticate the user
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { filename } = params;

  try {
    // Check if the filename is actually a full URL (Vercel Blob)
    if (filename.startsWith("http")) {
      return NextResponse.redirect(filename);
    }

    // Look up the company document associated with this filename
    const company = await CompanyService.findOne({
      document: filename,
    });

    const adminUser: any = await UserService.findOne({ type: "admin" });
    if (!company) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    if (company.userId !== data.user.id && data.user.id !== adminUser?.id) {
      return NextResponse.json({ error: "No permission" }, { status: 403 });
    }

    // If the document URL is a full URL (e.g., Vercel Blob), redirect to it
    if (company.document && company.document.startsWith("http")) {
      return NextResponse.redirect(company.document);
    }

    // No local file system access on Vercel — return not found for old local paths
    return NextResponse.json(
      { error: "File not available. It may need to be re-uploaded." },
      { status: 404 }
    );
  } catch (error) {
    console.error("File access error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}

