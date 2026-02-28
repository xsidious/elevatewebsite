import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    fullDescription: project.fullDescription,
    category: project.category,
    location: project.location,
    featuredImageUrl: project.featuredImageUrl,
    images: project.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      sortOrder: img.sortOrder,
    })),
  });
}
