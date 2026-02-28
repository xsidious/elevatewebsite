import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { slug, title, excerpt, content, published } = body as {
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    published?: boolean;
  };
  if (!slug?.trim() || !title?.trim() || content == null) {
    return NextResponse.json({ error: "slug, title, content required" }, { status: 400 });
  }
  const post = await prisma.blogPost.create({
    data: {
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt?.trim() ?? null,
      content,
      published: Boolean(published),
      publishedAt: published ? new Date() : null,
    },
  });
  return NextResponse.json(post);
}
