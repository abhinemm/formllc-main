import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Disable default Next.js body parser for this API route
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser so that we can handle parsing manually
  },
};

// Create a form instance with configuration
const form = formidable({
  multiples: false, // Allow only one file at a time
  uploadDir: "./uploads", // Directory for temporary file uploads
  keepExtensions: true, // Keep file extensions
  filename: (name, ext, part) => `${uuidv4()}${ext}`, // Use UUID for file naming to avoid conflicts
});

// API handler for file upload
export async function POST(req: Request) {
  return new Promise<NextResponse>((resolve, reject) => {
    // Parse the incoming request using formidable
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        console.error("File upload error:", err);
        reject(
          NextResponse.json({ error: "File upload failed!" }, { status: 500 })
        );
        return;
      }

      // Extract the file from the `files` object
      const uploadedFile = files.file as formidable.File;

      // Generate the final file path using the unique filename
      const finalPath = path.join("./uploads", uploadedFile.newFilename);

      try {
        // Move the temporary file to the final location
        await fs.rename(uploadedFile.filepath, finalPath);

        // Return a response with the path of the uploaded file
        resolve(
          NextResponse.json({
            message: "File uploaded successfully!",
            filePath: `/uploads/${uploadedFile.newFilename}`,
          })
        );
      } catch (error) {
        console.error("Error moving file:", error);
        reject(
          NextResponse.json({ error: "Error saving file!" }, { status: 500 })
        );
      }
    });
  });
}
