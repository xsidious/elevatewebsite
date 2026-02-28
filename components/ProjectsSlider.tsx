"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  shortDescription: string | null;
  category: string;
  featuredImageUrl: string | null;
};

const placeholderImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80";

function CategoryIcon({ category }: { category: string }) {
  const c = category.toLowerCase();
  const cls = "w-5 h-5 text-white/90";
  if (c.includes("kitchen"))
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  if (c.includes("bathroom"))
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    );
  if (c.includes("restoration") || c.includes("repair"))
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    );
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

export function ProjectsSlider({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [projects.length]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  const openProject = (slug: string) => {
    const base = pathname || "/";
    router.push(base + (base.includes("?") ? "&" : "?") + "project=" + encodeURIComponent(slug));
  };

  if (projects.length === 0) {
    return (
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Our Gallery</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Our Projects</h2>
          <Link href="/projects" className="mt-8 inline-block p-12 rounded-3xl bg-gray-50 border border-gray-100 text-center text-gray-600">
            Add projects in admin. View gallery →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-primary-500 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em]">
              Our Gallery
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Recent Projects
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 md:self-end">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-12 w-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 disabled:opacity-40 disabled:pointer-events-none transition"
              aria-label="Previous projects"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-12 w-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 disabled:opacity-40 disabled:pointer-events-none transition"
              aria-label="Next projects"
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
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-6 sm:px-6 lg:mx-8 lg:px-8 snap-x snap-mandatory scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => openProject(p.slug)}
              className="group flex-shrink-0 w-[82vw] sm:w-[380px] lg:w-[380px] snap-start block text-left rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-soft hover:shadow-soft-lg hover:border-primary-100 transition"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={p.featuredImageUrl || placeholderImage}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 640px) 85vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1.5">
                  <CategoryIcon category={p.category} />
                  <span className="text-white/90 text-xs font-medium">{p.category}</span>
                </div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                    <span className="mt-2 inline-flex items-center text-sm font-medium text-white/90">
                      View Project
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              {p.shortDescription && (
                <div className="p-4 pt-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{p.shortDescription}</p>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/projects" className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-600 transition">
            View Gallery
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
