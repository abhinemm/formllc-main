import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";
import { QueryTypes } from "sequelize";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";



function toCSV(rows: Record<string, any>[]) {
  if (!rows || rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (val: any) => {
    if (val === null || val === undefined) return "";
    const s = String(val);
    // Escape double quotes by doubling them, wrap in quotes
    return `"${s.replace(/"/g, '""')}"`;
  };
  const headerLine = headers.map(escape).join(",");
  const lines = rows.map((row) => headers.map((h) => escape(row[h])).join(","));
  return [headerLine, ...lines].join("\r\n");
}

export async function GET(req: Request) {
  const data = (await getServerSession(authOptions)) as any;
  if (!data || !data.user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "1";
  const rows = await sequelize.query(
    `SELECT 
  c."companyName",
  c."companyEmail",
  c."document",
  c."ownerFname",
  c."ownerLname",
  c."registrationState",
  c."type",
  c."subsriptionPaymentStatus",
  c."regPaymentStatus",
  c."country",
  c."state",
  c."city",
  c."zipCode",
  c."streetAddress",
  u."firstName",
  u."middleName",
  u."lastName",
  u.email
FROM companies AS c
JOIN users AS u ON u.id = c."userId"
WHERE c.status = ${status}
ORDER BY c.id DESC;
      `,
    {
      type: QueryTypes.SELECT, // ✅ this now works
    }
  );

  const csv = toCSV(rows);
  const now = new Date();
  const iso = now.toISOString().replace(/[:.]/g, "-");
  const filename = `company_${iso}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
