"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type ProjectCardProps = {
  slug: string;
  title: string;
  shortDescription?: string | null;
  category: string;
  featuredImageUrl: string | null;
  placeholderImage?: string;
};

export function ProjectCard({
  slug,
  title,
  shortDescription,
  category,
  featuredImageUrl,
  placeholderImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
}: ProjectCardProps) {
  const pathname = usePathname();
  const router = useRouter();

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    const base = pathname || "/";
    const sep = base.includes("?") ? "&" : "?";
    router.push(`${base}${sep}project=${encodeURIComponent(slug)}`);
  };

  return (
    <button
      type="button"
      onClick={openModal}
      className="group block w-full text-left rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-soft hover:shadow-soft-lg hover:border-primary-100 transition"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={featuredImageUrl || placeholderImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">{category}</p>
            <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
            <span className="mt-3 inline-flex items-center text-sm font-medium text-white/90">
              View Project
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {shortDescription && (
        <div className="p-6 pt-0 hidden sm:block">
          <p className="text-sm text-gray-600 line-clamp-2">{shortDescription}</p>
        </div>
      )}
    </button>
  );
}
