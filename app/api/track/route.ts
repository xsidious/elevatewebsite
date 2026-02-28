import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Vercel exposes geo headers on serverless requests (Pro/Enterprise).
// See: https://vercel.com/docs/headers/request-headers#x-vercel-ip-*
// Locally or on Hobby these may be missing; we still log the path.

function hasVisitorLog(): boolean {
  return typeof (prisma as unknown as { visitorLog?: unknown }).visitorLog !== "undefined";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path : "/";

    const country = request.headers.get("x-vercel-ip-country") ?? null;
    const countryRegion = request.headers.get("x-vercel-ip-country-region") ?? null;
    const city = request.headers.get("x-vercel-ip-city") ?? null;
    const refFromBody = typeof body.referrer === "string" ? body.referrer : null;
    const refFromHeader = request.headers.get("referer");
    const referrer = refFromBody || refFromHeader || null;

    if (!hasVisitorLog()) {
      return NextResponse.json({ ok: true });
    }

    await prisma.visitorLog.create({
      data: {
        path: path.slice(0, 500),
        country: country?.slice(0, 10) ?? null,
        countryRegion: countryRegion?.slice(0, 100) ?? null,
        city: city?.slice(0, 100) ?? null,
        referrer: referrer?.slice(0, 500) ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
