/**
 * Server-side data access for marketing pages.
 * All content is read from the database (Prisma + PostgreSQL).
 */
import { prisma } from "./prisma";

export async function getServices() {
  return prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({
    where: { slug },
  });
}

export async function getPublishedProjects(limit?: number) {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "desc" },
    ...(limit != null ? { take: limit } : {}),
  });
  return projects;
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, published: true },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedBlogPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
}
