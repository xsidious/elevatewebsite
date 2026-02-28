import { getSiteSettings } from "@/lib/site-settings";
import { SettingsForm } from "./SettingsForm";

const KEYS = [
  "phone",
  "email",
  "address",
  "hero_headline",
  "hero_subline",
  "cta_text",
  "years_experience",
];

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings(KEYS);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Site settings</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Edit hero text, contact info, and other content used across the site.
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <SettingsForm initial={settings} />
      </div>
    </div>
  );
}
