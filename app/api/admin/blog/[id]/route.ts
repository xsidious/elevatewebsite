import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const { slug, title, excerpt, content, published } = body as {
    slug?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    published?: boolean;
  };
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(slug != null && { slug: slug.trim() }),
      ...(title != null && { title: title.trim() }),
      ...(excerpt != null && { excerpt: excerpt.trim() || null }),
      ...(content != null && { content }),
      ...(published !== undefined && {
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
      }),
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
