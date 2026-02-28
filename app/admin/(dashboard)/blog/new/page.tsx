"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/admin/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setTitle(data.title ?? "");
      setSlug(data.slug ?? "");
      setExcerpt(data.excerpt ?? "");
      setContent(data.content ?? "");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to generate. Add OPENAI_API_KEY to use AI.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slug.trim() || !title.trim()) {
      alert("Slug and title required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slug.trim(), title: title.trim(), excerpt: excerpt.trim() || undefined, content: content || "", published }),
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
    <div>
      <Link href="/admin/blog" className="text-sm text-primary-600 hover:underline mb-4 inline-block">
        ← Blog
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">New post</h1>

      <div className="mb-8 p-4 rounded-lg bg-slate-100 border border-slate-200">
        <h2 className="font-semibold text-slate-800 mb-2">Generate with AI (optional)</h2>
        <p className="text-sm text-slate-600 mb-3">
          Add OPENAI_API_KEY to .env.local to generate a draft from a topic.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Kitchen remodel cost guide"
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
          >
            {generating ? "Generating…" : "Generate"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            placeholder="my-post-slug"
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
          <label className="block text-sm font-medium text-slate-700 mb-1">Content (markdown or HTML)</label>
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
          <label htmlFor="published" className="text-sm text-slate-700">Publish immediately</label>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save post"}
          </button>
          <Link href="/admin/blog" className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
