"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProjectData = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  fullDescription: string | null;
  category: string;
  location: string | null;
  featuredImageUrl: string | null;
  images: { id: string; url: string; alt: string | null }[];
};

type ProjectModalProps = {
  slug: string;
  onClose: () => void;
  onRequestQuote?: () => void;
};

export function ProjectModal({ slug, onClose, onRequestQuote }: ProjectModalProps) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/projects/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setProject(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="rounded-2xl bg-white p-8 text-gray-600">Loading…</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="rounded-2xl bg-white p-8 text-center max-w-sm">
          <p className="text-gray-600">Project not found.</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-full font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const galleryUrls = project.featuredImageUrl
    ? [project.featuredImageUrl, ...project.images.map((i) => i.url)]
    : project.images.map((i) => i.url);
  const deduped = Array.from(new Set(galleryUrls));
  const currentImage = deduped[galleryIndex] ?? deduped[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="relative w-full h-full sm:h-[90vh] sm:max-w-4xl sm:rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <h2 id="project-modal-title" className="text-lg sm:text-xl font-bold text-gray-900 truncate pr-2">
            {project.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition shrink-0"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="relative aspect-[16/10] sm:aspect-video bg-gray-100">
            {currentImage && (
              <Image
                src={currentImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            )}
            {deduped.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((i) => (i === 0 ? deduped.length - 1 : i - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700 hover:bg-white"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((i) => (i === deduped.length - 1 ? 0 : i + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700 hover:bg-white"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {deduped.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGalleryIndex(i)}
                      className={`w-2 h-2 rounded-full transition ${i === galleryIndex ? "bg-primary-500 scale-125" : "bg-white/80"}`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-2 text-primary-500 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {project.category}
              </span>
              {project.location && (
                <span className="inline-flex items-center gap-2 text-gray-500">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </span>
              )}
              <span className="inline-flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4 shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {deduped.length} photo{deduped.length !== 1 ? "s" : ""}
              </span>
            </div>
            {(project.shortDescription || project.fullDescription) && (
              <p className="mt-4 text-gray-600 leading-relaxed">
                {project.fullDescription || project.shortDescription}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {onRequestQuote ? (
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition"
                >
                  Get a quote for this project
                </button>
              ) : (
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition"
                >
                  Get a quote
                </Link>
              )}
              <Link
                href={`/projects/${project.slug}`}
                onClick={onClose}
                className="inline-flex items-center px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-medium hover:border-primary-500 hover:text-primary-500 transition"
              >
                View full page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
