import Link from "next/link";
import Image from "next/image";

type Service = {
  slug: string;
  name: string;
  shortDescription: string | null;
};

type ServicesSectionProps = { services: Service[] };

const serviceImages: Record<string, string> = {
  "interior-painting": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80",
  "exterior-painting": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80",
  "kitchen-remodeling": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80",
  "bathroom-renovation": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80",
  "basement-remodeling": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
  "custom-deck-building": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "general-contracting": "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?auto=format&fit=crop&w=600&q=80",
  "interior-design-home-upgrades": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-primary-500 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em]">
          What We Offer
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl">
          Our Services
        </h2>
        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-soft hover:shadow-soft-lg hover:border-primary-100 transition"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={serviceImages[s.slug] ?? "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80"}
                  alt={s.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
                  <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-500 transition">{s.name}</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-2">{s.shortDescription ?? ""}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-500">
                  View details
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-primary-500 text-gray-900 font-semibold rounded-full hover:bg-primary-600 transition"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
