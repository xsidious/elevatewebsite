import type { Metadata } from "next";
import { getPublishedProjects } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Projects | ELEVATE | Gallery",
  description: "Browse our completed renovation projects. Kitchen, bathroom, and full-home remodels across South Florida.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Portfolio</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Our Projects</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Browse our completed renovations across South Florida. Click any project for details and photos.
        </p>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              shortDescription={p.shortDescription}
              category={p.category}
              featuredImageUrl={p.featuredImageUrl ?? p.images[0]?.url ?? null}
            />
          ))}
        </div>
        {projects.length === 0 && (
          <div className="col-span-full text-center py-16 rounded-3xl bg-gray-50 border border-gray-100">
            <p className="text-gray-600 font-medium">No projects yet.</p>
            <p className="mt-2 text-gray-500 text-sm">Check back soon or contact us to start your project.</p>
          </div>
        )}
      </section>
    </div>
  );
}
