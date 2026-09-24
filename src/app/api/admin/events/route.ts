import { NextResponse } from "next/server";
import { getEvents, saveEvent, deleteEvent, addAuditLog } from "@/lib/data";
import { sanitizeInput } from "@/lib/auth";

export async function GET() {
  return NextResponse.json({ events: getEvents() });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const title = sanitizeInput(data.title);
    const subtitle = sanitizeInput(data.subtitle);
    const description = sanitizeInput(data.description);

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description required." }, { status: 400 });
    }

    const newEvent = saveEvent({
      id: `evt-${Date.now()}`,
      title,
      subtitle: subtitle || "VSBCETC Innovation Initiative",
      category: data.category || "Workshop",
      date: data.date || new Date().toISOString().split("T")[0],
      time: data.time || "10:00 AM IST",
      venue: sanitizeInput(data.venue) || "Innovation Hub, VSBCETC",
      isSpotlight: Boolean(data.isSpotlight),
      status: data.status || "Upcoming",
      description,
      fullDetails: sanitizeInput(data.fullDetails) || description,
      prizePool: data.prizePool || "Grants + Certificates",
      registrationOpen: Boolean(data.registrationOpen),
      image: data.image || "/photos/workshop_1.webp",
      agenda: data.agenda || [{ time: "10:00 AM", activity: "Sprint Kickoff" }],
    });

    addAuditLog({
      action: `Created Event: ${newEvent.title}`,
      user: "Admin",
      ip: "127.0.0.1",
      status: "Success",
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch {
    return NextResponse.json({ error: "Failed to create event." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: "Event ID required." }, { status: 400 });
    }

    const updated = saveEvent(data);

    addAuditLog({
      action: `Updated Event: ${updated.title}`,
      user: "Admin",
      ip: "127.0.0.1",
      status: "Success",
    });

    return NextResponse.json({ success: true, event: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update event." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const ok = deleteEvent(id);
    addAuditLog({
      action: `Deleted Event ID: ${id}`,
      user: "Admin",
      ip: "127.0.0.1",
      status: "Success",
    });

    return NextResponse.json({ success: ok });
  } catch {
    return NextResponse.json({ error: "Failed to delete event." }, { status: 500 });
  }
}
