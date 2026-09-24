import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "brochures", "INNOVATEX_2026_Brochure.pdf");

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Brochure not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="VSBCETC_ECELL_INNOVATEX_2026_BROCHURE.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
