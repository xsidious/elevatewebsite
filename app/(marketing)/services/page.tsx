import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Services | ELEVATE | Home Renovation & Remodel",
  description: "Best home remodeling services in South Florida. Home renovation, complete interior remodel, kitchen and bathroom redesign, restoration and repairs. Free consultation.",
};

export default async function ServicesIndexPage() {
  const services = await getServices();

  const serviceImages: Record<string, string> = {
    "home-renovation": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    "complete-interior-remodel": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
    "kitchen-redesign-remodel": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80",
    "bathroom-redesign-remodel": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80",
    "restoration-and-repairs": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    "flooring-and-tile": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
  };

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">What we offer you</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Our Services</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          From full home renovations to kitchen and bathroom remodels, restoration, and repairs—we handle it all. Click a service to learn more, or get in touch for a free consultation.
        </p>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-soft hover:shadow-soft-lg hover:border-primary-100 transition"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={serviceImages[s.slug] ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"}
                  alt={s.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-500 transition">{s.name}</h2>
                <p className="mt-3 text-gray-600 text-sm line-clamp-3">{s.shortDescription ?? ""}</p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-primary-500">
                  View detail
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-20 text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Schedule your free consultation today</h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Tell us about your project and we&apos;ll get back within 24 hours with a free, no-obligation estimate.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-gray-900 font-semibold rounded-full hover:bg-primary-600 transition shadow-soft"
          >
            Get a free quote
          </Link>
        </div>
      </section>
    </div>
  );
}
