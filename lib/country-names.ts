// Common 2-letter country codes to full names for admin display
export const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  GB: "United Kingdom",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  IT: "Italy",
  NL: "Netherlands",
  BR: "Brazil",
  MX: "Mexico",
  IN: "India",
  JP: "Japan",
  CN: "China",
  KR: "South Korea",
};

export function countryDisplay(code: string | null): string {
  if (!code) return "Unknown";
  return COUNTRY_NAMES[code] ?? code;
}
