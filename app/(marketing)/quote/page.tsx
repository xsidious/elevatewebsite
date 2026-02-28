"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PROJECT_TYPES = [
  { value: "kitchen", label: "Kitchen Remodel", range: [15000, 75000], desc: "Cabinets, counters, flooring, appliances" },
  { value: "bathroom", label: "Bathroom Renovation", range: [8000, 35000], desc: "Vanity, shower/tub, tile, fixtures" },
  { value: "full-interior", label: "Complete Interior Remodel", range: [50000, 200000], desc: "Multiple rooms, flooring, paint, fixtures" },
  { value: "home-renovation", label: "Home Renovation", range: [30000, 150000], desc: "Major updates, structural or cosmetic" },
  { value: "restoration", label: "Restoration & Repairs", range: [2000, 25000], desc: "Repairs, paint, smaller upgrades" },
];

const SCOPE_OPTIONS = [
  { value: "small", label: "Small / cosmetic", multiplier: 0.6 },
  { value: "medium", label: "Medium / standard", multiplier: 1 },
  { value: "large", label: "Large / high-end", multiplier: 1.5 },
];

export default function QuoteCalculatorPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<string>("");
  const [scope, setScope] = useState<string>("medium");
  const [result, setResult] = useState<{ low: number; high: number } | null>(null);

  const selectedProject = PROJECT_TYPES.find((p) => p.value === projectType);
  const scopeMult = SCOPE_OPTIONS.find((s) => s.value === scope)?.multiplier ?? 1;

  const handleCalculate = () => {
    if (!selectedProject) return;
    const [low, high] = selectedProject.range;
    setResult({
      low: Math.round(low * scopeMult),
      high: Math.round(high * scopeMult),
    });
    setStep(3);
  };

  const openQuoteModal = () => {
    router.push((typeof window !== "undefined" ? window.location.pathname : "/") + "?quote=1");
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <Link href="/" className="text-sm font-medium text-primary-500 hover:text-primary-600">
          ← Back to home
        </Link>
        <p className="mt-6 text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">
          Quote calculator
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Get a rough estimate in seconds
        </h1>
        <p className="mt-4 text-gray-600">
          Select your project type and scope for an approximate price range. For a detailed quote, we&apos;ll need to see your space.
        </p>

        {step === 1 && (
          <div className="mt-10 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">What type of project?</h2>
            <div className="space-y-3">
              {PROJECT_TYPES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => {
                    setProjectType(p.value);
                    setStep(2);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                    projectType === p.value
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-200 bg-white"
                  }`}
                >
                  <span className="font-medium text-gray-900">{p.label}</span>
                  <span className="block text-sm text-gray-500 mt-0.5">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedProject && (
          <div className="mt-10 space-y-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-primary-500 hover:text-primary-600"
            >
              ← Change project type
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Project scope</h2>
            <div className="space-y-3">
              {SCOPE_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setScope(s.value)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                    scope === s.value
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-200 bg-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full mt-8 py-4 px-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition"
            >
              See estimate range
            </button>
          </div>
        )}

        {step === 3 && result && (
          <div className="mt-10 p-6 rounded-3xl bg-gray-50 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Your estimated range</h2>
            <p className="mt-4 text-3xl font-bold text-primary-500">
              ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
            </p>
            <p className="mt-2 text-gray-600 text-sm">
              This is a rough range based on typical {selectedProject?.label.toLowerCase()} projects. Final quote depends on materials, size, and scope.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={openQuoteModal}
                className="flex-1 py-4 px-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition"
              >
                Get a detailed quote
              </button>
              <button
                type="button"
                onClick={() => { setStep(2); setResult(null); }}
                className="py-4 px-4 border-2 border-gray-200 rounded-full font-medium text-gray-700 hover:border-primary-500 hover:text-primary-500 transition"
              >
                Recalculate
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
