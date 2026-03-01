import Link from "next/link";

export function OfferStrip() {
  return (
    <section className="bg-gray-900 text-white py-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/20 text-primary-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="font-medium text-gray-100">Free consultation & quote</span>
        </div>
        <div className="hidden sm:block w-px h-6 bg-gray-600" />
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/20 text-primary-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </span>
          <span className="font-medium text-gray-100">Licensed & insured</span>
        </div>
        <div className="hidden sm:block w-px h-6 bg-gray-600" />
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-500 text-gray-900 font-semibold hover:bg-primary-400 transition"
        >
          Request your free estimate
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
