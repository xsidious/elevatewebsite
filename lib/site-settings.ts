import { prisma } from "./prisma";

const cache: Map<string, string> = new Map();

export function clearSiteSettingsCache(): void {
  cache.clear();
}

export async function getSiteSetting(key: string): Promise<string> {
  const cached = cache.get(key);
  if (cached !== undefined) return cached;
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  const value = row?.value ?? "";
  cache.set(key, value);
  return value;
}

export async function getSiteSettings(keys: string[]): Promise<Record<string, string>> {
  const entries = await Promise.all(
    keys.map(async (key) => [key, await getSiteSetting(key)] as const)
  );
  return Object.fromEntries(entries);
}
