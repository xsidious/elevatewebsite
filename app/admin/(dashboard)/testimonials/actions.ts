"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createTestimonial(formData: FormData) {
  const quote = (formData.get("quote") as string)?.trim() ?? "";
  const authorName = (formData.get("authorName") as string)?.trim() ?? "";
  const authorLocation = (formData.get("authorLocation") as string)?.trim() || null;
  const serviceType = (formData.get("serviceType") as string)?.trim() || null;
  const ratingRaw = formData.get("rating");
  const rating = ratingRaw ? Math.min(5, Math.max(1, parseInt(String(ratingRaw), 10) || 5)) : null;
  const sortOrder = parseInt(String(formData.get("sortOrder") ?? 0), 10) || 0;
  const featured = formData.get("featured") === "on";

  await prisma.testimonial.create({
    data: {
      quote,
      authorName,
      authorLocation,
      serviceType,
      rating,
      sortOrder,
      featured,
    },
  });

  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const quote = (formData.get("quote") as string)?.trim() ?? "";
  const authorName = (formData.get("authorName") as string)?.trim() ?? "";
  const authorLocation = (formData.get("authorLocation") as string)?.trim() || null;
  const serviceType = (formData.get("serviceType") as string)?.trim() || null;
  const ratingRaw = formData.get("rating");
  const rating = ratingRaw ? Math.min(5, Math.max(1, parseInt(String(ratingRaw), 10) || 5)) : null;
  const sortOrder = parseInt(String(formData.get("sortOrder") ?? 0), 10) || 0;
  const featured = formData.get("featured") === "on";

  await prisma.testimonial.update({
    where: { id },
    data: {
      quote,
      authorName,
      authorLocation,
      serviceType,
      rating,
      sortOrder,
      featured,
    },
  });

  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/testimonials");
}
