"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PROJECT_TYPES = [
  { value: "kitchen", label: "Kitchen Remodel", range: [15000, 75000] },
  { value: "bathroom", label: "Bathroom Renovation", range: [8000, 35000] },
  { value: "full-interior", label: "Complete Interior Remodel", range: [50000, 200000] },
  { value: "home-renovation", label: "Home Renovation", range: [30000, 150000] },
  { value: "restoration", label: "Restoration & Repairs", range: [2000, 25000] },
  { value: "flooring", label: "Flooring & Tile", range: [3000, 20000] },
];

const SIZES = [
  { value: "small", label: "Small", multiplier: 0.6 },
  { value: "medium", label: "Medium", multiplier: 1 },
  { value: "large", label: "Large", multiplier: 1.5 },
];

export function EstimateFormSection() {
  const router = useRouter();
  const [projectType, setProjectType] = useState("");
  const [size, setSize] = useState("medium");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [estimate, setEstimate] = useState<{ low: number; high: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selected = PROJECT_TYPES.find((p) => p.value === projectType);
  const sizeMult = SIZES.find((s) => s.value === size)?.multiplier ?? 1;

  const handleGetEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    const [low, high] = selected.range;
    setEstimate({
      low: Math.round(low * sizeMult),
      high: Math.round(high * sizeMult),
    });
  };

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          projectType: selected?.label,
          message: `[Estimate form] Project size: ${size}. Estimated range: ${estimate ? `$${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}` : "N/A"}. ${message.trim()}`,
          source: "Homepage estimate form",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
        <SuccessCelebration />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-primary-500 mb-6 animate-bounce-slow">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Thank you!</h2>
          <p className="mt-3 text-lg text-gray-600">
            We&apos;ve received your request and will reach out within 24 hours to schedule your consultation.
          </p>
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="mt-8 inline-flex items-center px-6 py-3 rounded-full border-2 border-primary-500 text-primary-500 font-semibold hover:bg-primary-50 transition"
          >
            Browse our projects
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Get an estimate</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Tell us about your project — get a range & book a consultation
        </h2>
        <p className="mt-4 text-gray-600">
          Choose your project type and size. We&apos;ll show you an estimated range, then you can book a free consultation with your details.
        </p>

        <form onSubmit={estimate ? handleBookConsultation : handleGetEstimate} className="mt-10">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-soft">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select...</option>
                  {PROJECT_TYPES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {SIZES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {!estimate ? (
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition"
                >
                  Get my estimate range
                </button>
              </div>
            ) : (
              <>
                <div className="mt-6 p-4 rounded-2xl bg-primary-50 border border-primary-100">
                  <p className="text-sm font-medium text-primary-800">Your estimated range</p>
                  <p className="text-2xl font-bold text-primary-600 mt-1">
                    ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Final quote depends on materials and scope. Book a consultation for a detailed quote.</p>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional details (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 disabled:opacity-50 transition"
                  >
                    {submitting ? "Submitting…" : "Book my free consultation"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEstimate(null)}
                    className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Change estimate
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function SuccessCelebration() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1.5,
    color: ["#f59e0b", "#fbbf24", "#d97706", "#fcd34d", "#92400e"][i % 5],
    size: 4 + Math.random() * 8,
  }));

  return (
    <>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-confetti"
            style={{
              left: p.left,
              top: "-10px",
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
