import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "../../BlogPostForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <BlogPostForm
        postId={post.id}
        initialSlug={post.slug}
        initialTitle={post.title}
        initialExcerpt={post.excerpt ?? ""}
        initialContent={post.content}
        initialPublished={post.published}
      />
    </div>
  );
}
