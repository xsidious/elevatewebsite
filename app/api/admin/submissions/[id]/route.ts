import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function hasContactSubmission(): boolean {
  return typeof (prisma as unknown as { contactSubmission?: unknown }).contactSubmission !== "undefined";
}

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!hasContactSubmission()) {
    return NextResponse.json({ error: "Submissions not available" }, { status: 503 });
  }

  const { id } = await params;
  const body = await _request.json();
  const read = body.read === true;

  try {
    await prisma.contactSubmission.update({
      where: { id },
      data: { read },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
