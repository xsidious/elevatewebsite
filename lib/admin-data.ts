/**
 * Safe admin data access. Uses Prisma when ContactSubmission exists (after prisma generate).
 * Falls back to defaults so the dashboard never crashes if the client is stale.
 */
import { prisma } from "./prisma";

function hasContactSubmission(): boolean {
  return typeof (prisma as unknown as { contactSubmission?: unknown }).contactSubmission !== "undefined";
}

export async function getSubmissionCount(): Promise<number> {
  if (!hasContactSubmission()) return 0;
  try {
    return await prisma.contactSubmission.count();
  } catch {
    return 0;
  }
}

export async function getUnreadSubmissionCount(): Promise<number> {
  if (!hasContactSubmission()) return 0;
  try {
    return await prisma.contactSubmission.count({ where: { read: false } });
  } catch {
    return 0;
  }
}

type SubmissionRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  message: string | null;
  source: string | null;
  read: boolean;
  createdAt: Date;
};

export async function getRecentSubmissions(limit: number): Promise<SubmissionRow[]> {
  if (!hasContactSubmission()) return [];
  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getAllSubmissions(): Promise<SubmissionRow[]> {
  if (!hasContactSubmission()) return [];
  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

// Visitor logs (from /api/track + Vercel geo headers)
function hasVisitorLog(): boolean {
  return typeof (prisma as unknown as { visitorLog?: unknown }).visitorLog !== "undefined";
}

export type VisitorLogRow = {
  id: string;
  path: string;
  country: string | null;
  countryRegion: string | null;
  city: string | null;
  referrer: string | null;
  createdAt: Date;
};

export async function getRecentVisitorLogs(limit: number): Promise<VisitorLogRow[]> {
  if (!hasVisitorLog()) return [];
  try {
    return await prisma.visitorLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getVisitorLogCount(): Promise<number> {
  if (!hasVisitorLog()) return 0;
  try {
    return await prisma.visitorLog.count();
  } catch {
    return 0;
  }
}

/** Aggregated by country for the admin map/list */
export async function getVisitorsByCountry(): Promise<{ country: string | null; count: number }[]> {
  if (!hasVisitorLog()) return [];
  try {
    const logs = await prisma.visitorLog.findMany({
      select: { country: true },
    });
    const map = new Map<string, number>();
    for (const { country } of logs) {
      const key = country ?? "Unknown";
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([country, count]) => ({ country: country === "Unknown" ? null : country, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}
