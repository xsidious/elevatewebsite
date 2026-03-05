"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSiteSettings } from "./actions";

type Props = {
  initial: Record<string, string>;
};

const FIELDS: { key: string; label: string; placeholder?: string; type?: "text" | "number" }[] = [
  { key: "hero_headline", label: "Hero headline", placeholder: "Bringing Your Vision to Life" },
  { key: "hero_subline", label: "Hero subline", placeholder: "Custom renovations that fit how you live..." },
  { key: "cta_text", label: "CTA button text", placeholder: "Get An Estimate" },
  { key: "phone", label: "Phone", placeholder: "+1 312-483-6046" },
  { key: "email", label: "Email", placeholder: "Mike@getelevated.us" },
  { key: "address", label: "Address", placeholder: "Deerfield, IL" },
  { key: "years_experience", label: "Years experience", type: "number", placeholder: "45" },
];

export function SettingsForm({ initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(initial);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings(values);
      router.refresh();
    } catch {
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {FIELDS.map(({ key, label, placeholder, type = "text" }) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-zinc-700 mb-1">
            {label}
          </label>
          <input
            id={key}
            type={type}
            value={values[key] ?? ""}
            onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
            placeholder={placeholder}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      ))}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:bg-primary-700 disabled:opacity-60 transition"
        >
          {saving ? "Saving…" : "Save settings"}
        </button>
      </div>
    </form>
  );
}
