import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | ELEVATE | South Florida Remodeling",
  description: "ELEVATE — Florida's choice for remodeling. Quality craftsmanship, clear communication. Kitchen, bathroom, and full home renovation across South Florida.",
};

const areas = [
  "Boca Raton", "Boynton Beach", "Delray Beach", "Highland Beach", "Juno Beach", "Jupiter",
  "Lake Park", "Lake Worth", "Lantana", "Loxahatchee Groves", "North Palm Beach", "Palm Beach Gardens",
  "Palm Beach", "Riviera Beach", "Tequesta", "Wellington", "West Palm Beach",
];

const guarantees = [
  "100% Satisfaction Guarantee",
  "Quality Whole Home Repairs",
  "Complete Home Revivification",
  "Historic Home Restorations",
  "Custom Kitchen & Bathroom Renovations",
];

const whyChoose = [
  { title: "Competitive rates", desc: "Fair pricing with no hidden fees" },
  { title: "Always on time", desc: "We respect your schedule" },
  { title: "Trustworthy team", desc: "Licensed, insured, and vetted" },
  { title: "Quality craftsmanship", desc: "45+ years in the field" },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero-style header */}
      <section className="relative bg-gray-50 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=60"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">About Us</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Florida&apos;s Best Remodeling Services
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
            ELEVATE is a South Florida team that takes on big projects. We specialize in home renovations, full interior remodels, kitchens and bathrooms, and restoration and repairs. Our skilled team is dedicated to making your experience top-notch.
          </p>
          <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
            With over 45 years in the renovation field, we&apos;re here to make your renovation dreams a reality. Looking for a team that gets it done? Call us today for a free estimate.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">We offer</h2>
            <ul className="mt-4 space-y-3">
              {guarantees.map((g) => (
                <li key={g} className="flex items-center gap-3 text-gray-700">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[320px]">
            <Image
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80"
              alt="Quality renovation work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Service area</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Areas we service</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {areas.map((area) => (
              <span
                key={area}
                className="px-4 py-2.5 bg-white rounded-2xl border border-gray-100 text-gray-700 text-sm font-medium shadow-soft hover:border-primary-100 transition"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Why choose us</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Why choose us?</h2>
        <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
          Our customer service sets us apart. We know that a major renovation depends on a strong relationship with you—we take that responsibility seriously. We&apos;re careful with your property, your budget, and your timeline, and we take pride in the details. We&apos;re not the contractor you hope to never see again; we&apos;re the one you&apos;ll want back when the next project comes up.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 shadow-soft hover:shadow-soft-lg hover:border-primary-100 transition"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 font-semibold text-lg">✓</span>
              <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition shadow-soft"
          >
            Get a free quote
          </Link>
        </div>
      </section>
    </div>
  );
}
