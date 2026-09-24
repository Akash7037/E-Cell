import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/data";
import { sanitizeInput } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = sanitizeInput(body.name || "");
    const email = sanitizeInput(body.email || "");
    const subject = sanitizeInput(body.subject || "");
    const message = sanitizeInput(body.message || "");

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid institutional or personal email address." },
        { status: 400 }
      );
    }

    const savedInquiry = addInquiry({
      name,
      email,
      subject: subject || "General Incubation Inquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received and logged into E-Cell system.",
      inquiry: savedInquiry,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process inquiry. Please try again." },
      { status: 500 }
    );
  }
}
