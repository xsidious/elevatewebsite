"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function deleteBlogPost(postId: string) {
  await prisma.blogPost.delete({ where: { id: postId } });
  revalidatePath("/blog");
  redirect("/admin/blog");
}
