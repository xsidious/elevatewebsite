import Link from "next/link";
import Image from "next/image";

export function CtaSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-500/85" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Free estimate · No obligation</p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Ready to Start Your Project?
          </h2>
          <p className="mt-2 text-white/90">Get a free quote and consultation. We respond within 24 hours.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-500 font-semibold rounded-full hover:bg-gray-50 transition shadow-soft"
          >
            Get Your Free Quote
          </Link>
          <a
            href="tel:5612473693"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/15 text-white font-semibold border border-white/30 hover:bg-white/25 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z" />
            </svg>
            Call (561) 247-3693
          </a>
        </div>
      </div>
    </section>
  );
}
