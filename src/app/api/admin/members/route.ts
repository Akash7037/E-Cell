import { NextResponse } from "next/server";
import { getMembers, saveMember, deleteMember, addAuditLog } from "@/lib/data";
import { sanitizeInput } from "@/lib/auth";

export async function GET() {
  return NextResponse.json({ members: getMembers() });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = sanitizeInput(data.name);
    const role = sanitizeInput(data.role);

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role required." }, { status: 400 });
    }

    const newMember = saveMember({
      id: `mem-${Date.now()}`,
      name,
      role,
      department: sanitizeInput(data.department) || "Computer Science",
      year: sanitizeInput(data.year) || "Third Year",
      category: data.category || "Technology & AI",
      image: data.image || "/photos/members/member_tech.webp",
      bio: sanitizeInput(data.bio) || "Leading innovation initiatives at E-Cell VSBCETC.",
      contribution: sanitizeInput(data.contribution) || "Active contributor to campus incubator sprints.",
      skills: data.skills || ["Innovation", "Product Strategy"],
      socials: data.socials || { linkedin: "https://linkedin.com" },
    });

    addAuditLog({
      action: `Added Team Member: ${newMember.name}`,
      user: "Admin",
      ip: "127.0.0.1",
      status: "Success",
    });

    return NextResponse.json({ success: true, member: newMember });
  } catch {
    return NextResponse.json({ error: "Failed to add team member." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: "Member ID required." }, { status: 400 });
    }

    const updated = saveMember(data);

    addAuditLog({
      action: `Updated Member: ${updated.name}`,
      user: "Admin",
      ip: "127.0.0.1",
      status: "Success",
    });

    return NextResponse.json({ success: true, member: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update member." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const ok = deleteMember(id);
    addAuditLog({
      action: `Deleted Member ID: ${id}`,
      user: "Admin",
      ip: "127.0.0.1",
      status: "Success",
    });

    return NextResponse.json({ success: ok });
  } catch {
    return NextResponse.json({ error: "Failed to delete member." }, { status: 500 });
  }
}
