import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const data = bodySchema.parse(raw);
    const contactSubmission = (prisma as unknown as { contactSubmission?: { create: (args: unknown) => Promise<unknown> } }).contactSubmission;
    if (contactSubmission) {
      await contactSubmission.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          projectType: data.projectType ?? null,
          message: data.message ?? null,
          source: data.source ?? null,
        },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
