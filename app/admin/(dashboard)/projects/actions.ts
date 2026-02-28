"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/uploads";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string || slugify(title);
  const shortDescription = (formData.get("shortDescription") as string) || null;
  const fullDescription = (formData.get("fullDescription") as string) || null;
  const category = (formData.get("category") as string) || "Other";
  const location = (formData.get("location") as string) || null;
  const published = formData.get("published") === "on";

  let featuredImageUrl: string | null = null;
  const featuredFile = formData.get("featuredImage") as File | null;
  if (featuredFile && featuredFile.size > 0) {
    featuredImageUrl = await saveUpload(featuredFile);
  }

  const project = await prisma.project.create({
    data: {
      title,
      slug: slug || slugify(title),
      shortDescription,
      fullDescription,
      category,
      location,
      featuredImageUrl,
      published,
    },
  });

  const galleryFiles = formData.getAll("gallery") as File[];
  for (let i = 0; i < galleryFiles.length; i++) {
    const f = galleryFiles[i];
    if (f && f.size > 0) {
      const url = await saveUpload(f);
      await prisma.projectImage.create({
        data: { projectId: project.id, url, sortOrder: i },
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  redirect("/admin/projects");
}

export async function updateProject(projectId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const shortDescription = (formData.get("shortDescription") as string) || null;
  const fullDescription = (formData.get("fullDescription") as string) || null;
  const category = (formData.get("category") as string) || "Other";
  const location = (formData.get("location") as string) || null;
  const published = formData.get("published") === "on";

  const existing = await prisma.project.findUnique({ where: { id: projectId }, include: { images: true } });
  if (!existing) throw new Error("Project not found");

  let featuredImageUrl = existing.featuredImageUrl;
  const featuredFile = formData.get("featuredImage") as File | null;
  if (featuredFile && featuredFile.size > 0) {
    featuredImageUrl = await saveUpload(featuredFile);
  }

  await prisma.project.update({
    where: { id: projectId },
    data: {
      title,
      slug: slug || slugify(title),
      shortDescription,
      fullDescription,
      category,
      location,
      featuredImageUrl,
      published,
    },
  });

  const galleryFiles = formData.getAll("gallery") as File[];
  if (galleryFiles.some((f) => f && f.size > 0)) {
    await prisma.projectImage.deleteMany({ where: { projectId: projectId } });
    for (let i = 0; i < galleryFiles.length; i++) {
      const f = galleryFiles[i];
      if (f && f.size > 0) {
        const url = await saveUpload(f);
        await prisma.projectImage.create({
          data: { projectId, url, sortOrder: i },
        });
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${existing.slug}`);
  revalidatePath(`/projects/${slug || slugify(title)}`);
  redirect("/admin/projects");
}

export async function deleteProject(projectId: string) {
  await prisma.project.delete({ where: { id: projectId } });
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects");
}
