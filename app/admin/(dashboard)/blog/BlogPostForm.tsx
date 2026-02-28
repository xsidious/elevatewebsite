"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  postId: string;
  initialSlug: string;
  initialTitle: string;
  initialExcerpt: string;
  initialContent: string;
  initialPublished: boolean;
};

export function BlogPostForm({
  postId,
  initialSlug,
  initialTitle,
  initialExcerpt,
  initialContent,
  initialPublished,
}: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(initialSlug);
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [content, setContent] = useState(initialContent);
  const [published, setPublished] = useState(initialPublished);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slug.trim(), title: title.trim(), excerpt: excerpt.trim() || undefined, content, published }),
      });
      if (!res.ok) throw new Error("Failed to save");
      router.push("/admin/blog");
      router.refresh();
    } catch {
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Link href="/admin/blog" className="text-sm text-primary-600 hover:underline mb-4 inline-block">
        ← Blog
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit post</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt (optional)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="rounded border-slate-300"
          />
          <label htmlFor="published" className="text-sm text-slate-700">Published</label>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <Link href="/admin/blog" className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
