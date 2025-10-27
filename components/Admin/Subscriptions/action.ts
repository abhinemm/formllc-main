'use server'

import { google } from 'googleapis';

export async function appendToGoogleSheet(data: any) {
  try {
    // Validate environment variables exist
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('GOOGLE_PRIVATE_KEY environment variable is not set');
    }
    
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error('GOOGLE_SHEETS_CLIENT_EMAIL environment variable is not set');
    }
    
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID environment variable is not set');
    }

    // Transform the private key - handle both escaped and literal newlines
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    // Replace all variations of escaped newlines
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    // Remove any extra quotes that might have been added
    if (privateKey.startsWith('"')) privateKey = privateKey.slice(1);
    if (privateKey.endsWith('"')) privateKey = privateKey.slice(0, -1);

    console.log('Private key starts with:', privateKey.substring(0, 30));
    console.log('Private key ends with:', privateKey.substring(privateKey.length - 30));

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const rowData = [
      new Date().toISOString(),
      data.email,
      data.name,
      // Add other fields as needed
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to append data' 
    };
  }
}
