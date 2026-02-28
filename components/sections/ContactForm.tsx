"use client";

import { useState } from "react";

type ContactFormProps = {
  sourceOptions: string[];
  initialProjectType?: string;
  onSuccess?: () => void;
};

const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition";

export function ContactForm({ sourceOptions, initialProjectType, onSuccess }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          projectType: data.get("projectType"),
          message: data.get("message"),
          source: data.get("source"),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input id="phone" name="phone" type="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">Project type</label>
        <select id="projectType" name="projectType" defaultValue={initialProjectType ?? ""} className={inputClass}>
          <option value="">Select...</option>
          <option value="Home Renovation">Home Renovation</option>
          <option value="Complete Interior Remodel">Complete Interior Remodel</option>
          <option value="Kitchen Redesign & Remodel">Kitchen Redesign & Remodel</option>
          <option value="Bathroom Redesign & Remodel">Bathroom Redesign & Remodel</option>
          <option value="Restoration and Repairs">Restoration and Repairs</option>
        </select>
      </div>
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
        <select id="source" name="source" className={inputClass}>
          <option value="">Select...</option>
          {sourceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea id="message" name="message" rows={4} className={inputClass} />
      </div>
      {status === "success" && <p className="text-green-600 text-sm">Thank you! We&apos;ll be in touch soon.</p>}
      {status === "error" && <p className="text-red-600 text-sm">Something went wrong. Please try again or call us.</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 px-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 disabled:opacity-50 transition"
      >
        {status === "sending" ? "Sending…" : "Get my free estimate"}
      </button>
    </form>
  );
}
