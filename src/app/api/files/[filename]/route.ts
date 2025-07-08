import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import CompanyService from "@/services/company.model.service";
import UserService from "@/services/user.model.service";

const uploadsDir = path.resolve("./uploads");

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

  // Get the requested filename from the URL
  const { filename } = params;

  // Construct the file path
  const filePath = path.join(uploadsDir, filename);

  try {
    // Check if the file exists
    await fs.access(filePath);

    // Read and serve the file
    const file = await fs.readFile(filePath);
    const fileType = path.extname(filePath);
    const company = await CompanyService.findOne({
      document: filePath,
    });

    const adminUser: any = await UserService.findOne({ type: "admin" });
    if (!company) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    if (company.userId !== data.user.id || data.user.id !== adminUser.id) {
      return NextResponse.json({ error: "No permission" }, { status: 403 });
    }
    return new Response(file, {
      headers: {
        "Content-Type": getMimeType(fileType),
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("File access error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}

// Helper function to determine the MIME type
function getMimeType(extension: string): string {
  const mimeTypes: { [key: string]: string } = {
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
  };
  return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
}
