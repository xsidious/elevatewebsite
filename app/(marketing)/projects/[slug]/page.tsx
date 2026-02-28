import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findFirst({ where: { slug, published: true } });
  if (!project) return {};
  return {
    title: `${project.title} | ELEVATE`,
    description: project.shortDescription ?? project.fullDescription ?? undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findFirst({
    where: { slug, published: true },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!project) notFound();

  const allIds = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "desc" },
    select: { id: true, slug: true, title: true },
  });
  const idx = allIds.findIndex((p) => p.id === project.id);
  const prevProject = idx > 0 ? allIds[idx - 1]! : null;
  const nextProject = idx >= 0 && idx < allIds.length - 1 ? allIds[idx + 1]! : null;

  const galleryImages = project.featuredImageUrl
    ? [project.featuredImageUrl, ...project.images.map((i) => i.url)]
    : project.images.map((i) => i.url);
  const deduped = Array.from(new Set(galleryImages));

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <Link href="/projects" className="text-sm font-medium text-primary-500 hover:text-primary-600">
          ← All projects
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-primary-500 font-medium">{project.category}</p>
        {project.fullDescription && (
          <p className="mt-6 text-gray-600 leading-relaxed max-w-3xl">{project.fullDescription}</p>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
          {deduped.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deduped.map((url, i) => (
                <div key={i} className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                  <Image
                    src={url}
                    alt={project.images[i]?.alt ?? `${project.title} image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images for this project yet.</p>
          )}
        </div>

        <nav className="mt-12 flex flex-wrap gap-4 justify-between border-t border-gray-200 pt-8">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="text-primary-500 hover:text-primary-600 font-medium">
              ← {prevProject.title}
            </Link>
          ) : (
            <span />
          )}
          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="text-primary-500 hover:text-primary-600 font-medium">
              {nextProject.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition"
          >
            Get an estimate for your project
          </Link>
        </div>
      </section>
    </div>
  );
}
