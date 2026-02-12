import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export const runtime = "edge"; // Optional: use edge runtime for faster uploads

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided!" }, { status: 400 });
    }

    // Generate a unique filename
    const ext = file.name.split(".").pop() || "bin";
    const uniqueName = `${uuidv4()}.${ext}`;

    // Upload to Vercel Blob
    const blob = await put(uniqueName, file, {
      access: "public",
    });

    return NextResponse.json({
      message: "File uploaded successfully!",
      filePath: blob.url,
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "File upload failed!" },
      { status: 500 }
    );
  }
}

