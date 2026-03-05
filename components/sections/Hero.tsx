import Link from "next/link";
import Image from "next/image";

type HeroProps = {
  headline: string;
  subline: string;
  ctaText: string;
  phone?: string;
  happyCustomersCount?: string;
};

const features = [
  { title: "Painting", desc: "Interior & exterior" },
  { title: "Kitchen & Bath", desc: "Remodeling & renovation" },
  { title: "Decks & More", desc: "General contracting" },
];

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < (rating ?? 5) ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export function Hero({ headline, subline, ctaText, phone, happyCustomersCount = "500+" }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
          alt="Modern home exterior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          <p className="text-primary-500 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-5">
            Serving the North Shore, Chicago Northern Suburbs & Chicagoland
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight sm:leading-[1.08] tracking-tight">
            {headline}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
            {subline}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 bg-primary-500 text-gray-900 text-sm sm:text-base font-semibold rounded-full hover:bg-primary-600 transition shadow-soft w-full sm:w-auto"
            >
              {ctaText}
            </Link>
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-white/90 text-gray-700 text-sm sm:text-base font-semibold border border-gray-200/80 hover:bg-white hover:shadow-soft transition w-full sm:w-auto"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z" />
                  </svg>
                </span>
                {phone}
              </a>
            )}
          </div>

          {/* Social proof: stars + free estimate */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-3">
              <StarRating rating={5} />
              <span className="text-gray-700 font-semibold">4.9</span>
              <span className="text-gray-600 text-sm">({happyCustomersCount} happy customers)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-200 text-gray-900 font-medium text-xs">✓</span>
              Free estimate · No obligation
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 lg:mt-20 flex flex-wrap gap-3 sm:gap-4 max-w-3xl">
          {features.map((f) => (
            <div
              key={f.title}
              className="inline-flex flex-col px-6 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-soft hover:shadow-soft-lg transition"
            >
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
