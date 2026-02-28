import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ELEVATE Blog`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <Link href="/blog" className="text-sm font-medium text-primary-500 hover:text-primary-600">
          ← Blog
        </Link>
        <header className="mt-8">
          <time className="text-sm text-gray-500">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : null}
          </time>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
        </header>
        <div
          className="mt-10 prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: formatBlogContent(post.content) }}
        />
        <div className="mt-14 pt-8 border-t border-gray-100">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-gray-900 font-semibold rounded-full hover:bg-primary-600 transition"
          >
            Get a free estimate
          </Link>
        </div>
      </article>
    </div>
  );
}

function formatBlogContent(content: string): string {
  if (content.startsWith("<")) return content;
  const lines = content.split("\n");
  const out: string[] = [];
  let inPara = false;
  for (const line of lines) {
    const h3 = line.match(/^### (.+)$/);
    const h2 = line.match(/^## (.+)$/);
    const h1 = line.match(/^# (.+)$/);
    if (h3) { if (inPara) { out.push("</p>"); inPara = false; } out.push(`<h3>${h3[1]}</h3>`); continue; }
    if (h2) { if (inPara) { out.push("</p>"); inPara = false; } out.push(`<h2>${h2[1]}</h2>`); continue; }
    if (h1) { if (inPara) { out.push("</p>"); inPara = false; } out.push(`<h1>${h1[1]}</h1>`); continue; }
    if (line.trim() === "") { if (inPara) { out.push("</p>"); inPara = false; } continue; }
    const escaped = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
    if (!inPara) { out.push("<p>"); inPara = true; }
    out.push(escaped + "\n");
  }
  if (inPara) out.push("</p>");
  return out.join("");
}
