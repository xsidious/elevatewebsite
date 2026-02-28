"use client";

import { useRef, useState, useEffect } from "react";

type Testimonial = {
  quote: string;
  authorName: string;
  authorLocation: string | null;
  serviceType: string | null;
  rating: number | null;
};

type TestimonialsSectionProps = { testimonials: Testimonial[] };

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el || testimonials.length === 0) return;
    const cardWidth = el.querySelector("[data-testimonial-card]")?.clientWidth ?? 0;
    const gap = 24;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, testimonials.length - 1));
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [testimonials.length]);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-testimonial-card]");
    if (!card) return;
    const cardWidth = (card as HTMLElement).offsetWidth;
    const gap = 24;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
    setActiveIndex(index);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-testimonial-card]") as HTMLElement | null;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 24;
    el.scrollBy({ left: dir === "left" ? -(cardWidth + gap) : cardWidth + gap, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-primary-500 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em]">
              What our clients say
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-white">
                <span className="text-xl font-bold">4.9</span>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Trust Score</p>
                <p className="text-gray-500 text-sm">From hundreds of happy homeowners</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-12 w-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition shadow-soft"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-12 w-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition shadow-soft"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-6 sm:px-6 lg:mx-8 lg:px-8 snap-x snap-mandatory scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-testimonial-card
              className="flex-shrink-0 w-[82vw] sm:w-[400px] lg:w-[460px] snap-start rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-soft hover:shadow-soft-lg transition"
            >
              <div className="flex gap-1 text-amber-400 mb-4" aria-label={`${t.rating ?? 5} stars`}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j}>{j < (t.rating ?? 5) ? "★" : "☆"}</span>
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary-500">{t.authorName.charAt(0)}</span>
                </div>
                <div>
                  <cite className="not-italic font-semibold text-gray-900 block">{t.authorName}</cite>
                  {(t.authorLocation || t.serviceType) && (
                    <span className="text-gray-500 text-sm">
                      {t.authorLocation}
                      {t.authorLocation && t.serviceType && " · "}
                      {t.serviceType}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition ${i === activeIndex ? "w-8 bg-primary-500" : "w-2 bg-gray-200 hover:bg-gray-300"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
