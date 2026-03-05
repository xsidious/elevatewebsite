import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | ELEVATE | Painting & Remodeling",
  description: "Elevate Painting & Remodeling—residential and commercial. Built on experience, focused on results. Structured planning, reliable timelines, quality execution, transparent value. North Shore & Chicagoland.",
};

const areas = [
  "North Shore", "Chicago Northern Suburbs", "Chicagoland", "Deerfield", "Northbrook", "Highland Park",
  "Glenview", "Wilmette", "Winnetka", "Lake Forest", "Evanston", "Skokie",
];

const guarantees = [
  "Interior & Exterior Painting",
  "Kitchen Remodeling",
  "Bathroom Renovation",
  "Basement Remodeling",
  "Custom Deck Building",
  "General Contracting",
  "Interior Design & Home Upgrades",
];

const whyChoose = [
  { title: "Structured Planning", desc: "Every project begins with careful planning and clear scope definition. We take a methodical approach to ensure work is organized, efficient, and aligned with project goals from day one." },
  { title: "Reliable Timelines", desc: "We prioritize realistic scheduling and coordination to keep projects moving forward and completed on time—without unnecessary delays or disruption." },
  { title: "Quality Execution", desc: "Our experienced team delivers consistent, high-quality workmanship, maintaining attention to detail and professional standards throughout every phase of the project." },
  { title: "Transparent Value", desc: "We provide clear pricing and dependable service, offering strong value through quality materials, skilled execution, and long-term results—without hidden costs." },
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
            About Elevate Painting & Remodeling
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
            We're creators of space and mood—remodeling homes with heart, style, and purpose. At Elevate, your dream design isn't just possible—it's the plan.
          </p>
          <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
            Elevate Painting & Remodeling is a professional remodeling and painting company serving residential and commercial clients across the North Shore, Chicago's northern suburbs, and the greater Chicagoland area. We deliver reliable craftsmanship, clear communication, and a structured approach to every project.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Sector we work in</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Residential & Commercial</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 shadow-soft">
            <h3 className="text-lg font-semibold text-gray-900">Residential</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Professional remodeling and painting services tailored to private homes, focused on clean execution, careful planning, and long-term quality.
            </p>
          </div>
          <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 shadow-soft">
            <h3 className="text-lg font-semibold text-gray-900">Commercial</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Structured remodeling and painting solutions for offices, retail spaces, and multi-unit properties, delivered with clear scopes and coordinated execution.
            </p>
          </div>
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
          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">North Shore, Chicago Northern Suburbs & Chicagoland</h2>
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
        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Built on Experience. Focused on Results.</h2>
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
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-gray-900 font-semibold rounded-full hover:bg-primary-600 transition shadow-soft"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
