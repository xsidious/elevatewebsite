import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | ELEVATE | Renovation Tips & Ideas",
  description: "Tips, ideas, and updates from ELEVATE. Kitchen and bathroom remodel inspiration, South Florida renovation advice.",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Blog</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          Tips, Ideas & Updates
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Renovation advice and inspiration from the ELEVATE team.
        </p>
        <div className="mt-14 space-y-10">
          {posts.length === 0 ? (
            <p className="text-gray-500 py-8">No posts yet. Check back soon.</p>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-100 pb-10 last:border-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <time className="text-sm text-gray-500">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : null}
                  </time>
                  <h2 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-primary-500 transition">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p>
                  )}
                  <span className="mt-2 inline-flex items-center text-sm font-medium text-primary-500">
                    Read more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
