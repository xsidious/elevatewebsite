"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { clearSiteSettingsCache } from "@/lib/site-settings";

const ALLOWED_KEYS = [
  "phone",
  "email",
  "address",
  "hero_headline",
  "hero_subline",
  "cta_text",
  "years_experience",
] as const;

export async function updateSiteSettings(data: Record<string, string>) {
  for (const key of ALLOWED_KEYS) {
    const value = data[key];
    if (value === undefined) continue;
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value: value.trim() },
      update: { value: value.trim() },
    });
  }
  clearSiteSettingsCache();
  revalidatePath("/");
  revalidatePath("/admin/settings");
}
