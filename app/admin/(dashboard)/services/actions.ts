"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function updateService(formData: FormData) {
  const id = formData.get("id") as string | null;
  if (!id) throw new Error("Missing service id");
  const name = (formData.get("name") as string)?.trim() ?? "";
  const tagline = (formData.get("tagline") as string)?.trim() || null;
  const shortDescription = (formData.get("shortDescription") as string)?.trim() || null;
  const longDescription = (formData.get("longDescription") as string)?.trim() || null;
  const sortOrder = parseInt(String(formData.get("sortOrder") ?? 0), 10) || 0;

  await prisma.service.update({
    where: { id },
    data: {
      name,
      tagline,
      shortDescription,
      longDescription,
      sortOrder,
    },
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}
