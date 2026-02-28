import Link from "next/link";
import Image from "next/image";

const aboutText =
  "ELEVATE brings experience and dedication to every project. We focus on clear communication, quality work, and lasting relationships—so your remodel is on time, on budget, and exactly what you had in mind.";

const bullets = ["You come first", "Quality craftsmanship", "Honest pricing & timelines"];

export function AboutSnippet() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[420px] order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80"
              alt="Modern kitchen renovation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">About Us</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Remodel Experts Who Put You First
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">{aboutText}</p>
            <ul className="mt-8 space-y-4">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-gray-700">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-gray-900 font-semibold rounded-full hover:bg-primary-600 transition"
            >
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
